export type TProjectResponse = {
    id: string;
    title: string;
    description: string;
    location: string;
    estimatedCost: number;
    actualCost: number | null;
    isDeleted: boolean;

    budgetId: string;
    budget: {
        id: string;
        title: string;
        description: string;
        budgetAmount: number;
        fiscalYear: string;
        receiveDate: Date;
        fundSourceId: string;
        createdAt: Date;
        updateAt: Date;

        fundSource: {
            id: string;
            name: string;
            ministry: string;
        };
    };
};
