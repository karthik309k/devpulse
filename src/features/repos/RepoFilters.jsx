export function RepoFilters({ repos, filters, setFilters }) {
    const languages = ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))];

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <input
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                placeholder="Filter repos..."
                className="px-3 py-2 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-[var(--text)] placeholder:text-[var(--muted)] flex-1 min-w-[160px]"
            />

            {/* Language */}
            <select
                value={filters.language}
                onChange={(e) => setFilters((f) => ({ ...f, language: e.target.value }))}
                className="px-3 py-2 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:outline-none text-[var(--text)]"
            >
                {languages.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            {/* Sort */}
            <select
                value={filters.sort}
                onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                className="px-3 py-2 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:outline-none text-[var(--text)]"
            >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="name">Name A–Z</option>
            </select>
        </div>
    );
}