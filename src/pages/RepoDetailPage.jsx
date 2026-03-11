import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getRepo, getContributors, getRepoLanguages } from "../api/github";
import { formatNumber } from "../utils/formatNumber";
import { getLanguageColor } from "../utils/languageColors";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorMessage } from "../components/shared/ErrorMessage";

export default function RepoDetailPage() {
    const { username, reponame } = useParams();
    const [repo, setRepo] = useState(null);
    const [contributors, setContributors] = useState([]);
    const [languages, setLanguages] = useState({});
    const [readme, setReadme] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getRepo(username, reponame),
            getContributors(username, reponame).catch(() => []),
            getRepoLanguages(username, reponame).catch(() => ({})),
            fetch(`https://api.github.com/repos/${username}/${reponame}/readme`, {
                headers: { Accept: "application/vnd.github.raw" },
            }).then((r) => (r.ok ? r.text() : "")).catch(() => ""),
        ])
            .then(([repoData, contribs, langs, readmeText]) => {
                setRepo(repoData);
                setContributors(contribs);
                setLanguages(langs);
                setReadme(readmeText);
                setLoading(false);
            })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, [username, reponame]);

    // Language bar percentages
    const totalBytes = Object.values(languages).reduce((s, v) => s + v, 0);
    const langEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 6);

    if (error) return <div className="max-w-4xl mx-auto px-4 py-16"><ErrorMessage message={error} /></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6 font-mono">
                <Link to={`/dashboard/${username}`} className="hover:text-[var(--accent)] transition-colors">{username}</Link>
                <span>/</span>
                <span className="text-[var(--text)] font-semibold">{reponame}</span>
            </div>

            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            ) : repo && (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <h1 className="font-syne font-black text-2xl">{repo.name}</h1>
                            <a
                                href={repo.html_url} target="_blank" rel="noreferrer"
                                className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity shrink-0"
                            >View on GitHub ↗
                            </a>
                        </div>
                        {repo.description && <p className="text-[var(--label)] mb-4">{repo.description}</p>}

                        {/* Topics */}
                        {repo.topics?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {repo.topics.map((t) => (
                                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">{t}</span>
                                ))}
                            </div>
                        )}

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-6 text-sm text-[var(--label)]">
                            <span>⭐ {formatNumber(repo.stargazers_count)} stars</span>
                            <span>🍴 {formatNumber(repo.forks_count)} forks</span>
                            <span>👁 {formatNumber(repo.watchers_count)} watchers</span>
                            <span>🐛 {formatNumber(repo.open_issues_count)} open issues</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Languages */}
                        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
                            <h3 className="font-syne font-bold text-sm mb-4">Languages</h3>
                            <div className="space-y-3">
                                {langEntries.map(([lang, bytes]) => (
                                    <div key={lang}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="flex items-center gap-1.5">
                                                <span className="lang-dot" style={{ backgroundColor: getLanguageColor(lang) }} />
                                                {lang}
                                            </span>
                                            <span className="text-[var(--muted)]">{((bytes / totalBytes) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-[var(--border)]">
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${(bytes / totalBytes) * 100}%`, backgroundColor: getLanguageColor(lang) }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contributors */}
                        <div className="md:col-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
                            <h3 className="font-syne font-bold text-sm mb-4">Contributors</h3>
                            <div className="flex flex-wrap gap-3">
                                {contributors.map((c) => (
                                    <a
                                        key={c.login} href={c.html_url} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors text-xs text-[var(--label)]"
                                    >
                                        <img src={c.avatar_url} className="w-5 h-5 rounded-full" alt={c.login} />
                                        {c.login}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* README */}
                    {readme && (
                        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                            <h3 className="font-syne font-bold text-sm mb-4 flex items-center gap-2">📄 README</h3>
                            <div className="prose prose-invert max-w-none text-sm text-[var(--label)] [&_a]:text-[var(--accent)] [&_code]:bg-[var(--surface2)] [&_code]:px-1 [&_code]:rounded [&_pre]:bg-[var(--surface2)] [&_pre]:p-4 [&_pre]:rounded-lg [&_h1]:font-syne [&_h2]:font-syne [&_h3]:font-syne [&_h1]:text-[var(--text)] [&_h2]:text-[var(--text)] [&_h3]:text-[var(--text)]">
                                <ReactMarkdown>{readme}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}