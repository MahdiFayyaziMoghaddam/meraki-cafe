import { Link, useNavigate } from "react-router-dom";
import {
	Coffee,
	Clock,
	ArrowUpRight,
	MapPin,
	Phone,
	Instagram,
	Sparkles,
	TrendingUp,
	HandCoins,
	Table2
} from "lucide-react";
import { useLang } from "@/lib/language-context";
import { menuItems, tables } from "@/lib/mock-data";
import { formatToman } from "@/lib/format";
import MenuCard from "@/components/menu/MenuCard";

function HeroPattern() {
	return (
		<svg className="absolute inset-0 w-full h-full text-coffee-500 opacity-[0.04]" aria-hidden="true">
			<defs>
				<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
					<path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	);
}

export default function Landing() {
	const { t, lang } = useLang();
	const navigate = useNavigate();
	const newArrivals = menuItems.filter((m) => m.isNew).slice(0, 4);
	const bestSellers = menuItems.filter((m) => m.isBestSeller).slice(0, 5);
	const occupied = tables.filter((tb) => tb.status === "occupied").length;

	return (
		<div className="relative">
			{/* Hero */}
			<section className="relative overflow-hidden">
				<HeroPattern />
				<div className="relative mx-auto max-w-6xl px-4 sm:px-6 min-h-[78vh] flex flex-col items-center justify-center text-center py-20">
					<span className="inline-flex size-14 items-center justify-center rounded-[14px] bg-coffee-700/30 text-coffee-400 mb-6">
						<Coffee size={28} strokeWidth={1.5} />
					</span>
					<h1 className="text-cream-50 font-bold tracking-tight" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
						{t("brand")}
					</h1>
					<p className="mt-4 text-cream-100 leading-relaxed text-lg sm:text-xl max-w-xl">
						{lang === "fa"
							? "قهوه‌خانه‌ای که در آن هر فنجان با عشق درست می‌شود."
							: "A coffee house where every cup is crafted with obsessive love."}
					</p>

					<div className="mt-6 inline-flex items-center gap-2 rounded-full border border-bark-700 bg-bark-900/70 px-4 py-2 text-sm text-cream-200">
						<Clock size={16} strokeWidth={1.5} className="text-coffee-400" />
						{t("hours")}
					</div>

					<div className="mt-8">
						<Link
							to="/menu"
							className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-6 h-12 text-cream-50 font-medium shadow-sm transition-colors hover:bg-coffee-400 focus-ring active:opacity-80"
						>
							{t("viewMenu")}
							<ArrowUpRight size={20} strokeWidth={1.5} />
						</Link>
					</div>
				</div>
			</section>

			{/* Bento preview */}
			<section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-10">
				{/* New arrivals */}
				<div>
					<div className="flex items-center gap-2 mb-4">
						<Sparkles size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-xl font-semibold text-cream-50">{t("newItems")}</h2>
					</div>
					<div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
						{newArrivals.map((item) => (
							<div key={item.id} className="snap-start shrink-0 w-64">
								<MenuCard item={item} onClick={() => navigate("/menu")} />
							</div>
						))}
					</div>
				</div>

				{/* Best sellers */}
				<div>
					<div className="flex items-center gap-2 mb-4">
						<TrendingUp size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-xl font-semibold text-cream-50">{t("bestSellers")}</h2>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{bestSellers.map((item) => (
							<MenuCard key={item.id} item={item} onClick={() => navigate("/menu")} />
						))}
					</div>
				</div>

				{/* Tables preview */}
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-6">
					<div className="flex items-center gap-2 mb-4">
						<Table2 size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-xl font-semibold text-cream-50">{t("tablesPreview")}</h2>
					</div>
					<div className="flex items-center gap-6 flex-wrap">
						<div>
							<p className="text-3xl font-semibold text-cream-50 tabular-nums">{tables.length}</p>
							<p className="text-sm text-cream-300">{lang === "fa" ? "میز فعال" : "Tables"}</p>
						</div>
						<div className="h-10 w-px bg-bark-700" />
						<div>
							<p className="text-3xl font-semibold text-coffee-400 tabular-nums">{occupied}</p>
							<p className="text-sm text-cream-300">{lang === "fa" ? "پر" : "Occupied"}</p>
						</div>
						<div className="h-10 w-px bg-bark-700" />
						<div className="flex items-center gap-1.5 text-cream-200">
							<HandCoins size={18} strokeWidth={1.5} className="text-coffee-400" />
							<span className="tabular-nums">{formatToman(1280000, lang)}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-bark-800 bg-bark-950">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream-300">
					<div className="flex items-center gap-2">
						<MapPin size={16} strokeWidth={1.5} className="text-coffee-400" />
						{t("address")}
					</div>
					<div className="flex items-center gap-2">
						<Phone size={16} strokeWidth={1.5} className="text-coffee-400" />
						{t("phone")}
					</div>
					<a
						href="#"
						aria-label="Instagram"
						className="inline-flex size-9 items-center justify-center rounded-[10px] border border-bark-700 text-cream-300 hover:text-coffee-400 hover:bg-bark-800 transition-colors duration-150 focus-ring active:opacity-80"
					>
						<Instagram size={18} strokeWidth={1.5} />
					</a>
				</div>
			</footer>
		</div>
	);
}
