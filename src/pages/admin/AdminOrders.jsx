import React, { useState } from "react";
import { Receipt, Calendar, Filter, UserCog, Table2, Utensils, HandCoins, Clock } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { orders } from "@/lib/mock-data";
import { formatToman, formatTime } from "@/lib/format";
import { PageHeader } from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";

const statusMap = { open: "warning", inProgress: "info", paid: "success", closed: "neutral" };

export default function AdminOrders() {
	const { t, lang } = useLang();
	const [status, setStatus] = useState("all");

	const filtered = orders.filter((o) => status === "all" || o.status === status);

	return (
		<div>
			<PageHeader icon={Receipt} title={t("orders")} subtitle={lang === "fa" ? "همه سفارش‌ها" : "All orders"} />

			<div className="flex flex-wrap gap-3 mb-5">
				<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 ps-3 h-10">
					<Calendar size={16} strokeWidth={1.5} className="text-cream-400" />
					<input
						type="date"
						defaultValue="2026-09-27"
						className="bg-transparent text-cream-100 outline-none text-sm pe-2 [color-scheme:dark]"
					/>
				</div>
				<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 ps-3 h-10">
					<Filter size={16} strokeWidth={1.5} className="text-cream-400" />
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="bg-transparent text-cream-100 outline-none text-sm pe-2"
					>
						<option value="all" className="bg-bark-800">
							{t("all")}
						</option>
						<option value="open" className="bg-bark-800">
							{t("open")}
						</option>
						<option value="inProgress" className="bg-bark-800">
							{t("inProgress")}
						</option>
						<option value="paid" className="bg-bark-800">
							{t("paid")}
						</option>
						<option value="closed" className="bg-bark-800">
							{t("closed")}
						</option>
					</select>
				</div>
				<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 ps-3 h-10">
					<UserCog size={16} strokeWidth={1.5} className="text-cream-400" />
					<select className="bg-transparent text-cream-100 outline-none text-sm pe-2">
						<option className="bg-bark-800">{t("all")}</option>
						<option className="bg-bark-800">سارا</option>
						<option className="bg-bark-800">رضا</option>
					</select>
				</div>
			</div>

			<div className="overflow-x-auto rounded-xl border border-bark-700/70 bg-bark-900">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
							<th className="text-start font-medium px-4 py-3">#</th>
							<th className="text-start font-medium px-4 py-3">{t("table")}</th>
							<th className="text-start font-medium px-4 py-3">{t("items")}</th>
							<th className="text-start font-medium px-4 py-3">{t("total")}</th>
							<th className="text-start font-medium px-4 py-3">{t("status")}</th>
							<th className="text-start font-medium px-4 py-3">{t("waiterCol")}</th>
							<th className="text-start font-medium px-4 py-3">{t("time")}</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((o) => (
							<tr key={o.id} className="border-b border-bark-800 hover:bg-bark-800/60">
								<td className="px-4 py-3 text-cream-200 tabular-nums">
									#{o.id.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
								</td>
								<td className="px-4 py-3 text-cream-100">
									<span className="inline-flex items-center gap-1.5">
										<Table2 size={14} strokeWidth={1.5} className="text-cream-400" />
										{o.table.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
									</span>
								</td>
								<td className="px-4 py-3 text-cream-200">
									<span className="inline-flex items-center gap-1.5">
										<Utensils size={14} strokeWidth={1.5} className="text-cream-400" />
										{o.items.length.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")}
									</span>
								</td>
								<td className="px-4 py-3 text-cream-100 tabular-nums">
									<span className="inline-flex items-center gap-1.5">
										<HandCoins size={14} strokeWidth={1.5} className="text-coffee-400" />
										{formatToman(o.total, lang)}
									</span>
								</td>
								<td className="px-4 py-3">
									<StatusBadge status={statusMap[o.status]}>{t(o.status)}</StatusBadge>
								</td>
								<td className="px-4 py-3 text-cream-200">{o.waiter}</td>
								<td className="px-4 py-3 text-cream-300">
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
	);
}
