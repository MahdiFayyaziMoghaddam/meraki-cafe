import React from "react";
import { Languages } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }) {
	const { lang, setLang } = useLang();
	return (
		<button
			type="button"
			onClick={() => setLang(lang === "fa" ? "en" : "fa")}
			className={cn(
				"inline-flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800/60 px-3 h-10 text-sm text-cream-200 transition-colors hover:bg-bark-700 hover:text-cream-50",
				className
			)}
			aria-label="Switch language"
		>
			<Languages size={18} strokeWidth={1.5} />
			<span className="font-medium">{lang === "fa" ? "EN" : "فا"}</span>
		</button>
	);
}
