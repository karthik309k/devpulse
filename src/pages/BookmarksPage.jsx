import { Link } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext";
import { formatNumber } from "../utils/formatNumber";
import toast from "react-hot-toast";

export default function BookmarksPage() {
    const { bookmarks, removeBookmark } = useBookmarks();

    if (bookmarks.length === 0) return (
        <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center gap-4 text-center">
            <span className="text-6xl">🔖</span>
            <h2 className="font-syne font-bold text-2xl">No bookmarks yet</h2>
            <p className="text-[var(--muted)] max-w-xs">Search for a developer and click the bookmark button on their profile.</p>
            <Link to="/" className="mt-2 px-6 py-2.5 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold hover:opacity-90">Explore Developers</Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="font-syne font-black text-3xl mb-2">🔖 Bookmarks</h1>
            <p className="text-[var(--muted)] mb-8">{bookmarks.length} saved {bookmarks.length === 1 ? "profile" : "profiles"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.map((user) => (
                    <div key={user.login} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex gap-4">
                        <img src={user.avatar_url} className="w-14 h-14 rounded-full border border-[var(--border)] shrink-0" alt={user.login} />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-syne font-bold truncate">{user.name || user.login}</h3>
                            <p className="text-xs text-[var(--muted)] font-mono mb-1">@{user.login}</p>
                            {user.bio && <p className="text-xs text-[var(--label)] line-clamp-2 mb-2">{user.bio}</p>}
                            <div className="flex gap-3 text-xs text-[var(--muted)]">
                                <span>📦 {formatNumber(user.public_repos)}</span>
                                <span>👥 {formatNumber(user.followers)}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Link to={`/dashboard/${user.login}`} className="text-xs px-3 py-1 bg-[var(--accent)] text-white rounded-lg hover:opacity-90">View</Link>
                                <button
                                    onClick={() => { removeBookmark(user.login); toast("Removed"); }}
                                    className="text-xs px-3 py-1 border border-[var(--border)] rounded-lg text-[var(--muted)] hover:border-red-500/50 hover:text-red-400 transition-colors"
                                >Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}