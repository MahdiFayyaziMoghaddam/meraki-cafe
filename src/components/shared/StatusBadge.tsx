import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Clock, CircleAlert, Ban, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const map = {
	success: { icon: CircleCheck, cls: "bg-success/15 text-success" },
	warning: { icon: Clock, cls: "bg-warning/15 text-warning" },
	danger: { icon: CircleX, cls: "bg-danger/15 text-danger" },
	info: { icon: CircleAlert, cls: "bg-info/15 text-info" },
	neutral: { icon: Ban, cls: "bg-bark-700/60 text-cream-300" },
	coffee: { icon: CircleCheck, cls: "bg-coffee-700/40 text-coffee-400" }
};

export type StatusBadgeStatus = keyof typeof map;

type StatusBadgeProps = {
	status?: StatusBadgeStatus;
	children?: ReactNode;
	icon?: LucideIcon;
};

export default function StatusBadge({ status = "neutral", children, icon: OverrideIcon }: StatusBadgeProps) {
	const { icon: Icon, cls } = map[status] ?? map.neutral;
	const FinalIcon = OverrideIcon ?? Icon;
	return (
		<span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", cls)}>
			<FinalIcon size={14} strokeWidth={1.5} />
			{children}
		</span>
	);
}
