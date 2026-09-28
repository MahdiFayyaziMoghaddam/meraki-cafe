import { X, HandCoins, Bell } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLang } from "@/lib/language-context";
import { formatToman } from "@/lib/format";
import CategoryIcon from "./CategoryIcon";
import StatusBadge from "@/components/shared/StatusBadge";
import type { MenuItem } from "@/lib/mock-data";

type ItemModalProps = {
	item: MenuItem | null;
	onClose: () => void;
};

export default function ItemModal({ item, onClose }: ItemModalProps) {
	const { lang, t } = useLang();
	if (!item) return null;
	const name = lang === "fa" ? item.name_fa : item.name_en;
	const desc = lang === "fa" ? item.desc_fa : item.desc_en;
	const cat = lang === "fa" ? item.category : item.category;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-in fade-in duration-200 motion-reduce:animate-none"
				onClick={onClose}
			/>
			<div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-bark-700 bg-bark-800 shadow-md animate-in zoom-in-95 duration-200 motion-reduce:animate-none">
				<button
					onClick={onClose}
					aria-label={t("close")}
					className="absolute top-3 end-3 z-10 inline-flex size-9 items-center justify-center rounded-[10px] bg-bark-900/80 text-cream-200 hover:bg-bark-700 transition-[background-color,transform] duration-150 active:scale-[0.94] motion-reduce:transform-none focus-ring"
				>
					<X size={18} strokeWidth={1.5} />
				</button>
				<div className="aspect-[16/10] overflow-hidden bg-bark-900">
					<Image src={item.image} alt={name} fittingType="fill" className="h-full w-full" />
				</div>
				<div className="p-5">
					<div className="flex items-center gap-2 mb-3">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-coffee-700/40 text-coffee-400 px-2.5 py-1 text-xs font-medium">
							<CategoryIcon slug={item.category} size={14} />
							{cat}
						</span>
						{!item.available && <StatusBadge status="danger">{t("notAvailable")}</StatusBadge>}
					</div>
					<h2 className="text-2xl font-semibold text-cream-50">{name}</h2>
					<p className="mt-2 text-sm text-cream-200 leading-relaxed">{desc}</p>
					<div className="mt-4 flex items-center gap-2 text-coffee-400">
						<HandCoins size={20} strokeWidth={1.5} />
						<span className="text-xl font-semibold tabular-nums">{formatToman(item.price, lang)}</span>
					</div>
					<div className="mt-4 flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 px-3 py-2.5 text-sm text-cream-300">
						<Bell size={16} strokeWidth={1.5} className="text-coffee-400" />
						{t("orderFromWaiter")}
					</div>
				</div>
			</div>
		</div>
	);
}
