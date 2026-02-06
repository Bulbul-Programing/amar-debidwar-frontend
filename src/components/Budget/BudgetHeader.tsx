"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

type BudgetMeta = {
    totalBudget: number;
    budgeUse: number;
    total: number;
};

interface Props {
    meta: BudgetMeta;
}

export default function BudgetHeroHeader({ meta }: Props) {
    const usedPercent = Math.round(
        (meta.budgeUse / meta.totalBudget) * 100
    );

    const remaining = meta.totalBudget - meta.budgeUse;

    const chartData = [
        { name: "Used", value: meta.budgeUse },
        { name: "Remaining", value: remaining },
    ];

    const COLORS = [
        "hsl(var(--primary))",
        "hsl(var(--muted))",
    ];

    return (
        <section className="relative overflow-hidden rounded-4xl border bg-card p-4 md:p-8 shadow-sm mt-5 mb-5 md:mb-10 mx-5 md:mx-10">
            {/* 🌊 Glow Background */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                {/* ================= LEFT CONTENT ================= */}
                <div className="lg:col-span-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
                        বাজেট ড্যাশবোর্ড
                    </span>

                    <h1 className="text-xl md:text-4xl font-bold tracking-tight text-foreground">
                        বাজেট ব্যবহারের সারসংক্ষেপ
                    </h1>

                    <p className=" text-sm md:text-base mt-3 max-w-xl text-muted-foreground">
                        স্বচ্ছ আর্থিক বিশ্লেষণের মাধ্যমে চলমান প্রকল্পসমূহে সরকারি অর্থ কীভাবে বরাদ্দ ও ব্যয় করা হচ্ছে তার সুস্পষ্ট চিত্র উপস্থাপন করা হচ্ছে।
                    </p>

                    {/* ===== STATS ===== */}
                    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        <Stat label="মোট বাজেট" value={meta.totalBudget || 0} />
                        <Stat label="ব্যবহৃত" value={meta.budgeUse || 0} highlight />
                        <Stat label="বাকী আছে" value={remaining || 0} />
                        <Stat label="মোট প্রজেক্ট" value={meta.total} />
                    </div>
                </div>

                {/* ================= RIGHT CHART ================= */}
                <div className="flex items-center justify-center">
                    <div className="relative h-64 w-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        {
                                            name: "Used",
                                            value: meta.budgeUse,
                                            fill: "var(--chart-3)", // ✅ FIXED
                                        },
                                        {
                                            name: "Remaining",
                                            value: meta.totalBudget - meta.budgeUse,
                                            fill: "var(--chart-2)", // ✅ FIXED
                                        },
                                    ]}
                                    innerRadius={90}
                                    outerRadius={120}
                                    paddingAngle={6}
                                    dataKey="value"
                                    stroke="var(--background)"
                                    strokeWidth={4}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center Label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-primary">
                                {usedPercent}%
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Utilized
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================= STAT BLOCK ================= */
function Stat({
    label,
    value,
    highlight,
}: {
    label: string;
    value: number;
    highlight?: boolean;
}) {
    return (
        <div className="rounded-lg md:rounded-3xl border bg-muted/40 p-3 md:p-5">
            <p className="text-sm text-muted-foreground mb-1">
                {label}
            </p>
            <p
                className={`text-base md:text-xl font-semibold ${highlight ? "text-primary" : "text-foreground"
                    }`}
            >
                {typeof value === "number"
                    ? `৳ ${value.toLocaleString()}`
                    : value}
            </p>
        </div>
    );
}