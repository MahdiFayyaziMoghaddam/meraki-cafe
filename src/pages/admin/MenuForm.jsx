import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, AlignLeft, HandCoins, ImagePlus, ToggleRight, Save, X, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { menuItems, categories } from "@/lib/mock-data";
import CategoryIcon from "@/components/menu/CategoryIcon";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

function Field({ icon: Icon, label, children }) {
	return (
		<div>
			<label className="text-sm text-cream-200 flex items-center gap-1.5 mb-1.5">
				<Icon size={15} strokeWidth={1.5} className="text-cream-400" /> {label}
			</label>
			{children}
		</div>
	);
}

const inputCls =
	"w-full rounded-[10px] border border-bark-700 bg-bark-800 px-3 h-11 text-cream-50 placeholder:text-cream-400 outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/30 text-sm";

export default function MenuForm() {
	const { t, lang } = useLang();
	const navigate = useNavigate();
	const { id } = useParams();
	const existing = id ? menuItems.find((m) => m.id === id) : null;

	const [form, setForm] = useState(
		existing || {
			name_fa: "",
			name_en: "",
			desc_fa: "",
			desc_en: "",
			price: "",
			category: "hot",
			available: true,
			isNew: false
		}
	);
	const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

	return (
		<div>
			<div className="flex items-center gap-3 mb-6">
				<button
					onClick={() => navigate("/admin/menu")}
					className="inline-flex size-10 items-center justify-center rounded-[10px] border border-bark-700 text-cream-200 hover:bg-bark-800"
				>
					<ArrowRight size={18} strokeWidth={1.5} className="rtl:rotate-0 ltr:rotate-180" />
				</button>
				<h1 className="text-2xl font-semibold text-cream-50">{existing ? t("edit") : t("addItem")}</h1>
			</div>

			<div className="grid lg:grid-cols-2 gap-6">
				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5 space-y-4">
					<Field icon={Tag} label={t("nameFa")}>
						<input
							value={form.name_fa}
							onChange={(e) => set("name_fa", e.target.value)}
							className={inputCls}
							placeholder="اسپرسو"
						/>
					</Field>
					<Field icon={Tag} label={t("nameEn")}>
						<input
							value={form.name_en}
							onChange={(e) => set("name_en", e.target.value)}
							className={inputCls}
							placeholder="Espresso"
						/>
					</Field>
					<Field icon={AlignLeft} label={`${t("description")} (fa)`}>
						<textarea
							value={form.desc_fa}
							onChange={(e) => set("desc_fa", e.target.value)}
							rows={3}
							className={cn(inputCls, "h-auto py-3 resize-none")}
						/>
					</Field>
					<Field icon={AlignLeft} label={`${t("description")} (en)`}>
						<textarea
							value={form.desc_en}
							onChange={(e) => set("desc_en", e.target.value)}
							rows={3}
							className={cn(inputCls, "h-auto py-3 resize-none")}
						/>
					</Field>
				</div>

				<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-5 space-y-4">
					<Field icon={HandCoins} label={t("price")}>
						<input
							type="number"
							value={form.price}
							onChange={(e) => set("price", e.target.value)}
							className={inputCls}
							placeholder="65000"
						/>
					</Field>
					<Field icon={ToggleRight} label={t("category")}>
						<div className="flex flex-wrap gap-2">
							{categories.map((c) => (
								<button
									key={c.id}
									onClick={() => set("category", c.slug)}
									className={cn(
										"inline-flex items-center gap-1.5 rounded-full px-3.5 h-10 text-sm font-medium border transition-colors",
										form.category === c.slug
											? "bg-coffee-500 text-cream-50 border-coffee-500"
											: "bg-bark-800 text-cream-200 border-bark-700 hover:bg-bark-700"
									)}
								>
									<CategoryIcon slug={c.slug} size={14} />
									{lang === "fa" ? c.name_fa : c.name_en}
								</button>
							))}
						</div>
					</Field>
					<Field icon={ImagePlus} label={t("image")}>
						<div className="flex items-center justify-center rounded-[10px] border border-dashed border-bark-700 bg-bark-800 h-40 text-cream-400">
							<div className="text-center">
								<ImagePlus size={28} strokeWidth={1.5} className="mx-auto mb-2" />
								<span className="text-sm">{lang === "fa" ? "آپلود تصویر" : "Upload image"}</span>
							</div>
						</div>
					</Field>
					<div className="flex items-center justify-between rounded-[10px] border border-bark-700 bg-bark-800 px-3 h-12">
						<span className="text-sm text-cream-200 flex items-center gap-1.5">
							<ToggleRight size={16} strokeWidth={1.5} className="text-cream-400" /> {t("available")}
						</span>
						<Switch checked={form.available} onCheckedChange={(v) => set("available", v)} />
					</div>
					<div className="flex items-center justify-between rounded-[10px] border border-bark-700 bg-bark-800 px-3 h-12">
						<span className="text-sm text-cream-200 flex items-center gap-1.5">
							<ToggleRight size={16} strokeWidth={1.5} className="text-cream-400" /> {t("new")}
						</span>
						<Switch checked={form.isNew} onCheckedChange={(v) => set("isNew", v)} />
					</div>
				</div>
			</div>

			<div className="flex items-center gap-3 mt-6">
				<button
					onClick={() => navigate("/admin/menu")}
					className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-5 h-11 text-cream-50 text-sm font-medium hover:bg-coffee-400 transition-colors"
				>
					<Save size={18} strokeWidth={1.5} /> {t("save")}
				</button>
				<button
					onClick={() => navigate("/admin/menu")}
					className="inline-flex items-center gap-2 rounded-[10px] border border-bark-700 px-5 h-11 text-cream-200 text-sm hover:bg-bark-800 transition-colors"
				>
					<X size={18} strokeWidth={1.5} /> {t("cancel")}
				</button>
			</div>
		</div>
	);
}
