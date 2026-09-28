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
	LayoutDashboard,
	ClipboardList,
	Leaf,
	Armchair,
	Zap,
	type LucideIcon
} from "lucide-react";
import { useLang } from "@/lib/language-context";
import { menuItems, tables, categories } from "@/lib/mock-data";
import { formatToman } from "@/lib/format";
import MenuCard from "@/components/menu/MenuCard";
import CategoryIcon from "@/components/menu/CategoryIcon";
import { useReveal } from "@/hooks/use-reveal";

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

function SectionTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
	return (
		<div className="flex items-center gap-2 mb-4">
			<Icon size={20} strokeWidth={1.5} className="text-coffee-400" />
			<h2 className="text-xl font-semibold text-cream-50">{title}</h2>
		</div>
	);
}

export default function Landing() {
	const { t, lang } = useLang();
	const navigate = useNavigate();
	const newArrivals = menuItems.filter((m) => m.isNew).slice(0, 4);
	const bestSellers = menuItems.filter((m) => m.isBestSeller).slice(0, 5);
	const occupied = tables.filter((tb) => tb.status === "occupied").length;
	const free = tables.length - occupied;

	const whyRef = useReveal<HTMLElement>();
	const menuRef = useReveal<HTMLDivElement>();
	const newRef = useReveal<HTMLDivElement>();
	const bestRef = useReveal<HTMLDivElement>();
	const statsRef = useReveal<HTMLDivElement>();

	const perks: { icon: LucideIcon; title: string; body: string }[] = [
		{ icon: Leaf, title: t("whyFresh"), body: t("whyFreshDesc") },
		{ icon: Armchair, title: t("whyCozy"), body: t("whyCozyDesc") },
		{ icon: Zap, title: t("whyService"), body: t("whyServiceDesc") }
	];

	const staffLinks: { to: string; label: string; icon: LucideIcon }[] = [
		{ to: "/admin", label: t("adminPanel"), icon: LayoutDashboard },
		{ to: "/waiter", label: t("waiterPanel"), icon: ClipboardList }
	];

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

					<div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
						<Link
							to="/menu"
							className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-6 h-12 text-cream-50 font-medium shadow-sm transition-[background-color,transform,box-shadow] duration-200 hover:bg-coffee-400 hover:shadow-md active:scale-[0.98] motion-reduce:transform-none focus-ring"
						>
							{t("viewMenu")}
							<ArrowUpRight size={20} strokeWidth={1.5} className="rtl:-rotate-90 motion-reduce:transition-none" />
						</Link>

						{staffLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="inline-flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900/70 px-5 h-12 text-cream-200 font-medium transition-[color,background-color,border-color,transform] duration-200 hover:border-coffee-500 hover:text-cream-50 hover:bg-bark-800 active:scale-[0.98] motion-reduce:transform-none focus-ring"
							>
								<link.icon size={18} strokeWidth={1.5} className="text-coffee-400" />
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Why us */}
			<section ref={whyRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
				<h2 className="text-center text-2xl font-semibold text-cream-50 mb-8">{t("whyUs")}</h2>
				<div className="grid gap-4 sm:grid-cols-3">
					{perks.map((perk) => (
						<div
							key={perk.title}
							className="group rounded-xl border border-bark-700/70 bg-bark-900 p-6 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-coffee-500/50 hover:shadow-md hover:-translate-y-1 motion-reduce:transform-none"
						>
							<span className="inline-flex size-11 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400 mb-4 transition-transform duration-200 motion-safe:group-hover:scale-110">
								<perk.icon size={22} strokeWidth={1.5} />
							</span>
							<h3 className="font-semibold text-cream-50 mb-1.5">{perk.title}</h3>
							<p className="text-sm text-cream-300 leading-relaxed">{perk.body}</p>
						</div>
					))}
				</div>
			</section>

			{/* Categories */}
			<section ref={menuRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
				<SectionTitle icon={Coffee} title={t("exploreMenu")} />
				<p className="text-sm text-cream-300 -mt-2 mb-4">{t("exploreMenuHint")}</p>
				<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
					{categories.map((c) => (
						<Link
							key={c.id}
							to="/menu"
							className="group flex items-center gap-3 rounded-xl border border-bark-700/70 bg-bark-900 p-4 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-coffee-500/50 hover:shadow-md hover:-translate-y-0.5 motion-reduce:transform-none focus-ring"
						>
							<span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400 transition-transform duration-200 motion-safe:group-hover:scale-110">
								<CategoryIcon slug={c.slug} size={20} />
							</span>
							<span className="min-w-0">
								<span className="block text-sm font-medium text-cream-50 truncate">
									{lang === "fa" ? c.name_fa : c.name_en}
								</span>
								<span className="block text-xs text-cream-400 tabular-nums">
									{menuItems.filter((m) => m.category === c.slug).length} {t("items")}
								</span>
							</span>
							<ArrowUpRight
								size={16}
								strokeWidth={1.5}
								className="ms-auto shrink-0 text-coffee-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rtl:-rotate-90"
							/>
						</Link>
					))}
				</div>
			</section>

			{/* New arrivals */}
			<section ref={newRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
				<SectionTitle icon={Sparkles} title={t("newItems")} />
				<div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
					{newArrivals.map((item) => (
						<div key={item.id} className="snap-start shrink-0 w-64">
							<MenuCard item={item} onClick={() => navigate("/menu")} />
						</div>
					))}
				</div>
			</section>

			{/* Best sellers */}
			<section ref={bestRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
				<SectionTitle icon={TrendingUp} title={t("bestSellers")} />
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{bestSellers.map((item) => (
						<MenuCard key={item.id} item={item} onClick={() => navigate("/menu")} />
					))}
				</div>
			</section>

			{/* Live counters */}
			<section ref={statsRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-6">
					<div className="flex flex-wrap items-center gap-y-6">
						<div className="flex-1 min-w-32">
							<p className="text-3xl font-semibold text-cream-50 tabular-nums">{tables.length}</p>
							<p className="text-sm text-cream-300">{t("tables")}</p>
						</div>
						<div className="hidden sm:block h-10 w-px bg-bark-700" />
						<div className="flex-1 min-w-32">
							<p className="text-3xl font-semibold text-coffee-400 tabular-nums">{free}</p>
							<p className="text-sm text-cream-300">{t("freeTables")}</p>
						</div>
						<div className="hidden sm:block h-10 w-px bg-bark-700" />
						<div className="flex-1 min-w-32">
							<p className="text-3xl font-semibold text-cream-50 tabular-nums">{occupied}</p>
							<p className="text-sm text-cream-300">
								{lang === "fa" ? "میز پر" : "Occupied"}
							</p>
						</div>
						<div className="hidden sm:block h-10 w-px bg-bark-700" />
						<div className="flex items-center gap-1.5 text-cream-200">
							<HandCoins size={18} strokeWidth={1.5} className="text-coffee-400" />
							<span className="tabular-nums">{formatToman(1280000, lang)}</span>
							<span className="text-sm text-cream-300">{t("recentSales")}</span>
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
					<div className="flex items-center gap-2">
						{staffLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="inline-flex items-center gap-1.5 rounded-[10px] border border-bark-700 px-3 py-2 text-cream-300 transition-[color,background-color,border-color] duration-150 hover:border-coffee-500 hover:text-coffee-400 hover:bg-bark-800 focus-ring active:opacity-80"
							>
								<link.icon size={15} strokeWidth={1.5} />
								{link.label}
							</Link>
						))}
						<a
							href="#"
							aria-label="Instagram"
							className="inline-flex size-9 items-center justify-center rounded-[10px] border border-bark-700 text-cream-300 hover:text-coffee-400 hover:bg-bark-800 transition-colors duration-150 focus-ring active:opacity-80"
						>
							<Instagram size={18} strokeWidth={1.5} />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
