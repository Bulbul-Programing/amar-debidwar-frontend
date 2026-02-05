"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Landmark, ShieldCheck, Eye, FileCheck2, Server, Lock } from "lucide-react";

export default function AboutUsPage() {
    return (
        <main className="bg-background text-foreground">
            {/* ================= HERO SECTION ================= */}
            <section className="bg-primary text-primary-foreground py-24 px-6">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <Badge className="bg-white/20 text-white px-4 py-1 text-sm">
                        সরকারি স্বচ্ছতা ও জবাবদিহিতা প্ল্যাটফর্ম
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        আমাদের সম্পর্কে
                    </h1>
                    <p className="max-w-4xl mx-auto text-base md:text-lg opacity-95 leading-relaxed">
                        এই ডিজিটাল প্ল্যাটফর্মটি জনপ্রতিনিধির আওতাভুক্ত এলাকার সরকারি বাজেট, উন্নয়ন প্রকল্প, সামাজিক নিরাপত্তা ভাতা এবং নাগরিক সেবাসমূহকে স্বচ্ছ, নির্ভুল ও সহজবোধ্যভাবে জনগণের সামনে উপস্থাপনের জন্য নির্মিত।
                    </p>
                </div>
            </section>

            {/* ================= KEY STATS ================= */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<Landmark />} title="মোট বরাদ্দকৃত অর্থ" value="0+ কোটি টাকা" />
                    <StatCard icon={<BarChart3 />} title="উন্নয়ন প্রকল্প" value="0+ টি" />
                    <StatCard icon={<Users />} title="ভাতাভোগী নাগরিক" value="0+" />
                    <StatCard icon={<ShieldCheck />} title="অডিটকৃত ব্যয়" value="১০০%" />
                </div>
            </section>

            {/* ================= PLATFORM OBJECTIVES ================= */}
            <section className="py-10 px-6 bg-muted">
                <div className="max-w-6xl mx-auto  gap-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">প্ল্যাটফর্মের উদ্দেশ্য</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            জনগণের তথ্য জানার অধিকার সংরক্ষণ এবং সরকারি কার্যক্রমে জবাবদিহিতা নিশ্চিত করাই এই প্ল্যাটফর্মের মূল লক্ষ্য। এখানে বাজেট বরাদ্দ থেকে শুরু করে প্রকল্প বাস্তবায়ন পর্যন্ত প্রতিটি ধাপ তথ্যভিত্তিকভাবে উপস্থাপন করা হয়।
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            এই উদ্যোগের মাধ্যমে উন্নয়ন কার্যক্রমে স্বচ্ছতা বৃদ্ধি পায় এবং নাগরিকরা সরাসরি সরকারি ব্যয়ের বাস্তব চিত্র দেখতে সক্ষম হন।
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-5">
                        <FeatureCard icon={<Eye />} title="সম্পূর্ণ স্বচ্ছতা" description="বাজেট ও ব্যয়ের সকল তথ্য উন্মুক্তভাবে প্রদর্শন" />
                        <FeatureCard icon={<FileCheck2 />} title="যাচাইকৃত তথ্য" description="সরকারি নথি ও অনুমোদিত উৎসের ভিত্তিতে ডেটা সংরক্ষণ" />
                        <FeatureCard icon={<Server />} title="কেন্দ্রীয় ডেটা সিস্টেম" description="সমন্বিত ও নিরাপদ ডেটাবেইস ব্যবস্থাপনা" />
                        <FeatureCard icon={<Lock />} title="তথ্য নিরাপত্তা" description="নাগরিক ও প্রশাসনিক তথ্যের সর্বোচ্চ সুরক্ষা" />
                    </div>
                </div>
            </section>

            {/* ================= GOVERNANCE & TRANSPARENCY ================= */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    <h2 className="text-2xl font-semibold">শাসন ও জবাবদিহিতা কাঠামো</h2>
                    <p className="text-muted-foreground leading-relaxed max-w-4xl">
                        এই প্ল্যাটফর্মটি একটি সুসংগঠিত শাসন কাঠামোর আওতায় পরিচালিত হয়, যেখানে প্রতিটি অর্থনৈতিক কার্যক্রম পর্যবেক্ষণ, নথিভুক্তকরণ এবং প্রয়োজনে অডিটের জন্য সংরক্ষিত থাকে।
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GovernanceCard title="বাজেট ব্যবস্থাপনা" description="বরাদ্দ, ব্যয় ও অবশিষ্ট অর্থের স্বয়ংক্রিয় হিসাব" />
                        <GovernanceCard title="প্রকল্প পর্যবেক্ষণ" description="চলমান ও সমাপ্ত প্রকল্পের অবস্থা ও অগ্রগতি" />
                        <GovernanceCard title="নাগরিক অভিযোগ" description="অভিযোগ গ্রহণ, যাচাই ও নিষ্পত্তির ডিজিটাল প্রক্রিয়া" />
                    </div>
                </div>
            </section>

            {/* ================= COMMITMENT ================= */}
            <section className="pb-16 px-6 bg-card">
                <div className="max-w-6xl mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold">আমাদের প্রতিশ্রুতি</h2>
                    <Separator />
                    <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                        <li>সরকারি অর্থ ব্যবহারে সর্বোচ্চ স্বচ্ছতা নিশ্চিত করা</li>
                        <li>নাগরিকদের তথ্য জানার অধিকার সংরক্ষণ করা</li>
                        <li>ডিজিটাল প্রযুক্তির মাধ্যমে জবাবদিহিতা বৃদ্ধি করা</li>
                        <li>উন্নয়ন পরিকল্পনায় তথ্যভিত্তিক সিদ্ধান্ত গ্রহণে সহায়তা করা</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">{icon}</div>
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-xl font-semibold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="rounded-2xl shadow-sm p-4 bg-background">
            <div className="space-y-2">
                <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">{icon}</div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}

function GovernanceCard({ title, description }: { title: string; description: string }) {
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}