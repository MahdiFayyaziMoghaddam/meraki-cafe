import { users, type User } from "@/lib/mock-data";

export type { User };

export type AppPublicSettings = {
	id: string;
	public_settings: {
		name: string;
		[key: string]: unknown;
	};
};

const SESSION_KEY = "meraki_session";

type Session = {
	token: string;
	userId: string;
};

function readSession(): Session | null {
	try {
		const raw = window.localStorage.getItem(SESSION_KEY);
		return raw ? (JSON.parse(raw) as Session) : null;
	} catch {
		return null;
	}
}

function writeSession(session: Session | null): void {
	if (session) {
		window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	} else {
		window.localStorage.removeItem(SESSION_KEY);
	}
}

/** The signed-in user's access token, or null when signed out. */
export function getToken(): string | null {
	return readSession()?.token ?? null;
}

export function setToken(token: string): void {
	const userId = readSession()?.userId;
	if (userId) writeSession({ token, userId });
}

export async function getPublicSettings(): Promise<AppPublicSettings> {
	return { id: "local", public_settings: { name: "Meraki Cafe" } };
}

/** Resolves the signed-in user, or throws if there is no valid session. */
export async function me(): Promise<User> {
	const session = readSession();
	if (!session) throw new Error("Authentication required");

	const user = users.find((u) => u.id === session.userId);
	if (!user) {
		writeSession(null);
		throw new Error("Authentication required");
	}
	return user;
}

export function logout(redirectUrl?: string): void {
	writeSession(null);
	if (redirectUrl) window.location.href = redirectUrl;
}

/** The only way a session gets created — Login.tsx is its sole caller. */
export async function login(username: string): Promise<User> {
	const user = users.find((u) => u.username === username);
	if (!user) throw new Error("Unknown username");
	if (!user.active) throw new Error("This account is disabled");

	writeSession({ token: crypto.randomUUID(), userId: user.id });
	return user;
}

export function redirectToLogin(nextUrl: string): void {
	const target = nextUrl.startsWith("/") ? nextUrl : "/";
	window.location.href = `/login?returnTo=${encodeURIComponent(target)}`;
}

// ponytail: these four need a backend that sends email, and this app has none —
// so they reject instead of pretending. Point them at your auth API when one exists.

const NO_BACKEND = "Email delivery is not configured in this build";

export async function register(_params: { email: string; password: string }): Promise<never> {
	throw new Error(NO_BACKEND);
}

export async function verifyOtp(_params: { email: string; otpCode: string }): Promise<{ access_token: string }> {
	throw new Error(NO_BACKEND);
}

export async function resendOtp(_email: string): Promise<never> {
	throw new Error(NO_BACKEND);
}

export async function resetPasswordRequest(_email: string): Promise<never> {
	throw new Error(NO_BACKEND);
}

export async function resetPassword(_params: { resetToken: string; newPassword: string }): Promise<never> {
	throw new Error(NO_BACKEND);
}
