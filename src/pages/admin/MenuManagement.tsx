import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Plus, Search, Filter, Pencil, Trash2 } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { menuItems, categories, type MenuItem } from "@/lib/mock-data";
import { formatToman } from "@/lib/format";
import { PageHeader } from "@/components/shared/PageHeader";
import CategoryIcon from "@/components/menu/CategoryIcon";
import { Image } from "@/components/ui/image";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MenuManagement() {
	const { t, lang } = useLang();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [cat, setCat] = useState("all");
	const [items, setItems] = useState(menuItems);

	const filtered = items.filter((m) => {
		const name = lang === "fa" ? m.name_fa : m.name_en;
		return (cat === "all" || m.category === cat) && (!query || name.toLowerCase().includes(query.toLowerCase()));
	});

	const toggle = (id: MenuItem["id"], field: "available" | "isNew") =>
		setItems((l) => l.map((m) => (m.id === id ? { ...m, [field]: !m[field] } : m)));

	return (
		<div>
			<PageHeader
				icon={UtensilsCrossed}
				title={t("menu")}
				subtitle={lang === "fa" ? "مدیریت آیتم‌های منو" : "Manage menu items"}
				actions={
					<button
						onClick={() => navigate("/admin/menu/new")}
						className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-4 h-10 text-cream-50 text-sm font-medium hover:bg-coffee-400 transition-colors active:opacity-80 focus-ring"
					>
						<Plus size={18} strokeWidth={1.5} /> {t("addItem")}
					</button>
				}
			/>

			<div className="flex flex-wrap gap-3 mb-5">
				<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-900 ps-3 h-10 flex-1 min-w-48 transition-[border-color,outline-color] duration-150 hover:border-bark-600 focus-within:border-coffee-500 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-coffee-500">
					<Search size={16} strokeWidth={1.5} className="text-cream-400" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={t("search")}
						className="flex-1 bg-transparent text-cream-50 placeholder:text-cream-400 outline-none text-sm"
					/>
				</div>
				<Select value={cat} onValueChange={setCat}>
					<SelectTrigger className="w-auto min-w-40 ps-3">
						<Filter size={16} strokeWidth={1.5} className="text-cream-400 shrink-0" />
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("all")}</SelectItem>
						{categories.map((c) => (
							<SelectItem key={c.id} value={c.slug}>
								{lang === "fa" ? c.name_fa : c.name_en}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="overflow-x-auto rounded-xl border border-bark-700/70 bg-bark-900">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
							<th className="text-start font-medium px-4 py-3">{t("image")}</th>
							<th className="text-start font-medium px-4 py-3">{t("title")}</th>
							<th className="text-start font-medium px-4 py-3">{t("category")}</th>
							<th className="text-start font-medium px-4 py-3">{t("price")}</th>
							<th className="text-start font-medium px-4 py-3">{t("available")}</th>
							<th className="text-start font-medium px-4 py-3">{t("new")}</th>
							<th className="text-start font-medium px-4 py-3">{t("actions")}</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((m) => (
							<tr key={m.id} className="border-b border-bark-800 hover:bg-bark-800/60">
								<td className="px-4 py-2.5">
									<div className="size-12 rounded-[8px] overflow-hidden bg-bark-800">
										<Image src={m.image} alt={m.name_en} fittingType="fill" className="h-full w-full" />
									</div>
								</td>
								<td className="px-4 py-2.5 text-cream-50 font-medium">{lang === "fa" ? m.name_fa : m.name_en}</td>
								<td className="px-4 py-2.5">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-coffee-700/40 text-coffee-400 px-2.5 py-1 text-xs">
										<CategoryIcon slug={m.category} size={12} />
										{lang === "fa"
											? categories.find((c) => c.slug === m.category)?.name_fa
											: categories.find((c) => c.slug === m.category)?.name_en}
									</span>
								</td>
								<td className="px-4 py-2.5 text-cream-100 tabular-nums">{formatToman(m.price, lang)}</td>
								<td className="px-4 py-2.5">
									<Switch checked={m.available} onCheckedChange={() => toggle(m.id, "available")} />
								</td>
								<td className="px-4 py-2.5">
									<Switch checked={m.isNew} onCheckedChange={() => toggle(m.id, "isNew")} />
								</td>
								<td className="px-4 py-2.5">
									<div className="flex items-center gap-1">
										<button
											onClick={() => navigate(`/admin/menu/${m.id}/edit`)}
											aria-label={t("edit")}
											className="inline-flex size-9 items-center justify-center rounded-[8px] text-cream-300 hover:text-coffee-400 hover:bg-bark-800 transition-colors duration-150 active:opacity-80 focus-ring"
										>
											<Pencil size={16} strokeWidth={1.5} />
										</button>
										<button
											aria-label={t("delete")}
											className="inline-flex size-9 items-center justify-center rounded-[8px] text-cream-300 hover:text-danger hover:bg-bark-800 transition-colors duration-150 active:opacity-80 focus-ring"
										>
											<Trash2 size={16} strokeWidth={1.5} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
