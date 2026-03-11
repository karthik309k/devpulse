import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NotFoundPage() {
    const [q, setQ] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center gap-6">
            <div className="text-8xl font-syne font-black text-[var(--border)]">404</div>
            <div>
                <h2 className="font-syne font-bold text-2xl mb-2">Page not found</h2>
                <p className="text-[var(--muted)]">This commit doesn't exist. Try searching for a developer instead.</p>
            </div>
            <form
                onSubmit={(e) => { e.preventDefault(); if (q.trim()) navigate(`/dashboard/${q.trim()}`); }}
                className="flex gap-2 w-full max-w-sm"
            >
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a GitHub user..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-sm text-[var(--text)]" />
                <button type="submit" className="px-4 py-2.5 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold">Go</button>
            </form>
        </div>
    );
}