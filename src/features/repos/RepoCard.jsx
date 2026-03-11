import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";
import { formatDate } from "../../utils/formatDate";
import { getLanguageColor } from "../../utils/languageColors";

export function RepoCard({ repo }) {
    return (
        <Link
            to={`/repo/${repo.owner.login}/${repo.name}`}
            className="block p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all hover:-translate-y-0.5 group"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-syne font-bold text-sm text-[var(--accent)] group-hover:underline leading-tight">
                    {repo.name}
                </h3>
                {repo.fork && (
                    <span className="text-xs text-[var(--muted)] bg-[var(--surface2)] border border-[var(--border)] px-2 py-0.5 rounded-full shrink-0">Fork</span>
                )}
            </div>

            {repo.description && (
                <p className="text-xs text-[var(--label)] mb-3 line-clamp-2 leading-relaxed">
                    {repo.description}
                </p>
            )}

            {/* Topics */}
            {repo.topics?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full">
                            {topic}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer Stats */}
            <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                        <span
                            className="lang-dot"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                    </span>
                )}
                <span>⭐ {formatNumber(repo.stargazers_count)}</span>
                <span>🍴 {formatNumber(repo.forks_count)}</span>
                <span className="ml-auto">{formatDate(repo.updated_at)}</span>
            </div>
        </Link>
    );
}