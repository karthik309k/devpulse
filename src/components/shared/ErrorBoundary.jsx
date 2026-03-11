import { Component } from "react";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <span className="text-5xl">💥</span>
                    <h2 className="text-xl font-bold font-syne">Something crashed</h2>
                    <p className="text-[var(--muted)]">Try refreshing the page.</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm"
                    >Try Again</button>
                </div>
            );
        }
        return this.props.children;
    }
}