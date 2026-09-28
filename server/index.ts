import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { buildSystemPrompt, type ChatLang } from "./prompt.ts";

const PORT = Number(process.env.API_PORT ?? 8787);
const MODEL = process.env.AI_MODEL ?? "gemini-3.5-flash";

/** Refuse oversized bodies rather than buffering unbounded JSON into memory. */
const MAX_BODY_BYTES = 256 * 1024;

// Node 22 can read a .env natively. Absent file is the normal case, not an error.
try {
	process.loadEnvFile();
} catch {
	/* no .env file — rely on the ambient environment */
}

/**
 * Read AFTER loadEnvFile so a value in .env wins over an inherited shell var.
 * Read on every request rather than at module load, so adding a key doesn't need
 * a restart during setup.
 */
function apiKey(): string | undefined {
	return process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY;
}

type ChatRequest = {
	messages: UIMessage[];
	lang: ChatLang;
};

function readBody(req: IncomingMessage): Promise<string> {
	return new Promise((resolve, reject) => {
		let size = 0;
		let overflowed = false;
		const chunks: Buffer[] = [];

		req.on("data", (chunk: Buffer) => {
			if (overflowed) return;
			size += chunk.length;
			if (size > MAX_BODY_BYTES) {
				overflowed = true;
				// Reject now, but keep draining with resume() instead of destroy() so the
				// client can finish sending and actually read the 413 we send back —
				// destroying here would reset the socket and it would see ECONNRESET.
				reject(new Error("Payload too large"));
				req.resume();
				return;
			}
			chunks.push(chunk);
		});
		req.on("end", () => {
			if (!overflowed) resolve(Buffer.concat(chunks).toString("utf8"));
		});
		req.on("error", reject);
	});
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
	const payload = JSON.stringify(body);
	res.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
		"content-length": Buffer.byteLength(payload)
	});
	res.end(payload);
}

/**
 * Copy an AI SDK `Response` (a web ReadableStream) into a Node response.
 *
 * `abort` is wired to the socket closing: when the user closes the panel or
 * navigates away mid-reply we cancel upstream, otherwise the provider keeps
 * generating and billing for text nobody will read.
 */
async function pipeToNode(response: Response, res: ServerResponse, abort: AbortController): Promise<void> {
	res.writeHead(response.status, Object.fromEntries(response.headers.entries()));

	if (!response.body) {
		res.end();
		return;
	}

	const reader = response.body.getReader();
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			if (abort.signal.aborted) break;
			res.write(Buffer.from(value));
		}
	} catch (error) {
		console.error("[api] stream aborted:", error);
	} finally {
		res.end();
	}
}

async function handleChat(req: IncomingMessage, res: ServerResponse): Promise<void> {
	const key = apiKey();
	if (!key) {
		sendJson(res, 503, {
			error: "missing_api_key",
			message: "Set GOOGLE_GENERATIVE_AI_API_KEY in .env on the server, then restart it."
		});
		return;
	}

	let parsed: ChatRequest;
	try {
		const raw = JSON.parse(await readBody(req));
		if (!Array.isArray(raw?.messages) || raw.messages.length === 0) {
			sendJson(res, 400, { error: "bad_request", message: "Expected a non-empty `messages` array." });
			return;
		}
		parsed = { messages: raw.messages as UIMessage[], lang: raw.lang === "fa" ? "fa" : "en" };
	} catch (error) {
		const message = error instanceof Error ? error.message : "Invalid JSON body";
		sendJson(res, message === "Payload too large" ? 413 : 400, { error: "bad_request", message });
		return;
	}

	const abort = new AbortController();
	res.on("close", () => abort.abort());

	try {
		const result = streamText({
			model: google(MODEL),
			system: buildSystemPrompt(parsed.lang),
			messages: await convertToModelMessages(parsed.messages),
			abortSignal: abort.signal
		});

		await pipeToNode(result.toUIMessageStreamResponse(), res, abort);
	} catch (error) {
		console.error("[api] chat failed:", error);
		if (!res.headersSent) {
			sendJson(res, 500, { error: "upstream_failed", message: "The model provider returned an error." });
		} else {
			res.end();
		}
	}
}

const server = createServer((req, res) => {
	const { pathname } = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

	if (pathname === "/api/health") {
		sendJson(res, 200, { ok: true, model: MODEL, keyPresent: Boolean(apiKey()) });
		return;
	}

	if (pathname === "/api/chat") {
		if (req.method !== "POST") {
			res.setHeader("allow", "POST");
			sendJson(res, 405, { error: "method_not_allowed", message: "Use POST." });
			return;
		}
		void handleChat(req, res);
		return;
	}

	sendJson(res, 404, { error: "not_found" });
});

server.listen(PORT, () => {
	console.log(`[api] http://localhost:${PORT}  model=${MODEL}  key=${apiKey() ? "found" : "MISSING"}`);
});
