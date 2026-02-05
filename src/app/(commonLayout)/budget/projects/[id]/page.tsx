import BudgetHeader from '@/components/Budget/BudgetHeader';
import BudgetProjects from '@/components/Budget/BudgetProjects';
import { getAllProjectByBudgetId } from '@/service/Dashboard/MP/project/projectManagement';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const projects = await getAllProjectByBudgetId(id)
  
    return (
        <div>
            <BudgetHeader meta={projects?.data?.meta} />
            <BudgetProjects projects={projects?.data?.data} />
        </div>
    );
};

export default page;