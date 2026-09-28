import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import IconBadge from "./IconBadge";

export default function KpiCard({ icon: Icon, label, value, delta, deltaUp = true, suffix }) {
	return (
		<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5 transition-colors hover:border-bark-600">
			<div className="flex items-start justify-between">
				<IconBadge icon={Icon} />
				{delta != null && (
					<span
						className={cn(
							"inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
							deltaUp ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
						)}
					>
						{deltaUp ? <TrendingUp size={12} strokeWidth={1.5} /> : <TrendingDown size={12} strokeWidth={1.5} />}
						{delta}
					</span>
				)}
			</div>
			<p className="mt-4 text-sm text-cream-300">{label}</p>
			<p className="mt-1 text-2xl font-semibold text-cream-50 tabular-nums">
				{value}
				{suffix && <span className="text-base text-cream-300 font-normal ms-1">{suffix}</span>}
			</p>
		</div>
	);
}
