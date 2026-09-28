import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
			<Outlet />
		</div>
	);
}
