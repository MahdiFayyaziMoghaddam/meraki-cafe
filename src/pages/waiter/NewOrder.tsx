import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table2, Plus, Minus, Trash2, HandCoins, NotebookPen, Check, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { menuItems, categories, type MenuItem } from "@/lib/mock-data";
import { formatToman } from "@/lib/format";
import CategoryIcon from "@/components/menu/CategoryIcon";
import { cn } from "@/lib/utils";

export default function NewOrder() {
	const { t, lang } = useLang();
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const tableNum = params.get("table") || "1";
	const [active, setActive] = useState("all");
	const [cart, setCart] = useState<Record<MenuItem["id"], number>>({});
	const [note, setNote] = useState("");

	const setQty = (id: MenuItem["id"], delta: number) =>
		setCart((c) => {
			const q = (c[id] || 0) + delta;
			const next = { ...c };
			if (q <= 0) delete next[id];
			else next[id] = q;
			return next;
		});

	const filtered = menuItems.filter((m) => active === "all" || m.category === active);
	const cartItems = Object.entries(cart).flatMap(([id, qty]) => {
		const m = menuItems.find((x) => x.id === id);
		return m ? [{ ...m, qty, lineTotal: m.price * qty }] : [];
	});
	const subtotal = cartItems.reduce((s, it) => s + it.lineTotal, 0);

	const tabs = [{ slug: "all", name_fa: "همه", name_en: "All" }, ...categories];

	return (
		<div>
			<div className="flex items-center gap-3 mb-6">
				<button
					onClick={() => navigate("/waiter")}
					className="inline-flex size-10 items-center justify-center rounded-[10px] border border-bark-700 text-cream-200 hover:bg-bark-800"
				>
					<ArrowRight size={18} strokeWidth={1.5} className="rtl:rotate-0 ltr:rotate-180" />
				</button>
				<div className="flex items-center gap-2">
					<Table2 size={22} strokeWidth={1.5} className="text-coffee-400" />
					<h1 className="text-2xl font-semibold text-cream-50">
						{t("newOrder")} — {lang === "fa" ? `میز ${tableNum}` : `Table ${tableNum}`}
					</h1>
				</div>
			</div>

			<div className="grid lg:grid-cols-3 gap-6">
				{/* Item list */}
				<div className="lg:col-span-2">
					<div className="flex gap-2 overflow-x-auto pb-2 mb-4">
						{tabs.map((c) => (
							<button
								key={c.slug}
								onClick={() => setActive(c.slug)}
								className={cn(
									"inline-flex items-center gap-2 rounded-full px-3.5 h-9 text-sm font-medium whitespace-nowrap border transition-colors",
									active === c.slug
										? "bg-coffee-500 text-cream-50 border-coffee-500"
										: "bg-bark-900 text-cream-200 border-bark-700 hover:bg-bark-800"
								)}
							>
								{c.slug !== "all" && <CategoryIcon slug={c.slug} size={14} />}
								{lang === "fa" ? c.name_fa : c.name_en}
							</button>
						))}
					</div>

					<div className="space-y-2">
						{filtered.map((m) => {
							const qty = cart[m.id] || 0;
							const name = lang === "fa" ? m.name_fa : m.name_en;
							return (
								<div
									key={m.id}
									className="flex items-center justify-between gap-3 rounded-[10px] border border-bark-700/70 bg-bark-900 px-3 py-2.5"
								>
									<div className="min-w-0">
										<p className="text-cream-50 font-medium truncate">{name}</p>
										<p className="text-sm text-coffee-400 tabular-nums">{formatToman(m.price, lang)}</p>
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => setQty(m.id, -1)}
											disabled={!qty}
											aria-label="decrease"
											className="inline-flex size-9 items-center justify-center rounded-[8px] border border-bark-700 text-cream-200 hover:bg-bark-800 disabled:opacity-40"
										>
											<Minus size={16} strokeWidth={1.5} />
										</button>
										<span className="w-6 text-center text-cream-50 tabular-nums">
											{qty.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
										</span>
										<button
											onClick={() => setQty(m.id, 1)}
											aria-label="increase"
											className="inline-flex size-9 items-center justify-center rounded-[8px] bg-coffee-500 text-cream-50 hover:bg-coffee-400"
										>
											<Plus size={16} strokeWidth={1.5} />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Summary */}
				<div className="lg:sticky lg:top-6 h-fit">
					<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5">
						<h2 className="text-cream-50 font-semibold mb-4">{t("newOrder")}</h2>
						{cartItems.length === 0 ? (
							<p className="text-sm text-cream-400 py-8 text-center">{t("emptyHint")}</p>
						) : (
							<div className="space-y-2 max-h-64 overflow-y-auto">
								{cartItems.map((it) => (
									<div key={it.id} className="flex items-center justify-between gap-2 text-sm">
										<div className="flex items-center gap-2 min-w-0">
											<button onClick={() => setQty(it.id, -it.qty)} className="text-cream-400 hover:text-danger">
												<Trash2 size={15} strokeWidth={1.5} />
											</button>
											<span className="text-cream-100 truncate">
												{lang === "fa" ? it.name_fa : it.name_en}{" "}
												<span className="text-cream-400">
													×{it.qty.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
												</span>
											</span>
										</div>
										<span className="text-cream-200 tabular-nums">{formatToman(it.lineTotal, lang)}</span>
									</div>
								))}
							</div>
						)}

						<div className="mt-4 pt-4 border-t border-bark-700 flex items-center justify-between">
							<span className="text-cream-300 flex items-center gap-1.5">
								<HandCoins size={16} strokeWidth={1.5} /> {t("subtotal")}
							</span>
							<span className="text-xl font-semibold text-cream-50 tabular-nums">{formatToman(subtotal, lang)}</span>
						</div>

						<div className="mt-4">
							<label className="text-sm text-cream-200 flex items-center gap-1.5 mb-1.5">
								<NotebookPen size={15} strokeWidth={1.5} /> {t("note")}
							</label>
							<textarea
								value={note}
								onChange={(e) => setNote(e.target.value)}
								rows={2}
								className="w-full rounded-[10px] border border-bark-700 bg-bark-800 p-3 text-sm text-cream-50 placeholder:text-cream-400 outline-none focus:border-coffee-500 resize-none"
								placeholder={t("note")}
							/>
						</div>

						<button
							onClick={() => navigate("/waiter/orders")}
							disabled={!cartItems.length}
							className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-coffee-500 h-11 text-cream-50 font-medium hover:bg-coffee-400 disabled:opacity-40 transition-colors"
						>
							<Check size={18} strokeWidth={1.5} /> {t("confirm")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
