import React from "react";
import {
	LayoutDashboard,
	HandCoins,
	ShoppingBag,
	Users,
	TrendingUp,
	Receipt,
	Table2,
	Utensils,
	Clock
} from "lucide-react";
import { useLang } from "@/lib/language-context";
import { revenue30, revenue12, categoryShare, orders, menuItems } from "@/lib/mock-data";
import { formatToman, formatTime } from "@/lib/format";
import KpiCard from "@/components/shared/KpiCard";
import { PageHeader } from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { RevenueLine, WeeklyBars, CategoryDonut } from "@/components/admin/Charts";
import CategoryIcon from "@/components/menu/CategoryIcon";

const statusMap = { open: "warning", inProgress: "info", paid: "success", closed: "neutral" };

export default function Dashboard() {
	const { t, lang } = useLang();
	const totalRevenue = revenue30.reduce((s, d) => s + d.revenue, 0);
	const totalOrders = orders.length;

	const topItems = [...menuItems].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)).slice(0, 5);
	const latest = orders.slice(0, 10);

	return (
		<div>
			<PageHeader icon={LayoutDashboard} title={t("dashboard")} subtitle={t("overview")} />

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<KpiCard
					icon={HandCoins}
					label={t("revenue")}
					value={formatToman(totalRevenue, lang).replace(lang === "fa" ? " تومان" : " Toman", "")}
					delta="12%"
					deltaUp
					suffix={lang === "fa" ? "ت" : "T"}
				/>
				<KpiCard
					icon={ShoppingBag}
					label={t("orders")}
					value={totalOrders.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
					delta="8%"
					deltaUp
				/>
				<KpiCard icon={Users} label={lang === "fa" ? "مشتریان" : "Customers"} value="۳۲۴" delta="5%" deltaUp />
				<KpiCard icon={TrendingUp} label={t("margin")} value="58%" delta="3%" deltaUp suffix="%" />
			</div>

			<div className="grid lg:grid-cols-3 gap-4 mb-6">
				<div className="lg:col-span-2 rounded-xl border border-bark-700/70 bg-bark-900 p-5">
					<div className="flex items-center gap-2 mb-4">
						<TrendingUp size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-cream-50 font-semibold">
							{t("revenue")} — 30 {lang === "fa" ? "روز" : "days"}
						</h2>
					</div>
					<RevenueLine data={revenue30} />
				</div>
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5">
					<div className="flex items-center gap-2 mb-4">
						<LayoutDashboard size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-cream-50 font-semibold">{t("share")}</h2>
					</div>
					<CategoryDonut data={categoryShare} />
				</div>
			</div>

			<div className="grid lg:grid-cols-3 gap-4 mb-6">
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5">
					<div className="flex items-center gap-2 mb-4">
						<TrendingUp size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-cream-50 font-semibold">{lang === "fa" ? "درآمد هفتگی" : "Weekly Revenue"}</h2>
					</div>
					<WeeklyBars data={revenue12} />
				</div>
				<div className="lg:col-span-2 rounded-xl border border-bark-700/70 bg-bark-900 p-5">
					<div className="flex items-center gap-2 mb-4">
						<Receipt size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-cream-50 font-semibold">{t("topItems")}</h2>
					</div>
					<div className="space-y-2">
						{topItems.map((m, i) => (
							<div key={m.id} className="flex items-center gap-3">
								<span className="inline-flex size-7 items-center justify-center rounded-full bg-bark-800 text-cream-300 text-xs font-semibold tabular-nums">
									{(i + 1).toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
								</span>
								<CategoryIcon slug={m.category} size={16} className="text-cream-400" />
								<span className="flex-1 text-cream-100 text-sm">{lang === "fa" ? m.name_fa : m.name_en}</span>
								<span className="inline-flex items-center gap-1 text-coffee-400 text-sm tabular-nums">
									<TrendingUp size={14} strokeWidth={1.5} />
									{(120 - i * 18).toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="rounded-xl border border-bark-700/70 bg-bark-900 overflow-hidden">
				<div className="flex items-center gap-2 p-5 pb-3">
					<Receipt size={20} strokeWidth={1.5} className="text-coffee-400" />
					<h2 className="text-cream-50 font-semibold">{t("latestOrders")}</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
								<th className="text-start font-medium px-5 py-2.5">#</th>
								<th className="text-start font-medium px-5 py-2.5">{t("table")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("items")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("total")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("status")}</th>
								<th className="text-start font-medium px-5 py-2.5">{t("time")}</th>
							</tr>
						</thead>
						<tbody>
							{latest.map((o) => (
								<tr key={o.id} className="border-b border-bark-800 hover:bg-bark-800/60">
									<td className="px-5 py-2.5 text-cream-200 tabular-nums">
										#{o.id.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
									</td>
									<td className="px-5 py-2.5 text-cream-100">
										<span className="inline-flex items-center gap-1.5">
											<Table2 size={14} strokeWidth={1.5} className="text-cream-400" />
											{o.table.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
										</span>
									</td>
									<td className="px-5 py-2.5 text-cream-200">
										<span className="inline-flex items-center gap-1.5">
											<Utensils size={14} strokeWidth={1.5} className="text-cream-400" />
											{o.items.length.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
										</span>
									</td>
									<td className="px-5 py-2.5 text-cream-100 tabular-nums">{formatToman(o.total, lang)}</td>
									<td className="px-5 py-2.5">
										<StatusBadge status={statusMap[o.status]}>{t(o.status)}</StatusBadge>
									</td>
									<td className="px-5 py-2.5 text-cream-300">
										<span className="inline-flex items-center gap-1.5">
											<Clock size={14} strokeWidth={1.5} className="text-cream-400" />
											{formatTime(o.time, lang)}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
