import { useState } from "react";
import { Sparkles, TrendingUp, Search } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { menuItems, categories, type MenuItem } from "@/lib/mock-data";
import MenuCard from "@/components/menu/MenuCard";
import ItemModal from "@/components/menu/ItemModal";
import CategoryIcon from "@/components/menu/CategoryIcon";
import AIAssistant from "@/components/ai/AIAssistant";
import { cn } from "@/lib/utils";

export default function Menu() {
	const { t, lang } = useLang();
	const [active, setActive] = useState("all");
	const [selected, setSelected] = useState<MenuItem | null>(null);
	const [query, setQuery] = useState("");

	const filtered = menuItems.filter((m) => {
		const matchCat = active === "all" || m.category === active;
		const name = lang === "fa" ? m.name_fa : m.name_en;
		const matchQ = !query || name.toLowerCase().includes(query.toLowerCase());
		return matchCat && matchQ;
	});

	const newArrivals = menuItems.filter((m) => m.isNew);
	const bestSellers = menuItems.filter((m) => m.isBestSeller).slice(0, 5);

	const tabs = [{ slug: "all", name_fa: "همه", name_en: "All", icon: null }, ...categories];

	return (
		<div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
			{/* Search */}
			<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 ps-3 h-11 mb-6 transition-[border-color,outline-color] duration-150 hover:border-bark-600 focus-within:border-coffee-500 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-coffee-500">
				<Search size={18} strokeWidth={1.5} className="text-cream-400" />
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={t("search")}
					className="flex-1 bg-transparent text-cream-50 placeholder:text-cream-400 outline-none text-sm"
				/>
			</div>

			{/* Category tabs */}
			<div className="flex gap-2 overflow-x-auto pb-2 mb-8">
				{tabs.map((c) => (
					<button
						key={c.slug}
						onClick={() => setActive(c.slug)}
						className={cn(
							"inline-flex items-center gap-2 rounded-full px-4 h-10 text-sm font-medium whitespace-nowrap transition-colors border focus-ring",
							active === c.slug
								? "bg-coffee-500 text-cream-50 border-coffee-500"
								: "bg-bark-900 text-cream-200 border-bark-700 hover:bg-bark-800"
						)}
					>
						{c.slug !== "all" && <CategoryIcon slug={c.slug} size={16} />}
						{lang === "fa" ? c.name_fa : c.name_en}
					</button>
				))}
			</div>

			{/* New arrivals */}
			{active === "all" && !query && (
				<section className="mb-10">
					<div className="flex items-center gap-2 mb-4">
						<Sparkles size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-xl font-semibold text-cream-50">{t("newItems")}</h2>
					</div>
					<div className="flex gap-4 overflow-x-auto pb-2 snap-x">
						{newArrivals.map((item) => (
							<div key={item.id} className="snap-start shrink-0 w-60">
								<MenuCard item={item} onClick={() => setSelected(item)} />
							</div>
						))}
					</div>
				</section>
			)}

			{/* Best sellers */}
			{active === "all" && !query && (
				<section className="mb-10">
					<div className="flex items-center gap-2 mb-4">
						<TrendingUp size={20} strokeWidth={1.5} className="text-coffee-400" />
						<h2 className="text-xl font-semibold text-cream-50">{t("bestSellers")}</h2>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{bestSellers.map((item) => (
							<MenuCard key={item.id} item={item} onClick={() => setSelected(item)} />
						))}
					</div>
				</section>
			)}

			{/* Full grid */}
			<section>
				<h2 className="text-xl font-semibold text-cream-50 mb-4">
					{active === "all"
						? lang === "fa"
							? "کل منو"
							: "Full Menu"
						: lang === "fa"
							? categories.find((c) => c.slug === active)?.name_fa
							: categories.find((c) => c.slug === active)?.name_en}
				</h2>
				{filtered.length === 0 ? (
					<p className="text-cream-400 py-10 text-center">{t("empty")}</p>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filtered.map((item) => (
							<MenuCard key={item.id} item={item} onClick={() => setSelected(item)} />
						))}
					</div>
				)}
			</section>

			{selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
			<AIAssistant />
		</div>
	);
}
