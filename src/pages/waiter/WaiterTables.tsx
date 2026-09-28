import { useNavigate } from "react-router-dom";
import { Table2, CircleCheck, Clock, RefreshCw } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { tables } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

export default function WaiterTables() {
	const { t, lang } = useLang();
	const navigate = useNavigate();

	return (
		<div>
			<PageHeader
				icon={Table2}
				title={t("tables")}
				subtitle={lang === "fa" ? "انتخاب میز برای ثبت سفارش" : "Pick a table to start an order"}
				actions={
					<button className="inline-flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800 px-3 h-10 text-sm text-cream-200 hover:bg-bark-700 transition-colors focus-ring active:opacity-80">
						<RefreshCw size={16} strokeWidth={1.5} /> {t("refresh")}
					</button>
				}
			/>

			{/* 1 column below sm: a status badge with a 12-14 char Persian label needs ~124px,
			    but a 2-up grid at 320px leaves only ~88px inside a p-6 card, so the label
			    spilled past the card edge. 1 column is also a better tap target. */}
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
				{tables.map((tb) => {
					const occupied = tb.status === "occupied";
					return (
						<button
							key={tb.id}
							onClick={() => navigate(`/waiter/order/new?table=${tb.number}`)}
							className={cn(
								"flex flex-col items-center justify-center gap-2 rounded-xl border p-4 sm:p-6 transition-colors focus-ring active:opacity-80",
								occupied
									? "border-coffee-500/40 bg-bark-900 shadow-glow hover:border-coffee-500"
									: "border-bark-700/70 bg-bark-900 hover:border-bark-600"
							)}
						>
							<Table2 size={28} strokeWidth={1.5} className={occupied ? "text-coffee-400" : "text-cream-300"} />
							<span className="text-lg font-semibold text-cream-50">
								{lang === "fa" ? `میز ${tb.number.toLocaleString("fa-IR")}` : `Table ${tb.number}`}
							</span>
							{occupied ? (
								<StatusBadge status="warning" icon={Clock}>
									{t("inProgress")}
								</StatusBadge>
							) : (
								<StatusBadge status="success" icon={CircleCheck}>
									{t("open")}
								</StatusBadge>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
