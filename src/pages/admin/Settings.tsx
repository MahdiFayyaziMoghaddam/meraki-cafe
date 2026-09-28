import { useState } from "react";
import { Settings as SettingsIcon, Pencil, Save, Coffee, Clock, Percent, Phone, MapPin, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { PageHeader } from "@/components/shared/PageHeader";
import type { TranslationKey } from "@/lib/dictionary";

const initial: Row[] = [
	{ id: "name", icon: Coffee, value_fa: "مراکی", value_en: "Meraki", type: "text" },
	{ id: "hours", icon: Clock, value_fa: "۸ تا ۲۴", value_en: "8am–12am", type: "text" },
	{ id: "tax", icon: Percent, value_fa: "۹٪", value_en: "9%", type: "text" },
	{ id: "phone", icon: Phone, value_fa: "۰۲۱ ۲۲ ۹۱ ۸۸ ۷۷", value_en: "+98 21 22 91 88 77", type: "text" },
	{ id: "address", icon: MapPin, value_fa: "تهران، ولیعصر", value_en: "Tehran, Valiasr", type: "text" }
];

type RowId = "name" | "hours" | "tax" | "phone" | "address";

type Row = {
	id: RowId;
	icon: LucideIcon;
	value_fa: string;
	value_en: string;
	type: string;
};

// ponytail: "name" and "tax" have no dictionary entry, so t() would fall back to the raw key anyway.
const dictLabel: Partial<Record<RowId, TranslationKey>> = { hours: "hours", phone: "phone", address: "address" };

export default function Settings() {
	const { t, lang } = useLang();
	const [rows, setRows] = useState<Row[]>(initial);
	const [editing, setEditing] = useState<RowId | null>(null);

	const label = (r: Row) => {
		const key = dictLabel[r.id];
		return key ? t(key) : r.id;
	};
	const value = (r: Row) => (lang === "fa" ? r.value_fa : r.value_en);
	const setVal = (id: RowId, v: string) =>
		setRows((l) => l.map((r) => (r.id === id ? { ...r, [lang === "fa" ? "value_fa" : "value_en"]: v } : r)));

	return (
		<div>
			<PageHeader icon={SettingsIcon} title={t("settings")} subtitle={t("settingsSubtitle")} />

			<div className="max-w-3xl rounded-xl border border-bark-700/70 bg-bark-900 divide-y divide-bark-800">
				{rows.map((r) => (
					<div key={r.id} className="flex items-center gap-4 p-4">
						<span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400 shrink-0">
							<r.icon size={18} strokeWidth={1.5} />
						</span>
						<div className="flex-1 min-w-0">
							<p className="text-sm text-cream-300">{label(r)}</p>
							{editing === r.id ? (
								<input
									autoFocus
									value={value(r)}
									onChange={(e) => setVal(r.id, e.target.value)}
									className="mt-1 w-full rounded-[8px] border border-bark-700 bg-bark-800 px-3 h-9 text-cream-50 outline-none focus:border-coffee-500 text-sm"
								/>
							) : (
								<p className="mt-0.5 text-cream-50 font-medium truncate">{value(r)}</p>
							)}
						</div>
						{editing === r.id ? (
							<button
								onClick={() => setEditing(null)}
								aria-label={t("save")}
								className="inline-flex size-10 items-center justify-center rounded-[10px] bg-coffee-500 text-cream-50 hover:bg-coffee-400"
							>
								<Save size={18} strokeWidth={1.5} />
							</button>
						) : (
							<button
								onClick={() => setEditing(r.id)}
								aria-label={t("edit")}
								className="inline-flex size-10 items-center justify-center rounded-[10px] text-cream-300 hover:text-coffee-400 hover:bg-bark-800"
							>
								<Pencil size={18} strokeWidth={1.5} />
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
