import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const LanguageContext = createContext({ lang: "fa", dir: "rtl", setLang: () => {}, t: (k) => k });

import { translate } from "@/lib/dictionary";

export function LanguageProvider({ children }) {
	const [lang, setLang] = useState("fa");
	const dir = lang === "fa" ? "rtl" : "ltr";

	useEffect(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = dir;
	}, [lang, dir]);

	const t = useCallback((key) => translate(lang, key), [lang]);

	return <LanguageContext.Provider value={{ lang, dir, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
	return useContext(LanguageContext);
}
