import { useState, type ReactNode } from "react";
import { TrendingUp, Plus, Pencil, Trash2, Tag, HandCoins, Filter, Calendar, AlignLeft, X, Save, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { expenses as mockExpenses } from "@/lib/mock-data";
import { formatToman, formatDate } from "@/lib/format";
import { PageHeader } from "@/components/shared/PageHeader";
import { cn } from "@/lib/utils";

const inputCls =
	"w-full rounded-[10px] border border-bark-700 bg-bark-800 px-3 h-11 text-cream-50 placeholder:text-cream-400 outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/30 text-sm";

type FieldProps = {
	icon: LucideIcon;
	label: ReactNode;
	children: ReactNode;
};

function Field({ icon: Icon, label, children }: FieldProps) {
	return (
		<div>
			<label className="text-sm text-cream-200 flex items-center gap-1.5 mb-1.5">
				<Icon size={15} strokeWidth={1.5} className="text-cream-400" /> {label}
			</label>
			{children}
		</div>
	);
}

export default function Expenses() {
	const { t, lang } = useLang();
	const list = mockExpenses;
	const [open, setOpen] = useState(false);

	return (
		<div>
			<PageHeader
				icon={TrendingUp}
				title={t("expenses")}
				subtitle={lang === "fa" ? "مدیریت هزینه‌ها" : "Manage expenses"}
				actions={
					<button
						onClick={() => setOpen(true)}
						className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-4 h-10 text-cream-50 text-sm font-medium hover:bg-coffee-400 transition-colors"
					>
						<Plus size={18} strokeWidth={1.5} /> {t("addExpense")}
					</button>
				}
			/>

			<div className="overflow-x-auto rounded-xl border border-bark-700/70 bg-bark-900">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
							<th className="text-start font-medium px-4 py-3">{t("title")}</th>
							<th className="text-start font-medium px-4 py-3">{t("category")}</th>
							<th className="text-start font-medium px-4 py-3">{t("amount")}</th>
							<th className="text-start font-medium px-4 py-3">{t("date")}</th>
							<th className="text-start font-medium px-4 py-3">{t("actions")}</th>
						</tr>
					</thead>
					<tbody>
						{list.map((e) => (
							<tr key={e.id} className="border-b border-bark-800 hover:bg-bark-800/60">
								<td className="px-4 py-3 text-cream-100">{lang === "fa" ? e.title_fa : e.title_en}</td>
								<td className="px-4 py-3">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-bark-800 text-cream-300 px-2.5 py-1 text-xs">
										{e.category}
									</span>
								</td>
								<td className="px-4 py-3 text-cream-100 tabular-nums">{formatToman(e.amount, lang)}</td>
								<td className="px-4 py-3 text-cream-300">{formatDate(e.date, lang)}</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-1">
										<button
											onClick={() => setOpen(true)}
											aria-label={t("edit")}
											className="inline-flex size-9 items-center justify-center rounded-[8px] text-cream-300 hover:text-coffee-400 hover:bg-bark-800"
										>
											<Pencil size={16} strokeWidth={1.5} />
										</button>
										<button
											aria-label={t("delete")}
											className="inline-flex size-9 items-center justify-center rounded-[8px] text-cream-300 hover:text-danger hover:bg-bark-800"
										>
											<Trash2 size={16} strokeWidth={1.5} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
					<div className="relative w-full max-w-md rounded-xl border border-bark-700 bg-bark-800 shadow-md p-5">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-cream-50 font-semibold">{t("addExpense")}</h2>
							<button
								onClick={() => setOpen(false)}
								aria-label={t("close")}
								className="inline-flex size-9 items-center justify-center rounded-[10px] text-cream-300 hover:bg-bark-700"
							>
								<X size={18} strokeWidth={1.5} />
							</button>
						</div>
						<div className="space-y-4">
							<Field icon={Tag} label={t("title")}>
								<input className={inputCls} placeholder={t("title")} />
							</Field>
							<Field icon={HandCoins} label={t("amount")}>
								<input type="number" className={inputCls} placeholder="0" />
							</Field>
							<Field icon={Filter} label={t("category")}>
								<select className={inputCls}>
									<option className="bg-bark-800">مواد اولیه</option>
									<option className="bg-bark-800">حقوق</option>
									<option className="bg-bark-800">قبوض</option>
									<option className="bg-bark-800">بازاریابی</option>
								</select>
							</Field>
							<Field icon={Calendar} label={t("date")}>
								<input type="date" defaultValue="2026-09-27" className={cn(inputCls, "[color-scheme:dark]")} />
							</Field>
							<Field icon={AlignLeft} label={t("note")}>
								<textarea rows={2} className={cn(inputCls, "h-auto py-3 resize-none")} />
							</Field>
						</div>
						<div className="flex items-center gap-3 mt-5">
							<button
								onClick={() => setOpen(false)}
								className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-5 h-11 text-cream-50 text-sm font-medium hover:bg-coffee-400"
							>
								<Save size={18} strokeWidth={1.5} /> {t("save")}
							</button>
							<button
								onClick={() => setOpen(false)}
								className="inline-flex items-center gap-2 rounded-[10px] border border-bark-700 px-5 h-11 text-cream-200 text-sm hover:bg-bark-700"
							>
								<X size={18} strokeWidth={1.5} /> {t("cancel")}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
