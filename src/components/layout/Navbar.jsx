import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useBookmarks } from "../../context/BookmarkContext";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { bookmarks } = useBookmarks();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/dashboard/${search.trim()}`);
            setSearch("");
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
                <Link to="/" className="font-syne font-black text-lg text-[var(--accent)] mr-2 shrink-0">
                    DevPulse
                </Link>

                {/* Quick Search */}
                <form onSubmit={handleSearch} className="flex-1 max-w-sm">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search GitHub user..."
                        className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--surface2)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--muted)]"
                    />
                </form>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-1 ml-auto">
                    <Link to="/trending" className="nav-link px-3 py-1.5 text-sm text-[var(--label)] hover:text-[var(--text)] rounded-lg hover:bg-[var(--surface2)] transition-all">Trending</Link>
                    <Link to="/bookmarks" className="nav-link px-3 py-1.5 text-sm text-[var(--label)] hover:text-[var(--text)] rounded-lg hover:bg-[var(--surface2)] transition-all flex items-center gap-1">
                        Bookmarks
                        {bookmarks.length > 0 && (
                            <span className="text-xs bg-[var(--accent)] text-white rounded-full w-4 h-4 flex items-center justify-center">
                                {bookmarks.length}
                            </span>
                        )}
                    </Link>
                    <Link to="/settings" className="nav-link px-3 py-1.5 text-sm text-[var(--label)] hover:text-[var(--text)] rounded-lg hover:bg-[var(--surface2)] transition-all">Settings</Link>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-[var(--label)]"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>
            </div>
        </nav>
    );
}