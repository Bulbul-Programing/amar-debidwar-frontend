import { getAllProjectByBudgetId } from '@/service/Dashboard/MP/project/projectManagement';
import BudgetHeroHeader from './BudgetHeader';
import BudgetProjects from './BudgetProjects';

const BudgetDetailsPage = async ({ projectId }: { projectId: string }) => {
    const projects = await getAllProjectByBudgetId(projectId)
    return (
        <div>
            <BudgetHeroHeader meta={projects?.data?.meta} />
            <BudgetProjects projects={projects?.data?.data} />
        </div>
    );
};

export default BudgetDetailsPage;