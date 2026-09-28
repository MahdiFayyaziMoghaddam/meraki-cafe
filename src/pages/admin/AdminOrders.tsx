import { useState } from "react";
import { Receipt, Calendar, Filter, UserCog, Table2, Utensils, HandCoins, Clock } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { orders, type OrderStatus } from "@/lib/mock-data";
import { formatToman, formatTime } from "@/lib/format";
import { PageHeader } from "@/components/shared/PageHeader";
import StatusBadge, { type StatusBadgeStatus } from "@/components/shared/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusMap: Record<OrderStatus, StatusBadgeStatus> = {
	open: "warning",
	inProgress: "info",
	paid: "success",
	closed: "neutral"
};

export default function AdminOrders() {
	const { t, lang } = useLang();
	const [status, setStatus] = useState("all");

	const filtered = orders.filter((o) => status === "all" || o.status === status);

	return (
		<div>
			<PageHeader icon={Receipt} title={t("orders")} subtitle={lang === "fa" ? "همه سفارش‌ها" : "All orders"} />

			<div className="flex flex-wrap gap-3 mb-5">
				<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 ps-3 h-10 transition-[border-color,outline-color] duration-150 hover:border-bark-600 focus-within:border-coffee-500 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-coffee-500">
					<Calendar size={16} strokeWidth={1.5} className="text-cream-400" />
					<input
						type="date"
						defaultValue="2026-09-27"
						className="bg-transparent text-cream-100 outline-none text-sm pe-2 [color-scheme:dark]"
					/>
				</div>
				<Select value={status} onValueChange={setStatus}>
					<SelectTrigger className="w-auto min-w-40 ps-3">
						<Filter size={16} strokeWidth={1.5} className="text-cream-400 shrink-0" />
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("all")}</SelectItem>
						<SelectItem value="open">{t("open")}</SelectItem>
						<SelectItem value="inProgress">{t("inProgress")}</SelectItem>
						<SelectItem value="paid">{t("paid")}</SelectItem>
						<SelectItem value="closed">{t("closed")}</SelectItem>
					</SelectContent>
				</Select>
				<Select defaultValue="all">
					<SelectTrigger className="w-auto min-w-36 ps-3">
						<UserCog size={16} strokeWidth={1.5} className="text-cream-400 shrink-0" />
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("all")}</SelectItem>
						<SelectItem value="sara">سارا</SelectItem>
						<SelectItem value="reza">رضا</SelectItem>
					</SelectContent>
				</Select>
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
