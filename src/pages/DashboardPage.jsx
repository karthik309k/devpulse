import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useGitHubUser } from "../hooks/useGitHubUser";
import { useRepos } from "../hooks/useRepos";
import { ProfileCard } from "../features/profile/ProfileCard";
import { RepoCard } from "../features/repos/RepoCard";
import { RepoFilters } from "../features/repos/RepoFilters";
import { ProfileSkeleton, RepoSkeleton } from "../components/ui/Skeleton";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { formatNumber } from "../utils/formatNumber";
// Charts imported in Phase 5 — leave a placeholder for now
import { LanguagePieChart } from "../features/analytics/LanguagePieChart";
import { StarsBarChart } from "../features/analytics/StarsBarChart";

const TABS = ["Repositories", "Analytics"];

export default function DashboardPage() {
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState("Repositories");
    const [filters, setFilters] = useState({ search: "", language: "All", sort: "updated" });

    const { user, loading: userLoading, error: userError } = useGitHubUser(username);
    const { repos, loading: reposLoading } = useRepos(username);

    // Filter + sort repos
    const filteredRepos = useMemo(() => {
        let result = [...repos];
        if (filters.search) result = result.filter((r) => r.name.toLowerCase().includes(filters.search.toLowerCase()));
        if (filters.language !== "All") result = result.filter((r) => r.language === filters.language);
        if (filters.sort === "stars") result.sort((a, b) => b.stargazers_count - a.stargazers_count);
        else if (filters.sort === "forks") result.sort((a, b) => b.forks_count - a.forks_count);
        else if (filters.sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
        else result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        return result;
    }, [repos, filters]);

    // Aggregate stats
    const stats = useMemo(() => ({
        totalStars: repos.reduce((s, r) => s + r.stargazers_count, 0),
        totalForks: repos.reduce((s, r) => s + r.forks_count, 0),
        topLanguage: (() => {
            const counts = {};
            repos.forEach((r) => r.language && (counts[r.language] = (counts[r.language] || 0) + 1));
            return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
        })(),
    }), [repos]);

    if (userError) return <div className="max-w-4xl mx-auto px-4 py-16"><ErrorMessage message={userError} /></div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Left — Profile */}
                <aside className="w-full md:w-72 shrink-0">
                    {userLoading ? <ProfileSkeleton /> : user && <ProfileCard user={user} />}
                </aside>

                {/* Right — Content */}
                <div className="flex-1 min-w-0">

                    {/* Stats Row */}
                    {!reposLoading && (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                { label: "Total Stars", value: formatNumber(stats.totalStars), icon: "⭐" },
                                { label: "Total Forks", value: formatNumber(stats.totalForks), icon: "🍴" },
                                { label: "Top Language", value: stats.topLanguage, icon: "💻" },
                            ].map(({ label, value, icon }) => (
                                <div key={label} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
                                    <div className="text-lg mb-1">{icon}</div>
                                    <div className="font-syne font-bold text-xl">{value}</div>
                                    <div className="text-xs text-[var(--muted)]">{label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex border-b border-[var(--border)] mb-6">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === tab ? "border-[var(--accent)] text-[var(--accent)]" : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === "Repositories" && (
                        <div>
                            <div className="mb-4">
                                <RepoFilters repos={repos} filters={filters} setFilters={setFilters} />
                            </div>
                            {reposLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)}
                                </div>
                            ) : (
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                                >
                                    {filteredRepos.map((repo) => (
                                        <motion.div
                                            key={repo.id}
                                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                        >
                                            <RepoCard repo={repo} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                            {!reposLoading && filteredRepos.length === 0 && (
                                <p className="text-center text-[var(--muted)] py-12">No repositories match your filters.</p>
                            )}
                        </div>
                    )}

                    {activeTab === "Analytics" && (
                        reposLoading ? (
                            <p className="text-center text-[var(--muted)] py-12">Loading charts…</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <LanguagePieChart repos={repos} />
                                <StarsBarChart repos={repos} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}