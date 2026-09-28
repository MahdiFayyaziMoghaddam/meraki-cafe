import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/lib/language-context";
import PublicLayout from "@/components/layout/PublicLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import WaiterLayout from "@/components/layout/WaiterLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import Landing from "@/pages/Landing";
import MenuPage from "@/pages/Menu";
import Login from "@/pages/Login";
import WaiterTables from "@/pages/waiter/WaiterTables";
import NewOrder from "@/pages/waiter/NewOrder";
import WaiterOrders from "@/pages/waiter/WaiterOrders";
import Dashboard from "@/pages/admin/Dashboard";
import MenuManagement from "@/pages/admin/MenuManagement";
import MenuForm from "@/pages/admin/MenuForm";
import Users from "@/pages/admin/Users";
import AdminOrders from "@/pages/admin/AdminOrders";
import Accounting from "@/pages/admin/Accounting";
import Expenses from "@/pages/admin/Expenses";
import SettingsPage from "@/pages/admin/Settings";

const AuthenticatedApp = () => {
	const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

	// Show loading spinner while checking app public settings or auth
	if (isLoadingPublicSettings || isLoadingAuth) {
		return (
			<div className="fixed inset-0 flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
			</div>
		);
	}

	// Handle authentication errors
	if (authError) {
		if (authError.type === "user_not_registered") {
			return <UserNotRegisteredError />;
		}
		if (authError.type === "auth_required") {
			return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
		}
	}

	// Render the main app
	return (
		<Routes>
			<Route element={<PublicLayout />}>
				<Route path="/" element={<Landing />} />
				<Route path="/menu" element={<MenuPage />} />
			</Route>
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login />} />
			</Route>
			<Route element={<WaiterLayout />}>
				<Route path="/waiter" element={<WaiterTables />} />
				<Route path="/waiter/order/new" element={<NewOrder />} />
				<Route path="/waiter/orders" element={<WaiterOrders />} />
			</Route>
			<Route element={<AdminLayout />}>
				<Route path="/admin" element={<Dashboard />} />
				<Route path="/admin/menu" element={<MenuManagement />} />
				<Route path="/admin/menu/new" element={<MenuForm />} />
				<Route path="/admin/menu/:id/edit" element={<MenuForm />} />
				<Route path="/admin/users" element={<Users />} />
				<Route path="/admin/orders" element={<AdminOrders />} />
				<Route path="/admin/accounting" element={<Accounting />} />
				<Route path="/admin/expenses" element={<Expenses />} />
				<Route path="/admin/settings" element={<SettingsPage />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

function App() {
	return (
		<AuthProvider>
			<LanguageProvider>
				<QueryClientProvider client={queryClientInstance}>
					<Router>
						<ScrollToTop />
						<AuthenticatedApp />
					</Router>
					<Toaster />
				</QueryClientProvider>
			</LanguageProvider>
		</AuthProvider>
	);
}

export default App;
