import { TProjectResponse } from '@/types/dashboard/MP/Projects/ProjectTypes';
import Link from 'next/link';
import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { FaMapMarkerAlt } from "react-icons/fa";
import DataNotFound from '@/NoDataFound/DataNotFound';

const ProjectsCart = ({ projects }: { projects: TProjectResponse[] }) => {
    return (
        <div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                {projects.length === 0 ? (
                    <DataNotFound
                        title="কোনো প্রকল্প পাওয়া যায়নি"
                        description="এই মুহূর্তে প্রদর্শনের জন্য কোনো উন্নয়ন প্রকল্প নেই।" />
                ) : (
                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => {
                            const costPercent = Math.min(
                                100,
                                ((project.actualCost ? project.actualCost : 0) / (project.estimatedCost || 1)) * 100
                            );

                            return (
                                <div
                                    key={project.id}
                                    className="bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-3xl transition duration-300 border border-gray-100"
                                >
                                    {/* Project Title */}
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                                        {project.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-1">{project.description}</p>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-green-50 text-green-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                            {project.budget?.fundSource?.name}
                                        </span>
                                        <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                            {project.budget?.fiscalYear}
                                        </span>
                                    </div>

                                    {/* Project Details */}
                                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                                        <p className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-primary truncate" /> {project.location}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <FaMoneyBillWave className="text-primary" /> অনুমানিত ব্যয়:{" "}
                                            {project.estimatedCost.toLocaleString()} টাকা
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <FaMoneyBillWave className="text-primary" /> বাস্তব ব্যয়:{" "}
                                            {project.actualCost ? project.actualCost.toLocaleString() : 0} টাকা
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${costPercent}%` }}
                                        />
                                        <span className="absolute right-0 top-0 -mt-6 text-xs text-gray-500 font-medium">
                                            {costPercent.toFixed(1)}%
                                        </span>
                                    </div>

                                    {/* View Details Button */}
                                    <Link
                                        href={`/project/${project.id}`}
                                        className="mt-auto text-center hover:cursor-pointer bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-dark transition font-semibold shadow-md hover:shadow-lg"
                                    >
                                        বিস্তারিত দেখুন
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProjectsCart;