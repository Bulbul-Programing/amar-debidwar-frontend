import ProjectSearch from '@/components/dashboard/Mp/Projects/ProjectSearch';
import ProjectsCart from '@/components/Projects/ProjectsCart';
import ProjectsHeader from '@/components/Projects/ProjectsHeader';
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

    return (
        <div>
            <ProjectsHeader />
            <div className='px-4 sm:px-6 lg:px-8 pt-5'>
                <ProjectSearch />
            </div>
            <ProjectsCart projects={projects?.data?.data} />
        </div>
    );
};

export default page;