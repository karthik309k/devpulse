import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CHART_COLORS } from "../../utils/languageColors";

export function LanguagePieChart({ repos }) {
    const data = Object.entries(
        repos.reduce((acc, r) => {
            if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
            return acc;
        }, {})
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7)
        .map(([name, value]) => ({ name, value }));

    if (!data.length) return <p className="text-center text-[var(--muted)] py-8">No language data</p>;

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="font-syne font-bold text-sm mb-4 text-[var(--label)]">Language Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data} cx="50%" cy="50%"
                        innerRadius={50} outerRadius={80}
                        paddingAngle={3} dataKey="value"
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text)" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", color: "var(--label)" }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}