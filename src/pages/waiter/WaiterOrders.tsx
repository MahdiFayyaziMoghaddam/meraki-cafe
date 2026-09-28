import { useState } from "react";
import { Hash, Table2, Utensils, HandCoins, Clock, Check } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { orders, type Order, type OrderStatus } from "@/lib/mock-data";
import { formatToman, formatTime } from "@/lib/format";
import { PageHeader } from "@/components/shared/PageHeader";
import StatusBadge, { type StatusBadgeStatus } from "@/components/shared/StatusBadge";

const statusMap: Record<OrderStatus, StatusBadgeStatus> = {
	open: "warning",
	inProgress: "info",
	paid: "success",
	closed: "neutral"
};

export default function WaiterOrders() {
	const { t, lang } = useLang();
	const [list, setList] = useState(orders);

	const closeOrder = (id: Order["id"]) => setList((l) => l.map((o) => (o.id === id ? { ...o, status: "closed" } : o)));

	return (
		<div>
			<PageHeader
				icon={Utensils}
				title={t("todayOrders")}
				subtitle={lang === "fa" ? "سفارش‌های امروز گارسن" : "Today's waiter orders"}
			/>
			<div className="overflow-x-auto rounded-xl border border-bark-700/70 bg-bark-900">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
							<th className="text-start font-medium px-4 py-3">
								<Hash size={14} className="inline" />
							</th>
							<th className="text-start font-medium px-4 py-3">{t("table")}</th>
							<th className="text-start font-medium px-4 py-3">{t("items")}</th>
							<th className="text-start font-medium px-4 py-3">{t("total")}</th>
							<th className="text-start font-medium px-4 py-3">{t("status")}</th>
							<th className="text-start font-medium px-4 py-3">{t("time")}</th>
							<th className="text-start font-medium px-4 py-3">{t("actions")}</th>
						</tr>
					</thead>
					<tbody>
						{list.map((o) => (
							<tr key={o.id} className="border-b border-bark-800 hover:bg-bark-800/60 transition-colors">
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
								<td className="px-4 py-3 text-cream-300">
									<span className="inline-flex items-center gap-1.5">
										<Clock size={14} strokeWidth={1.5} className="text-cream-400" />
										{formatTime(o.time, lang)}
									</span>
								</td>
								<td className="px-4 py-3">
									{o.status !== "closed" ? (
										<button
											onClick={() => closeOrder(o.id)}
											className="inline-flex items-center gap-1.5 rounded-[8px] bg-coffee-700/30 text-coffee-400 px-2.5 py-1.5 text-xs font-medium hover:bg-coffee-700/50 transition-colors duration-150 focus-ring active:opacity-80"
										>
											<Check size={14} strokeWidth={1.5} /> {t("closeOrder")}
										</button>
									) : (
										<span className="text-cream-400 text-xs">—</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
