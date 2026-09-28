import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
	icon: LucideIcon;
	className?: string;
	size?: number;
};

export default function IconBadge({ icon: Icon, className, size = 20 }: IconBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex size-10 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400",
				className
			)}
		>
			<Icon size={size} strokeWidth={1.5} />
		</span>
	);
}
