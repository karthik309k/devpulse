// Reusable skeleton – pass className to control size
export function Skeleton({ className = "" }) {
    return <div className={`skeleton ${className}`} />;
}

// Pre-built profile card skeleton
export function ProfileSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
        </div>
    );
}

// Repo card skeleton
export function RepoSkeleton() {
    return (
        <div className="p-5 border border-[var(--border)] rounded-xl flex flex-col gap-3">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-4 mt-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    );
}