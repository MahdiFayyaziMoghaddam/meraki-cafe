import { Languages } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
	const { lang, setLang } = useLang();
	return (
		<button
			type="button"
			onClick={() => setLang(lang === "fa" ? "en" : "fa")}
			className={cn(
				"inline-flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800/60 px-3 h-10 text-sm text-cream-200 transition-[color,background-color,border-color,transform] duration-150 hover:border-bark-600 hover:bg-bark-700 hover:text-cream-50 active:scale-[0.96] motion-reduce:transform-none focus-ring",
				className
			)}
			aria-label="Switch language"
		>
			<Languages size={18} strokeWidth={1.5} />
			<span className="font-medium">{lang === "fa" ? "EN" : "فا"}</span>
		</button>
	);
}
