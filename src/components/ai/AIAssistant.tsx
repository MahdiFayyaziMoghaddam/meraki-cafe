import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, MessageCircle, Sparkles, Square, AlertTriangle } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

function partText(parts: { type: string; text?: string }[]): string {
	return parts
		.filter((p) => p.type === "text")
		.map((p) => p.text ?? "")
		.join("");
}

export default function AIAssistant() {
	const { t, lang } = useLang();
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);

	// useChat builds its Chat exactly once — it memoises on [chatKey], and chatKey is
	// undefined when you hand it a `transport` rather than an `id`. So a transport built
	// during render keeps the `lang` captured on the first render, and switching fa -> en
	// would leave the bot answering in Persian. Resolving the body per request off a ref
	// reads the live language instead; the transport is built with a function body, and
	// `resolve()` invokes function-valued options on every send.
	const langRef = useRef(lang);
	langRef.current = lang;

	const { messages, sendMessage, status, error, stop, clearError } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
			body: () => ({ lang: langRef.current })
		})
	});

	const busy = status === "submitted" || status === "streaming";

	// Follow the tail as tokens arrive, the way every chat pane does.
	useEffect(() => {
		const el = scrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [messages]);

	const send = () => {
		const text = draft.trim();
		if (!text || busy) return;
		clearError();
		setDraft("");
		void sendMessage({ text });
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				aria-label={t("aiAssistant")}
				className="fixed bottom-6 end-6 z-40 inline-flex items-center gap-2 rounded-full bg-coffee-500 px-4 h-12 text-cream-50 shadow-glow transition-[background-color,transform] duration-200 hover:bg-coffee-400 active:scale-[0.97] motion-reduce:transform-none focus-ring"
			>
				<MessageCircle size={20} strokeWidth={1.5} />
				<span className="text-sm font-medium hidden sm:inline">{t("aiAssistant")}</span>
			</button>

			{open && (
				<div className="fixed inset-0 z-50">
					<div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
					<div className="absolute inset-y-0 end-0 w-full max-w-md bg-bark-900 border-s border-bark-700 flex flex-col">
						<div className="flex items-center justify-between h-16 px-5 border-b border-bark-800">
							<div className="flex items-center gap-2.5 min-w-0">
								<span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400">
									<Bot size={20} strokeWidth={1.5} />
								</span>
								<div className="min-w-0">
									<p className="text-cream-50 font-semibold leading-tight truncate">{t("aiAssistant")}</p>
									<p className="text-xs text-cream-400 flex items-center gap-1">
										<Sparkles size={12} strokeWidth={1.5} /> Meraki AI
									</p>
								</div>
							</div>
							<button
								onClick={() => setOpen(false)}
								aria-label={t("close")}
								className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] text-cream-300 hover:bg-bark-800 transition-colors duration-150 active:opacity-80 focus-ring"
							>
								<X size={18} strokeWidth={1.5} />
							</button>
						</div>

						<div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
							{/* Local greeting, so the pane never opens empty while the model is idle. */}
							<div className="flex justify-start">
								<div className="max-w-[80%] rounded-[10px] px-3.5 py-2.5 text-sm bg-bark-800 text-cream-100 border border-bark-700">
									{t("aiGreeting")}
								</div>
							</div>

							{messages.map((m) => {
								const text = partText(m.parts);
								if (!text) return null;
								return (
									<div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
										<div
											className={cn(
												"max-w-[80%] rounded-[10px] px-3.5 py-2.5 text-sm whitespace-pre-wrap break-words",
												m.role === "user"
													? "bg-coffee-500 text-cream-50"
													: "bg-bark-800 text-cream-100 border border-bark-700"
											)}
										>
											{text}
										</div>
									</div>
								);
							})}

							{busy && messages[messages.length - 1]?.role !== "assistant" && (
								<div className="flex justify-start">
									<div className="flex items-center gap-1.5 rounded-[10px] bg-bark-800 border border-bark-700 px-3.5 py-3">
										{[0, 150, 300].map((delay) => (
											<span
												key={delay}
												className="size-1.5 rounded-full bg-coffee-400 animate-bounce"
												style={{ animationDelay: `${delay}ms` }}
											/>
										))}
									</div>
								</div>
							)}

							{error && (
								<div className="flex items-start gap-2 rounded-[10px] bg-danger/15 px-3.5 py-2.5 text-sm text-danger">
									<AlertTriangle size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
									<span>
										{error.message || "Something went wrong."}
										<button
											onClick={clearError}
											className="ms-2 underline underline-offset-2 hover:no-underline"
										>
											{t("close")}
										</button>
									</span>
								</div>
							)}
						</div>

						<div className="p-4 border-t border-bark-800">
							<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800 ps-3 pe-1.5 h-12 transition-[border-color,outline-color] duration-150 focus-within:border-coffee-500 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-coffee-500">
								<input
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									}}
									placeholder={t("send")}
									aria-label={t("send")}
									className="flex-1 bg-transparent text-cream-50 placeholder:text-cream-400 outline-none text-sm"
								/>
								{busy ? (
									<button
										onClick={stop}
										aria-label="stop"
										className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-bark-700 text-cream-200 transition-colors duration-150 hover:bg-bark-700 focus-ring active:opacity-80"
									>
										<Square size={14} strokeWidth={1.5} className="fill-current" />
									</button>
								) : (
									<button
										onClick={send}
										disabled={!draft.trim()}
										aria-label={t("send")}
										className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-coffee-500 text-cream-50 transition-[background-color,transform] duration-150 hover:bg-coffee-400 active:scale-[0.94] motion-reduce:transform-none disabled:opacity-40 focus-ring"
									>
										<Send size={18} strokeWidth={1.5} />
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
