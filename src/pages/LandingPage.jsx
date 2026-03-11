import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FEATURED_DEVS = [
    { login: "torvalds", name: "Linus Torvalds", emoji: "🐧" },
    { login: "gaearon", name: "Dan Abramov", emoji: "⚛️" },
    { login: "yyx990803", name: "Evan You", emoji: "💚" },
    { login: "sindresorhus", name: "Sindre Sorhus", emoji: "✨" },
];

const FEATURES = [
    { icon: "📊", title: "Analytics Dashboard", desc: "Charts for stars, forks, and language distribution" },
    { icon: "🔍", title: "Deep Repo Explorer", desc: "Filter, sort and search through any developer's repos" },
    { icon: "🔥", title: "Trending Feed", desc: "Discover what's hot on GitHub right now" },
    { icon: "🔖", title: "Save Profiles", desc: "Bookmark interesting developers for later" },
];

export default function LandingPage() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/dashboard/${query.trim()}`);
    };

    return (
        <div className="min-h-screen">
            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[400px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 text-xs font-mono bg-[var(--accent)]/10 border border-[var(--accent)]/25 text-[var(--accent)] px-3 py-1.5 rounded-full mb-6">
                        ⚡ GitHub Developer Analytics
                    </div>

                    <h1 className="font-syne font-black text-5xl md:text-7xl leading-none tracking-tight mb-6 text-[var(--text)]">
                        Your GitHub

                        <span className="text-[var(--accent)]">Supercharged</span>
                    </h1>

                    <p className="text-[var(--label)] text-lg mb-10 max-w-lg mx-auto">
                        Beautiful analytics, charts, and insights for any GitHub developer.
                        Type a username to get started instantly.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-8">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter GitHub username..."
                            className="flex-1 px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors text-[var(--text)] placeholder:text-[var(--muted)] text-sm"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!query.trim()}
                            className="px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl text-sm hover:opacity-90 disabled:opacity-40 transition-all active:scale-95"
                        >
                            Explore →
                        </button>
                    </form>

                    {/* Quick Access */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-xs text-[var(--muted)]">Try:</span>
                        {FEATURED_DEVS.map(({ login, name, emoji }) => (
                            <button
                                key={login}
                                onClick={() => navigate(`/dashboard/${login}`)}
                                className="text-xs px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--label)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                            >
                                {emoji} {name}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── FEATURES ── */}
            <section className="max-w-4xl mx-auto px-4 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {FEATURES.map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-colors text-left"
                        >
                            <div className="text-2xl mb-3">{icon}</div>
                            <h3 className="font-syne font-bold text-sm mb-1">{title}</h3>
                            <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}