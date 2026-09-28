import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, User, Lock, LogIn } from "lucide-react";
import { useLang } from "@/lib/language-context";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { login } from "@/lib/auth";

export default function Login() {
	const { t } = useLang();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// ponytail: the local auth store has no password check — the password field is
	// collected but not verified. Point this at a real credential check when one exists.
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const user = await login(username.trim());
			navigate(user.role === "admin" ? "/admin" : "/waiter");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="w-full max-w-md">
			<div className="flex justify-end mb-4">
				<LanguageSwitcher />
			</div>
			<div className="rounded-xl border border-bark-700/70 bg-bark-900 p-6 sm:p-8 shadow-md">
				<div className="flex flex-col items-center text-center mb-6">
					<span className="inline-flex size-14 items-center justify-center rounded-[14px] bg-coffee-700/30 text-coffee-400 mb-4">
						<Coffee size={28} strokeWidth={1.5} />
					</span>
					<h1 className="text-2xl font-semibold text-cream-50">{t("login")}</h1>
					<p className="text-sm text-cream-300 mt-1">{t("loginSubtitle")}</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="text-sm text-cream-200 mb-1.5 block">{t("username")}</label>
						<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800 ps-3 h-11 focus-within:border-coffee-500 focus-within:ring-2 focus-within:ring-coffee-500/30">
							<User size={18} strokeWidth={1.5} className="text-cream-400" />
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder={t("username")}
								className="flex-1 bg-transparent text-cream-50 placeholder:text-cream-400 outline-none text-sm"
							/>
						</div>
					</div>

					<div>
						<label className="text-sm text-cream-200 mb-1.5 block">{t("password")}</label>
						<div className="flex items-center gap-2 rounded-[10px] border border-bark-700 bg-bark-800 ps-3 h-11 focus-within:border-coffee-500 focus-within:ring-2 focus-within:ring-coffee-500/30">
							<Lock size={18} strokeWidth={1.5} className="text-cream-400" />
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder={t("password")}
								className="flex-1 bg-transparent text-cream-50 placeholder:text-cream-400 outline-none text-sm"
							/>
						</div>
					</div>

					{error && (
						<p role="alert" className="rounded-[10px] bg-danger/15 px-3 py-2 text-sm text-danger">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={loading || !username.trim()}
						className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-coffee-500 h-11 text-cream-50 font-medium transition-colors hover:bg-coffee-400 disabled:opacity-60"
					>
						<LogIn size={18} strokeWidth={1.5} />
						{t("login")}
					</button>
				</form>
			</div>
		</div>
	);
}
