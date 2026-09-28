import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as auth from "@/lib/auth";
import type { User } from "@/lib/auth";

export type AuthErrorType = "auth_required" | "user_not_registered" | "unknown";

export type AuthError = {
	type: AuthErrorType;
	message: string;
};

export type AuthContextValue = {
	user: User | null;
	isAuthenticated: boolean;
	isLoadingAuth: boolean;
	isLoadingPublicSettings: boolean;
	authError: AuthError | null;
	appPublicSettings: auth.AppPublicSettings | null;
	authChecked: boolean;
	logout: (shouldRedirect?: boolean) => void;
	navigateToLogin: () => void;
	checkUserAuth: () => Promise<void>;
	checkAppState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
	const [authError, setAuthError] = useState<AuthError | null>(null);
	const [authChecked, setAuthChecked] = useState(false);
	const [appPublicSettings, setAppPublicSettings] = useState<auth.AppPublicSettings | null>(null);

	const checkUserAuth = useCallback(async () => {
		setIsLoadingAuth(true);
		try {
			setUser(await auth.me());
			setIsAuthenticated(true);
			setAuthError(null);
		} catch (error) {
			console.error("User auth check failed:", error);
			setUser(null);
			setIsAuthenticated(false);
			setAuthError({ type: "auth_required", message: "Authentication required" });
		} finally {
			setIsLoadingAuth(false);
			setAuthChecked(true);
		}
	}, []);

	const checkAppState = useCallback(async () => {
		setIsLoadingPublicSettings(true);
		setAuthError(null);
		try {
			setAppPublicSettings(await auth.getPublicSettings());
			if (auth.getToken()) {
				await checkUserAuth();
			} else {
				setIsLoadingAuth(false);
				setIsAuthenticated(false);
				setAuthChecked(true);
			}
		} catch (error) {
			console.error("App state check failed:", error);
			setAuthError({ type: "unknown", message: error instanceof Error ? error.message : "Failed to load app" });
			setIsLoadingAuth(false);
			setAuthChecked(true);
		} finally {
			setIsLoadingPublicSettings(false);
		}
	}, [checkUserAuth]);

	useEffect(() => {
		void checkAppState();
	}, [checkAppState]);

	const logout = useCallback((shouldRedirect = true) => {
		setUser(null);
		setIsAuthenticated(false);
		auth.logout(shouldRedirect ? window.location.href : undefined);
	}, []);

	const navigateToLogin = useCallback(() => {
		auth.redirectToLogin(window.location.href);
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			isAuthenticated,
			isLoadingAuth,
			isLoadingPublicSettings,
			authError,
			appPublicSettings,
			authChecked,
			logout,
			navigateToLogin,
			checkUserAuth,
			checkAppState
		}),
		[
			user,
			isAuthenticated,
			isLoadingAuth,
			isLoadingPublicSettings,
			authError,
			appPublicSettings,
			authChecked,
			logout,
			navigateToLogin,
			checkUserAuth,
			checkAppState
		]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
