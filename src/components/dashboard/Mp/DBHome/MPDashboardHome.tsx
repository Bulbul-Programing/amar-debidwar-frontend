/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, FolderKanban, Receipt, AlertTriangle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];

interface DashboardHomeProps {
    data: any;
}

export default function DashboardHome({ data }: DashboardHomeProps) {
    const { summary, charts } = data;

    const statCards = [
        { label: "Total Budget", value: `৳ ${summary.totalBudgetAmount}`, icon: Wallet },
        { label: "Projects", value: summary.totalProjects, icon: FolderKanban },
        { label: "Expenses", value: summary.totalExpenses, icon: Receipt },
        { label: "Complaints", value: summary.totalComplaints, icon: AlertTriangle },
        { label: "Recipients", value: summary.totalRecipients, icon: Users },
    ];

    const budgetVsExpenseData = charts.budgetVsExpense.labels.map((label: string, i: number) => ({
        name: label,
        Budget: charts.budgetVsExpense.budget[i],
        Expense: charts.budgetVsExpense.expense[i],
    }));

    const fundSourceData = charts.fundSourceAllocation.labels.map((label: string, i: number) => ({
        name: label,
        value: charts.fundSourceAllocation.data[i],
    }));

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6">
                {statCards.map((item, i) => (
                    <Card key={i} className="rounded-2xl shadow-md">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <item.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className="text-2xl font-bold">{item.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Budget vs Expense */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle>Budget vs Expense</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={budgetVsExpenseData}>
                                <XAxis dataKey="name" hide />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Budget" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="Expense" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Fund Source Allocation */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle>Fund Source Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={fundSourceData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                >
                                    {fundSourceData.map((_: any, index: number) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Project Utilization */}
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle>Project Utilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {charts.projectUtilization.map((item: any, i: number) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">{item.project}</p>
                                <Badge variant="secondary">{item.percentage}%</Badge>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
