import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const vite = path.join(root, "node_modules", "vite", "bin", "vite.js");

/** @type {{ name: string, args: string[] }[]} */
const targets = [
	{ name: "web", args: [vite] },
	// Runs .ts directly on Node 22's native type stripping — no build step, no tsx dep.
	{ name: "api", args: [path.join(root, "server", "index.ts")] }
];

const COLORS = { web: "[36m", api: "[35m" };
const RESET = "[0m";

const children = targets.map(({ name, args }) => {
	const child = spawn(process.execPath, args, { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
	const tag = `${COLORS[name]}[${name}]${RESET}`;

	for (const [stream, out] of [
		[child.stdout, process.stdout],
		[child.stderr, process.stderr]
	]) {
		stream.setEncoding("utf8");
		let carry = "";
		stream.on("data", (chunk) => {
			// Prefix whole lines; hold a partial one so prefixes don't interleave mid-line.
			const lines = (carry + chunk).split("\n");
			carry = lines.pop() ?? "";
			for (const line of lines) out.write(`${tag} ${line}\n`);
		});
		stream.on("end", () => {
			if (carry) out.write(`${tag} ${carry}\n`);
		});
	}

	child.on("exit", (code) => {
		process.stdout.write(`${tag} exited with code ${code}\n`);
		shutdown(code ?? 0);
	});

	return child;
});

let shuttingDown = false;
function shutdown(code) {
	if (shuttingDown) return;
	shuttingDown = true;
	for (const child of children) {
		if (child.exitCode === null) child.kill();
	}
	process.exit(code);
}

// Ctrl-C and "one side died" should not leave an orphan holding a port.
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
