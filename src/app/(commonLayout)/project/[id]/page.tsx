import { getSingleProject } from '@/service/Dashboard/MP/project/projectManagement';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa6';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const projectResponse = await getSingleProject(id)
    const project = projectResponse?.data
    const costPercent = Math.min(
        100,
        ((project.actualCost ? project.actualCost : 0) / (project.estimatedCost || 1)) * 100
    );
    return (
        <div>
            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <header className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 text-center shadow-lg">
                    <h1 className="text-4xl sm:text-5xl font-bold truncate">{project.title}</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl line-clamp-2">
                        {project.description}
                    </p>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="rounded-3xl border border-foreground shadow-lg p-8 flex flex-col gap-8 bg-card text-card-foreground transition-colors duration-300">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-green-50 text-green-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                {project.budget?.fundSource?.name}
                            </span>
                            <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                {project.budget?.fiscalYear}
                            </span>
                        </div>

                        {/* Location & Costs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-primary" /> <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-primary" />
                                <span>অনুমানিত ব্যয়: {project.estimatedCost?.toLocaleString() || 0} টাকা</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-primary" />
                                <span>বাস্তব ব্যয়: {project.actualCost?.toLocaleString() || 0} টাকা</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">বাজেট শিরোনাম:</span> {project.budget?.title}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                            <h3 className="text-foreground font-semibold mb-2">ব্যয় প্রগতি ({costPercent} %)</h3>
                            <div className="relative w-full bg-muted rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-primary h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${costPercent}%` }}
                                />
                                <span className="absolute right-2 top-0 -mt-6 text-xs text-muted-foreground font-medium">
                                    {costPercent.toFixed(1)}%
                                </span>
                            </div>
                        </div>

                        {/* Budget & Fund Source */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground text-sm md:text-base">
                            <div>
                                <span className="font-medium">ফান্ড উৎস:</span> {project.budget?.fundSource?.name}
                            </div>
                            <div>
                                <span className="font-medium">মন্ত্রণালয়:</span> {project.budget?.fundSource?.ministry}
                            </div>
                            <div>
                                <span className="font-medium">অর্থবছর:</span> {project.budget?.fiscalYear}
                            </div>
                            <div>
                                <span className="font-medium">প্রাপ্তির তারিখ:</span>{" "}
                                {new Date(project.budget?.receiveDate || "").toLocaleDateString("bn-BD", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                        </div>

                        {/* Full Description */}
                        <div className="text-foreground">
                            <h3 className="text-foreground font-semibold mb-2 text-lg md:text-xl">প্রকল্পের বিস্তারিত বিবরণ :</h3>
                            <p className="text-sm md:text-base border-2 border-foreground/30 p-2 rounded-lg">{project.description}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default page;