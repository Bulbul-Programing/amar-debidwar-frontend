import { TExpenseCategory } from "../expenseCategory/expenseCategory";
import { TProjectResponse } from "../Projects/ProjectTypes";

export interface TExpense {
    id: string;
    description: string;
    amount: number;
    expenseDate: Date;
    chalanImage?: string | null;
    projectId: string;
    categoryId: string;
    project: TProjectResponse;
    expenseCategory: TExpenseCategory;
    createdAt: Date;
    updatedAt: Date
}