import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useBookmarks } from "../context/BookmarkContext";
import { getRateLimit } from "../api/github";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const { bookmarks } = useBookmarks();
    const [token, setToken] = useState(() => localStorage.getItem("github_token") || "");
    const [rateLimit, setRateLimit] = useState(null);

    useEffect(() => {
        getRateLimit().then(setRateLimit).catch(() => { });
    }, []);

    const saveToken = () => {
        if (token.trim()) { localStorage.setItem("github_token", token.trim()); toast.success("Token saved! Reload to apply."); }
        else { localStorage.removeItem("github_token"); toast("Token removed"); }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="font-syne font-black text-3xl mb-8">⚙️ Settings</h1>

            <div className="space-y-4">
                {/* Theme */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-syne font-bold">Theme</h3>
                            <p className="text-sm text-[var(--muted)]">Current: {theme}</p>
                        </div>
                        <button onClick={toggleTheme} className="px-5 py-2 rounded-xl border border-[var(--border)] text-sm font-semibold hover:border-[var(--accent)] transition-colors">
                            {theme === "dark" ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
                        </button>
                    </div>
                </div>

                {/* GitHub Token */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                    <h3 className="font-syne font-bold mb-1">GitHub Personal Access Token</h3>
                    <p className="text-sm text-[var(--muted)] mb-4">Increases your rate limit from 60 to 5,000 requests/hour.</p>
                    <div className="flex gap-2">
                        <input
                            type="password" value={token} onChange={(e) => setToken(e.target.value)}
                            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface2)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-sm font-mono text-[var(--text)]"
                        />
                        <button onClick={saveToken} className="px-5 py-2.5 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold hover:opacity-90">Save</button>
                    </div>
                </div>

                {/* Rate Limit */}
                {rateLimit && (
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                        <h3 className="font-syne font-bold mb-4">API Rate Limit</h3>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-[var(--label)]">Remaining</span>
                            <span className="font-mono font-bold">{rateLimit.remaining} / {rateLimit.limit}</span>
                        </div>
                        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[var(--accent)] transition-all"
                                style={{ width: `${(rateLimit.remaining / rateLimit.limit) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex justify-between items-center">
                    <div>
                        <h3 className="font-syne font-bold">Bookmarks</h3>
                        <p className="text-sm text-[var(--muted)]">{bookmarks.length} saved profiles</p>
                    </div>
                    <span className="text-2xl">🔖</span>
                </div>
            </div>
        </div>
    );
}