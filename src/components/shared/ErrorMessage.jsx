export function ErrorMessage({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="text-[var(--label)] max-w-xs">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="text-sm px-4 py-2 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}