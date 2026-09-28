import { useState } from "react";
import { Bot, Send, X, MessageCircle, Sparkles } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function AIAssistant() {
	const { t, lang } = useLang();
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ from: "bot", text: t("aiGreeting") },
		{ from: "user", text: lang === "fa" ? "یه قهوه کم‌شیرین پیشنهاد بده" : "Suggest a low-sugar coffee" },
		{
			from: "bot",
			text:
				lang === "fa"
					? "کاپوچینو با شیر بادام پیشنهاد می‌کنم — ملایم و کم‌شیرین. ☕"
					: "I'd suggest a cappuccino with almond milk — smooth and lightly sweet. ☕"
		}
	]);
	const [draft, setDraft] = useState("");

	const send = () => {
		if (!draft.trim()) return;
		setMessages((m) => [...m, { from: "user", text: draft }]);
		setDraft("");
		setTimeout(() => {
			setMessages((m) => [
				...m,
				{ from: "bot", text: lang === "fa" ? "ثبت شد! گارسن به زودی می‌رسد." : "Noted! Your waiter is on the way." }
			]);
		}, 500);
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				aria-label={t("aiAssistant")}
				className="fixed bottom-6 end-6 z-40 inline-flex items-center gap-2 rounded-full bg-coffee-500 px-4 h-12 text-cream-50 shadow-glow transition-colors hover:bg-coffee-400"
			>
				<MessageCircle size={20} strokeWidth={1.5} />
				<span className="text-sm font-medium hidden sm:inline">{t("aiAssistant")}</span>
			</button>

			{open && (
				<div className="fixed inset-0 z-50">
					<div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
					<div className="absolute inset-y-0 end-0 w-full max-w-md bg-bark-900 border-s border-bark-700 flex flex-col">
						<div className="flex items-center justify-between h-16 px-5 border-b border-bark-800">
							<div className="flex items-center gap-2.5">
								<span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400">
									<Bot size={20} strokeWidth={1.5} />
								</span>
								<div>
									<p className="text-cream-50 font-semibold leading-tight">{t("aiAssistant")}</p>
									<p className="text-xs text-cream-400 flex items-center gap-1">
										<Sparkles size={12} strokeWidth={1.5} /> Meraki AI
									</p>
								</div>
							</div>
							<button
								onClick={() => setOpen(false)}
								aria-label={t("close")}
								className="inline-flex size-9 items-center justify-center rounded-[10px] text-cream-300 hover:bg-bark-800"
							>
								<X size={18} strokeWidth={1.5} />
							</button>
						</div>
						<div className="flex-1 overflow-y-auto p-5 space-y-3">
							{messages.map((m, i) => (
								<div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
									<div
										className={cn(
											"max-w-[80%] rounded-[10px] px-3.5 py-2.5 text-sm",
											m.from === "user"
												? "bg-coffee-500 text-cream-50"
												: "bg-bark-800 text-cream-100 border border-bark-700"
										)}
									>
										{m.text}
									</div>
								</div>
							))}
						</div>
						<div className="p-4 border-t border-bark-800">
							<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800 ps-3 pe-1.5 h-12">
								<input
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && send()}
									placeholder={t("send")}
									className="flex-1 bg-transparent text-cream-50 placeholder:text-cream-400 outline-none text-sm"
								/>
								<button
									onClick={send}
									aria-label={t("send")}
									className="inline-flex size-9 items-center justify-center rounded-[8px] bg-coffee-500 text-cream-50 hover:bg-coffee-400 transition-colors"
								>
									<Send size={18} strokeWidth={1.5} />
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
