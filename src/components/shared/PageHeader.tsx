import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
	icon?: LucideIcon;
	title: ReactNode;
	hint?: ReactNode;
	action?: ReactNode;
};

export default function EmptyState({ icon: Icon, title, hint, action }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			{Icon && <Icon size={48} strokeWidth={1.5} className="text-coffee-500/60 mb-4" />}
			<p className="text-cream-100 font-medium">{title}</p>
			{hint && <p className="text-cream-400 text-sm mt-1">{hint}</p>}
			{action && <div className="mt-5">{action}</div>}
		</div>
	);
}

type PageHeaderProps = {
	icon?: LucideIcon;
	title: ReactNode;
	subtitle?: ReactNode;
	actions?: ReactNode;
};

export function PageHeader({ icon: Icon, title, subtitle, actions }: PageHeaderProps) {
	return (
		<div className="flex flex-wrap items-start justify-between gap-4 mb-6">
			<div className="flex items-center gap-3">
				{Icon && (
					<span className="inline-flex size-11 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400">
						<Icon size={24} strokeWidth={1.5} />
					</span>
				)}
				<div>
					<h1 className="text-2xl font-semibold text-cream-50 tracking-tight">{title}</h1>
					{subtitle && <p className="text-sm text-cream-300 mt-0.5">{subtitle}</p>}
				</div>
			</div>
			{actions && <div className="flex items-center gap-2">{actions}</div>}
		</div>
	);
}
