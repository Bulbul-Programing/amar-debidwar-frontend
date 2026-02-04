
import ProjectsCart from '@/components/Projects/ProjectsCart';
import ProjectSearchComponent from '@/components/Projects/ProjectSearchComponent';
import ProjectsHeader from '@/components/Projects/ProjectsHeader';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllProject } from '@/service/Dashboard/MP/project/projectManagement';
import React from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const projects = await getAllProject(queryString);
    const totalPages = Math.ceil(
        (projects?.data?.meta?.total || 1) / (projects?.data?.meta?.limit || 1)
    );
    return (
        <div>
            <ProjectsHeader />
            <div className='px-4 sm:px-6 lg:px-8 pt-5'>
                <ProjectSearchComponent />
            </div>
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

export default page;