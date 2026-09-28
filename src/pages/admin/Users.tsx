import { useState } from "react";
import { Users as UsersIcon, UserPlus, Shield, UserCog, KeyRound, Pencil, Trash2 } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { users as mockUsers, type User } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Switch } from "@/components/ui/switch";

export default function Users() {
	const { t, lang } = useLang();
	const [list, setList] = useState(mockUsers);

	const toggle = (id: User["id"]) => setList((l) => l.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));

	return (
		<div>
			<PageHeader
				icon={UsersIcon}
				title={t("users")}
				subtitle={lang === "fa" ? "مدیریت کاربران و نقش‌ها" : "Manage users and roles"}
				actions={
					<button className="inline-flex items-center gap-2 rounded-[10px] bg-coffee-500 px-4 h-10 text-cream-50 text-sm font-medium hover:bg-coffee-400 transition-colors active:opacity-80 focus-ring">
						<UserPlus size={18} strokeWidth={1.5} /> {t("addUser")}
					</button>
				}
			/>

			<div className="overflow-x-auto rounded-xl border border-bark-700/70 bg-bark-900">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-cream-300 text-xs uppercase tracking-wider border-b border-bark-700">
							<th className="text-start font-medium px-4 py-3">{t("username")}</th>
							<th className="text-start font-medium px-4 py-3">{lang === "fa" ? "نام" : "Full name"}</th>
							<th className="text-start font-medium px-4 py-3">{t("role")}</th>
							<th className="text-start font-medium px-4 py-3">{t("active")}</th>
							<th className="text-start font-medium px-4 py-3">{t("actions")}</th>
						</tr>
					</thead>
					<tbody>
						{list.map((u) => (
							<tr key={u.id} className="border-b border-bark-800 hover:bg-bark-800/60">
								<td className="px-4 py-3">
									<span className="inline-flex items-center gap-2 text-cream-100">
										<span className="inline-flex size-8 items-center justify-center rounded-full bg-bark-700 text-cream-200 text-xs font-semibold">
											{u.username.charAt(0).toUpperCase()}
										</span>
										{u.username}
									</span>
								</td>
								<td className="px-4 py-3 text-cream-100">{lang === "fa" ? u.fullName_fa : u.fullName_en}</td>
								<td className="px-4 py-3">
									{u.role === "admin" ? (
										<StatusBadge status="coffee" icon={Shield}>
											{t("admin")}
										</StatusBadge>
									) : (
										<StatusBadge status="info" icon={UserCog}>
											{t("waiter")}
										</StatusBadge>
									)}
								</td>
								<td className="px-4 py-3">
									<Switch checked={u.active} onCheckedChange={() => toggle(u.id)} />
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-1">
										<button
											aria-label={t("resetPassword")}
											className="inline-flex size-9 items-center justify-center rounded-[8px] text-cream-300 hover:text-coffee-400 hover:bg-bark-800 transition-colors duration-150 active:opacity-80 focus-ring"
										>
											<KeyRound size={16} strokeWidth={1.5} />
										</button>
										<button
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
