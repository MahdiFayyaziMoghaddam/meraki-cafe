import { HandCoins, Sparkles, TrendingUp } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLang } from "@/lib/language-context";
import { formatToman } from "@/lib/format";
import type { MenuItem } from "@/lib/mock-data";

type MenuCardProps = {
	item: MenuItem;
	onClick: () => void;
};

export default function MenuCard({ item, onClick }: MenuCardProps) {
	const { lang } = useLang();
	const name = lang === "fa" ? item.name_fa : item.name_en;
	const desc = lang === "fa" ? item.desc_fa : item.desc_en;
	return (
		<button
			onClick={onClick}
			className="group text-start flex flex-col overflow-hidden rounded-xl border border-bark-700/70 bg-bark-900 transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-bark-600 hover:shadow-md active:scale-[0.99] motion-reduce:transform-none focus-ring w-full"
		>
			<div className="relative aspect-[4/3] overflow-hidden bg-bark-800">
				<Image
					src={item.image}
					alt={name}
					fittingType="fill"
					className="h-full w-full transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100"
				/>
				<div className="absolute top-2 start-2 flex gap-1.5">
					{item.isNew && (
						<span className="inline-flex items-center gap-1 rounded-full bg-coffee-500 text-cream-50 px-2 py-0.5 text-xs font-medium">
							<Sparkles size={12} strokeWidth={1.5} /> {lang === "fa" ? "جدید" : "New"}
						</span>
					)}
					{item.isBestSeller && (
						<span className="inline-flex items-center gap-1 rounded-full bg-bark-900/90 text-warning px-2 py-0.5 text-xs font-medium">
							<TrendingUp size={12} strokeWidth={1.5} /> {lang === "fa" ? "پرفروش" : "Top"}
						</span>
					)}
				</div>
				{!item.available && (
					<div className="absolute inset-0 bg-ink-950/60 flex items-center justify-center">
						<span className="rounded-full bg-bark-900/90 text-cream-300 px-3 py-1 text-xs">
							{lang === "fa" ? "ناموجود" : "Unavailable"}
						</span>
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col p-4">
				<h3 className="text-cream-50 font-semibold">{name}</h3>
				<p className="mt-1 text-sm text-cream-300 line-clamp-2 flex-1">{desc}</p>
				<div className="mt-3 flex items-center gap-1.5 text-coffee-400">
					<HandCoins size={16} strokeWidth={1.5} />
					<span className="text-sm font-medium tabular-nums">{formatToman(item.price, lang)}</span>
				</div>
			</div>
		</button>
	);
}
