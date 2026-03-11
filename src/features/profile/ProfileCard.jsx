import { useBookmarks } from "../../context/BookmarkContext";
import { formatNumber } from "../../utils/formatNumber";
import { formatJoinDate } from "../../utils/formatDate";
import toast from "react-hot-toast";

export function ProfileCard({ user }) {
    const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
    const bookmarked = isBookmarked(user.login);

    const toggleBookmark = () => {
        if (bookmarked) {
            removeBookmark(user.login);
            toast("Bookmark removed");
        } else {
            addBookmark(user);
            toast.success("Profile bookmarked! ⭐");
        }
    };

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center text-center gap-4">
            <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded-full border-2 border-[var(--border)]"
            />
            <div>
                <h2 className="font-syne font-bold text-xl">{user.name || user.login}</h2>
                <a
                    href={user.html_url} target="_blank" rel="noreferrer"
                    className="text-sm text-[var(--accent)] hover:underline font-mono"
                >@{user.login}</a>
            </div>

            {user.bio && <p className="text-sm text-[var(--label)] leading-relaxed">{user.bio}</p>}

            {/* Stats */}
            <div className="flex gap-6 w-full justify-center">
                {[
                    { label: "Repos", value: user.public_repos },
                    { label: "Followers", value: user.followers },
                    { label: "Following", value: user.following },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                        <span className="font-syne font-bold text-lg">{formatNumber(value)}</span>
                        <span className="text-xs text-[var(--muted)]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Info */}
            <div className="w-full text-sm text-[var(--label)] space-y-1.5 text-left">
                {user.location && <div>📍 {user.location}</div>}
                {user.blog && (
                    <div>🔗 <a href={user.blog} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">{user.blog}</a></div>
                )}
                {user.twitter_username && <div>🐦 @{user.twitter_username}</div>}
                <div>📅 Joined {formatJoinDate(user.created_at)}</div>
            </div>

            <button
                onClick={toggleBookmark}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold border transition-all ${bookmarked ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "border-[var(--border)] text-[var(--label)] hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
            >
                {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
            </button>
        </div>
    );
}