import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { Coffee, LogOut, Menu, X } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

function NavList({ items }) {
	const { t } = useLang();
	return (
		<nav className="flex flex-col gap-1">
			{items.map((item) => (
				<NavLink
					key={item.to}
					to={item.to}
					end={item.end}
					className={({ isActive }) =>
						cn(
							"flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-cream-200 transition-colors",
							isActive
								? "bg-coffee-700/30 text-cream-50 border-s-2 border-coffee-500"
								: "border-s-2 border-transparent hover:bg-bark-800"
						)
					}
				>
					{item.icon && <item.icon size={20} strokeWidth={1.5} className={cn("text-cream-300")} />}
					<span className="text-sm font-medium">{t(item.label)}</span>
				</NavLink>
			))}
		</nav>
	);
}

function SidebarBody({ items, sectionLabel, userLabel, userRole }) {
	const { t } = useLang();
	const navigate = useNavigate();
	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center gap-2.5 px-5 h-16 border-b border-bark-800">
				<span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-coffee-700/30 text-coffee-400">
					<Coffee size={20} strokeWidth={1.5} />
				</span>
				<span className="text-lg font-semibold text-cream-50">{t("brand")}</span>
			</div>
			<div className="flex-1 overflow-y-auto px-3 py-4">
				<p className="text-xs uppercase tracking-wider text-cream-400 px-3 pt-2 pb-2">{t(sectionLabel)}</p>
				<NavList items={items} />
			</div>
			<div className="border-t border-bark-800 p-3">
				<div className="flex items-center gap-3 px-2 py-2">
					<span className="inline-flex size-9 items-center justify-center rounded-full bg-bark-700 text-cream-200 text-sm font-semibold">
						{userLabel?.charAt(0) || "M"}
					</span>
					<div className="min-w-0 flex-1">
						<p className="text-sm text-cream-100 truncate">{userLabel}</p>
						<p className="text-xs text-cream-400">{t(userRole)}</p>
					</div>
					<button
						onClick={() => navigate("/login")}
						aria-label={t("logout")}
						className="inline-flex size-9 items-center justify-center rounded-[10px] text-cream-300 hover:bg-bark-800 hover:text-coffee-400 transition-colors"
					>
						<LogOut size={18} strokeWidth={1.5} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default function DashboardLayout({ items, sectionLabel = "overview", userLabel = "Negar", userRole = "admin" }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative min-h-screen">
			{/* Desktop sidebar */}
			<aside className="hidden lg:flex fixed inset-y-0 start-0 w-64 flex-col bg-bark-900 border-e border-bark-800 z-30">
				<SidebarBody items={items} sectionLabel={sectionLabel} userLabel={userLabel} userRole={userRole} />
			</aside>

			{/* Mobile top bar */}
			<header className="lg:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-bark-800 bg-bark-900/95 backdrop-blur px-4">
				<div className="flex items-center gap-2">
					<Coffee size={20} strokeWidth={1.5} className="text-coffee-400" />
					<span className="font-semibold text-cream-50">Meraki</span>
				</div>
				<button
					onClick={() => setOpen(true)}
					aria-label="Open menu"
					className="inline-flex size-10 items-center justify-center rounded-[10px] text-cream-200 hover:bg-bark-800"
				>
					<Menu size={20} strokeWidth={1.5} />
				</button>
			</header>

			{/* Mobile drawer */}
			{open && (
				<div className="lg:hidden fixed inset-0 z-50">
					<div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
					<div className="absolute inset-y-0 start-0 w-72 bg-bark-900 border-e border-bark-800">
						<button
							onClick={() => setOpen(false)}
							aria-label="Close menu"
							className="absolute top-4 end-4 inline-flex size-9 items-center justify-center rounded-[10px] text-cream-300 hover:bg-bark-800"
						>
							<X size={18} strokeWidth={1.5} />
						</button>
						<SidebarBody items={items} sectionLabel={sectionLabel} userLabel={userLabel} userRole={userRole} />
					</div>
				</div>
			)}

			<main className="lg:ms-64 relative z-10">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
