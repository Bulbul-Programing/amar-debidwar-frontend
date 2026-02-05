import BudgetProjects from '@/components/Budget/BudgetProjects';
import { getAllProjectByBudgetId } from '@/service/Dashboard/MP/project/projectManagement';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const projects = await getAllProjectByBudgetId(id)
    console.log(projects);
    return (
        <div>
            <BudgetProjects projects={projects?.data?.data} />
        </div>
    );
};

export default page;