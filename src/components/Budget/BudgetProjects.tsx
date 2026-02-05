import { TProjectResponse } from '@/types/dashboard/MP/Projects/ProjectTypes';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { BadgeCheck, Building2, Calendar, MapPin, Wallet } from 'lucide-react';
import { Separator } from '../ui/separator';
import DataNotFound from '@/NoDataFound/DataNotFound';

const BudgetProjects = ({ projects }: { projects: TProjectResponse[] }) => {


    if (projects.length === 0) {
        return <DataNotFound
            title='কোন প্রজেক্ট খুজে পাওয়া যায়নি'
            description='এই বাজেটের অধিনে কোন প্রজেক্ট পাওয়া যায়নি। পরবর্তীতে আবার চেষ্টা করুন' />
    }

    return (
        <div className='grid grid-cols-3 gap-4 m-10 '>
            {
                projects.map((data) => (
                    <Card key={data.id} className="group overflow-hidden rounded-2xl border  shadow-sm transition-all hover:shadow-lg">
                        {/* Header */}
                        <CardHeader className="space-y-2 border-b pb-0">
                            <div className="flex items-start justify-between pb-0">
                                <div>
                                    <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                                        {data.title}
                                    </h3>
                                    <p className="line-clamp-1 text-sm text-muted-foreground">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        {/* <Separator /> */}
                        {/* Content */}
                        <CardContent className="space-y-4">
                            {/* Location */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{data.location}</span>
                            </div>

                            {/* Costs */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl border p-3">
                                    <p className="text-xs text-foreground">Estimated Cost</p>
                                    <p className="text-lg font-semibold text-foreground">
                                        ৳ {data.estimatedCost.toLocaleString()}
                                    </p>
                                </div>

                                <div className="rounded-xl border p-3">
                                    <p className="text-xs text-foreground">Actual Cost</p>
                                    <p
                                        className={`text-lg font-semibold ${data.actualCost! > 0
                                            ? "text-emerald-600"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        ৳ {data.actualCost!.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Fund Source */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Wallet className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{data.budget.fundSource.name}</span>
                                </div>

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    <span>{data.budget.fundSource.ministry}</span>
                                </div>
                            </div>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <BadgeCheck className="h-4 w-4 text-primary" />
                                <span>FY {data.budget.fiscalYear}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(data.budget.receiveDate).toLocaleDateString()}
                                </span>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    );
};

export default BudgetProjects;