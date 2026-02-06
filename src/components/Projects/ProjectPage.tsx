import React from 'react';
import ProjectsCart from './ProjectsCart';
import TablePagination from '../Shared/TablePagination';
import { getAllProject } from '@/service/Dashboard/MP/project/projectManagement';

const ProjectPage = async ({ queryString }: { queryString: string }) => {
    const projects = await getAllProject(queryString);
    const totalPages = Math.ceil(
        (projects?.data?.meta?.total || 1) / (projects?.data?.meta?.limit || 1)
    );
    return (
        <div>
            <ProjectsCart projects={projects?.data?.data} />
            <div className='my-10'>
                <TablePagination
                    currentPage={projects?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </div>
        </div>
    );
};

export default ProjectPage;