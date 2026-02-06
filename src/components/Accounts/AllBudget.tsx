import DataNotFound from '@/NoDataFound/DataNotFound';
import { getAllBudgetsByFundSource } from '@/service/Dashboard/MP/budget/budgetManagement';
import { TBudgetResponse } from '@/types/dashboard/MP/budget/budgetTypes';
import { TFundSource } from '@/types/dashboard/MP/Fund/FundTypes';
import { CalendarDays, Landmark, Wallet } from 'lucide-react';
import Link from 'next/link';

const AllBudget = async ({ budgets }: { budgets: TBudgetResponse[] }) => {

    if (budgets?.length < 1) {
        return <DataNotFound
            title="বাজেট তথ্য নেই"
            description="নির্বাচিত ফান্ড সোর্সের জন্য কোনো বাজেট পাওয়া যায়নি।"
        />
    }
    return (
        <div>
            {
                <section className="mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {budgets?.map((budget: TBudgetResponse) => (
                            <div
                                key={budget.id}
                                className="group relative rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div>
                                    <div>
                                        {/* Title */}
                                        <h3 className="text-lg max-w-87.5 font-bold text-foreground mb-1 truncate">
                                            {budget.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm max-w-87.5 text-muted-foreground truncate">
                                            {budget.description}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="absolute top-2 right-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                                            {budget.fiscalYear}
                                        </p>
                                    </div>

                                </div>
                                <div className='border my-3' />
                                {/* Budget Amount */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Wallet size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">মোট বাজেট</p>
                                        <p className="text-lg font-semibold text-foreground">
                                            {budget.budgetAmount.toLocaleString()} টাকা
                                        </p>
                                    </div>
                                </div>

                                {/* Meta Info */}
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={16} className="text-primary" />
                                        <span>
                                            প্রাপ্তির তারিখ:{" "}
                                            {new Date(budget.receiveDate).toLocaleDateString("bn-BD", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Landmark size={16} className="text-primary" />
                                        <span>{budget.fundSource.ministry}</span>
                                    </div>
                                </div>
                                <div className='border my-3' />
                                {/* Fund Source */}
                                <div className=" flex items-center justify-between border-border pt-">
                                    <span className="text-xs font-medium text-muted-foreground">
                                        তহবিলের উৎস
                                    </span>
                                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                                        {budget.fundSource.name}
                                    </span>
                                </div>

                                <Link className=' block w-full mt-2 px-2 rounded-md bg-primary text-white text-center py-2' href={`/budget/projects/${budget.id}`}>
                                    সকল প্রজেক্টগুলো দেখুন
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            }

        </div>
    );
};

export default AllBudget;