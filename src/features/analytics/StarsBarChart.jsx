import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function StarsBarChart({ repos }) {
    const data = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8)
        .map((r) => ({ name: r.name.length > 12 ? r.name.slice(0, 12) + "…" : r.name, stars: r.stargazers_count }));

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="font-syne font-bold text-sm mb-4 text-[var(--label)]">Top Repos by Stars</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                        dataKey="name" tick={{ fontSize: 11, fill: "var(--muted)" }}
                        angle={-35} textAnchor="end"
                    />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted)" }} />
                    <Tooltip
                        contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text)" }}
                    />
                    <Bar dataKey="stars" fill="#58a6ff" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}