import { LayoutDashboard, UtensilsCrossed, Users, Receipt, Wallet, TrendingUp, Settings } from "lucide-react";
import DashboardLayout, { type NavItem } from "./DashboardLayout";

const items = [
	{ to: "/admin", label: "dashboard", icon: LayoutDashboard, end: true },
	{ to: "/admin/menu", label: "menu", icon: UtensilsCrossed },
	{ to: "/admin/users", label: "users", icon: Users },
	{ to: "/admin/orders", label: "orders", icon: Receipt },
	{ to: "/admin/accounting", label: "accounting", icon: Wallet },
	{ to: "/admin/expenses", label: "expenses", icon: TrendingUp },
	{ to: "/admin/settings", label: "settings", icon: Settings }
] satisfies NavItem[];

export default function AdminLayout() {
	return <DashboardLayout items={items} sectionLabel="management" userLabel="نگار محمدی" userRole="admin" />;
}
