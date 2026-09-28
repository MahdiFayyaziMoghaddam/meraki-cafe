import React from "react";
import { Outlet } from "react-router-dom";
import { Coffee } from "lucide-react";
import { useLang } from "@/lib/language-context";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

export default function PublicLayout() {
	const { t } = useLang();
	return (
		<div className="relative z-10 min-h-screen flex flex-col">
			<header className="sticky top-0 z-30 backdrop-blur bg-bark-950/70 border-b border-bark-800/60">
				<div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-4 sm:px-6">
					<div className="flex items-center gap-2.5">
						<span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400">
							<Coffee size={20} strokeWidth={1.5} />
						</span>
						<span className="text-lg font-semibold text-cream-50">{t("brand")}</span>
					</div>
					<LanguageSwitcher />
				</div>
			</header>
			<div className="flex-1">
				<Outlet />
			</div>
		</div>
	);
}
