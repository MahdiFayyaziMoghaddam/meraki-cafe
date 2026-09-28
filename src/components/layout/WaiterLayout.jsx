import React from "react";
import { LayoutDashboard, Table2, ClipboardList } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const items = [
	{ to: "/waiter", label: "tables", icon: Table2, end: true },
	{ to: "/waiter/order/new", label: "newOrder", icon: LayoutDashboard },
	{ to: "/waiter/orders", label: "todayOrders", icon: ClipboardList }
];

export default function WaiterLayout() {
	return <DashboardLayout items={items} sectionLabel="overview" userLabel="سارا احمدی" userRole="waiter" />;
}
