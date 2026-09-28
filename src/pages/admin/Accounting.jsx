import React, { useState } from "react";
import { Wallet, HandCoins, TrendingUp, Percent, Download, Plus, Calendar } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { revenue30, expenses } from "@/lib/mock-data";
import { formatToman, formatDate } from "@/lib/format";
import KpiCard from "@/components/shared/KpiCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProfitArea } from "@/components/admin/Charts";
import { RevenueLine } from "@/components/admin/Charts";
import { cn } from "@/lib/utils";

export default function Accounting() {
	const { t, lang } = useLang();
	const [range, setRange] = useState("month");

	const revenue = revenue30.reduce((s, d) => s + d.revenue, 0);
	const exp = revenue30.reduce((s, d) => s + d.expenses, 0);
	const net = revenue - exp;
	const margin = Math.round((net / revenue) * 100);

	const ranges = [
		{ id: "today", label: t("today") },
		{ id: "week", label: t("week") },
		{ id: "month", label: t("month") },
		{ id: "year", label: t("year") },
		{ id: "custom", label: t("custom") }
	];

	return (
		<div>
			<PageHeader
				icon={Wallet}
				title={t("accounting")}
				subtitle={lang === "fa" ? "گزارش مالی" : "Financial report"}
				actions={
					<button className="inline-flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800 px-3 h-10 text-sm text-cream-200 hover:bg-bark-700 transition-colors">
						<Download size={16} strokeWidth={1.5} /> {t("export")}
					</button>
				}
			/>

			<div className="flex flex-wrap gap-2 mb-6">
				{ranges.map((r) => (
					<button
						key={r.id}
						onClick={() => setRange(r.id)}
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full px-4 h-9 text-sm font-medium border transition-colors",
							range === r.id
								? "bg-coffee-500 text-cream-50 border-coffee-500"
								: "bg-bark-900 text-cream-200 border-bark-700 hover:bg-bark-800"
						)}
					>
						<Calendar size={14} strokeWidth={1.5} /> {r.label}
					</button>
				))}
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<KpiCard
					icon={HandCoins}
					label={t("revenue")}
					value={formatToman(revenue, lang).replace(lang === "fa" ? " تومان" : " Toman", "")}
					delta="12%"
					deltaUp
					suffix={lang === "fa" ? "ت" : "T"}
				/>
				<KpiCard
					icon={Wallet}
					label={t("expensesLabel")}
					value={formatToman(exp, lang).replace(lang === "fa" ? " تومان" : " Toman", "")}
					delta="6%"
					deltaUp={false}
					suffix={lang === "fa" ? "ت" : "T"}
				/>
				<KpiCard
					icon={TrendingUp}
					label={t("netProfit")}
					value={formatToman(net, lang).replace(lang === "fa" ? " تومان" : " Toman", "")}
					delta="18%"
					deltaUp
					suffix={lang === "fa" ? "ت" : "T"}
				/>
				<KpiCard
					icon={Percent}
					label={t("margin")}
					value={`${margin.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}%`}
					delta="3%"
					deltaUp
				/>
			</div>

			<div className="grid lg:grid-cols-2 gap-4 mb-6">
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5">
					<h2 className="text-cream-50 font-semibold mb-4">
						{lang === "fa" ? "درآمد در برابر هزینه" : "Revenue vs Expenses"}
					</h2>
					<RevenueLine data={revenue30} />
				</div>
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5">
					<h2 className="text-cream-50 font-semibold mb-4 flex items-center gap-2">
						<TrendingUp size={18} strokeWidth={1.5} className="text-coffee-400" /> {t("netProfit")}
					</h2>
					<ProfitArea data={revenue30} />
				</div>
			</div>

			<div className="rounded-xl border border-bark-700/70 bg-bark-900 overflow-hidden">
				<div className="flex items-center justify-between p-5 pb-3">
					<h2 className="text-cream-50 font-semibold flex items-center gap-2">
						<Wallet size={18} strokeWidth={1.5} className="text-coffee-400" /> {t("expenses")}
					</h2>
					<button className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-3.5 h-9 text-cream-50 text-sm font-medium hover:bg-coffee-400 transition-colors">
						<Plus size={16} strokeWidth={1.5} /> {t("addExpense")}
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
								<th className="text-start font-medium px-5 py-2.5">{t("title")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("category")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("amount")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("date")}</th>
							</tr>
						</thead>
						<tbody>
							{expenses.map((e) => (
								<tr key={e.id} className="border-b border-bark-800 hover:bg-bark-800/60">
									<td className="px-5 py-2.5 text-cream-100">{lang === "fa" ? e.title_fa : e.title_en}</td>
									<td className="px-5 py-2.5">
										<span className="inline-flex items-center gap-1.5 rounded-full bg-bark-800 text-cream-300 px-2.5 py-1 text-xs">
											{e.category}
										</span>
									</td>
									<td className="px-5 py-2.5 text-cream-100 tabular-nums">{formatToman(e.amount, lang)}</td>
									<td className="px-5 py-2.5 text-cream-300">{formatDate(e.date, lang)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
