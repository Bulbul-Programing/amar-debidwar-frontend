export type TBudget = {
    id: string;
    title: string;
    description: string;
    budgetAmount: number;
    fiscalYear: string;
    receiveDate: Date;
    fundSourceId: string;
    createdAt: Date;
    updateAt: Date;
};

export type TBudgetResponse = {
    id: string;
    title: string;
    description: string;
    budgetAmount: number;
    fiscalYear: string;
    receiveDate: Date;
    fundSourceId: string;
    fundSource: {
        id: string;
        name: string;
        ministry: string;
    };
    createdAt: Date;
    updateAt: Date;
};