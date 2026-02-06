
import ProjectPage from '@/components/Projects/ProjectPage';
import ProjectSearchComponent from '@/components/Projects/ProjectSearchComponent';
import ProjectsHeader from '@/components/Projects/ProjectsHeader';
import { queryStringFormatter } from '@/lib/formatters';
import ProjectPageSkeleton from '@/skeleton/ProjectPageSkeleton';
import { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    return (
        <div>
            <ProjectsHeader />
            <div className='px-4 sm:px-6 lg:px-8 pt-5'>
                <ProjectSearchComponent />
            </div>
            <Suspense fallback={<ProjectPageSkeleton />}>
                <ProjectPage queryString={queryString} />
            </Suspense>
        </div>
    );
};

export default page;