export function formatToman(amount: number, lang = "fa") {
	const value = Number(amount || 0);
	if (lang === "fa") {
		return `${value.toLocaleString("fa-IR")} تومان`;
	}
	return `${value.toLocaleString("en-US")} Toman`;
}

export function formatNumber(value: number, lang = "fa") {
	return Number(value || 0).toLocaleString(lang === "fa" ? "fa-IR" : "en-US");
}

export function formatDate(date: Date | string, lang = "fa") {
	const d = typeof date === "string" ? new Date(date) : date;
	if (lang === "fa") {
		return d.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
	}
	return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

export function formatTime(date: Date | string, lang = "fa") {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toLocaleTimeString(lang === "fa" ? "fa-IR" : "en-GB", { hour: "2-digit", minute: "2-digit" });
}
