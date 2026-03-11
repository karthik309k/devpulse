import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTrendingRepos } from "../api/github";
import { formatNumber } from "../utils/formatNumber";
import { getLanguageColor } from "../utils/languageColors";
import { RepoSkeleton } from "../components/ui/Skeleton";

const LANGUAGES = ["All", "JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C++", "Swift"];
const PERIODS = [{ label: "Today", value: "daily" }, { label: "This Week", value: "weekly" }, { label: "This Month", value: "monthly" }];

export default function TrendingPage() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState("All");
    const [period, setPeriod] = useState("weekly");

    useEffect(() => {
        setLoading(true);
        getTrendingRepos(lang === "All" ? "" : lang, period)
            .then((data) => { setRepos(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [lang, period]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="font-syne font-black text-3xl mb-2">🔥 Trending</h1>
                <p className="text-[var(--muted)]">Discover what the GitHub community is most excited about</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1 gap-1">
                    {PERIODS.map(({ label, value }) => (
                        <button
                            key={value} onClick={() => setPeriod(value)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${period === value ? "bg-[var(--accent)] text-white" : "text-[var(--muted)] hover:text-[var(--text)]"}`}
                        >{label}</button>
                    ))}
                </div>
                <select
                    value={lang} onChange={(e) => setLang(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                >
                    {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>

            {/* Repo List */}
            {loading ? (
                <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)}
                </div>
            ) : (
                <motion.div className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
                    {repos.map((repo, i) => (
                        <motion.div
                            key={repo.id}
                            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                            className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)]/40 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-[var(--muted)] font-mono">#{i + 1}</span>
                                        <Link
                                            to={`/repo/${repo.owner.login}/${repo.name}`}
                                            className="font-syne font-bold hover:text-[var(--accent)] transition-colors"
                                        >
                                            {repo.owner.login}/{repo.name}
                                        </Link>
                                    </div>
                                    {repo.description && <p className="text-sm text-[var(--label)] mb-2 line-clamp-1">{repo.description}</p>}
                                    <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                                        {repo.language && (
                                            <span className="flex items-center gap-1">
                                                <span className="lang-dot" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span>⭐ {formatNumber(repo.stargazers_count)}</span>
                                        <span>🍴 {formatNumber(repo.forks_count)}</span>
                                    </div>
                                </div>
                                <img src={repo.owner.avatar_url} className="w-10 h-10 rounded-full border border-[var(--border)] shrink-0" alt={repo.owner.login} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}