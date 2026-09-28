import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translate, type Language, type TranslationKey } from "@/lib/dictionary";

export type Direction = "rtl" | "ltr";

export type LanguageContextValue = {
	lang: Language;
	dir: Direction;
	setLang: (lang: Language) => void;
	t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
	lang: "fa",
	dir: "rtl",
	setLang: () => {},
	t: (k) => k
});

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLang] = useState<Language>("fa");
	const dir: Direction = lang === "fa" ? "rtl" : "ltr";

	useEffect(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = dir;
	}, [lang, dir]);

	const t = useCallback((key: TranslationKey) => translate(lang, key), [lang]);

	return <LanguageContext.Provider value={{ lang, dir, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
	return useContext(LanguageContext);
}
