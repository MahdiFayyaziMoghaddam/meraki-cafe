import React from "react";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Clock, CircleAlert, Ban } from "lucide-react";

const map = {
	success: { icon: CircleCheck, cls: "bg-success/15 text-success" },
	warning: { icon: Clock, cls: "bg-warning/15 text-warning" },
	danger: { icon: CircleX, cls: "bg-danger/15 text-danger" },
	info: { icon: CircleAlert, cls: "bg-info/15 text-info" },
	neutral: { icon: Ban, cls: "bg-bark-700/60 text-cream-300" },
	coffee: { icon: CircleCheck, cls: "bg-coffee-700/40 text-coffee-400" }
};

export default function StatusBadge({ status = "neutral", children, icon: OverrideIcon }) {
	const { icon: Icon, cls } = map[status] || map.neutral;
	const FinalIcon = OverrideIcon || Icon;
	return (
		<span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", cls)}>
			<FinalIcon size={14} strokeWidth={1.5} />
			{children}
		</span>
	);
}
