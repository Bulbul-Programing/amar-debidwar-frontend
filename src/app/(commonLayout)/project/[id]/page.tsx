import ProjectDetailsPage from '@/components/Projects/ProjectDetailsPage';
import { getSingleProject } from '@/service/Dashboard/MP/project/projectManagement';
import ProjectDetailsSkeleton from '@/skeleton/ProjectDetailsSkeleton';
import React, { Suspense } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa6';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    return (
        <div>
            <Suspense fallback={<ProjectDetailsSkeleton />}>
                <ProjectDetailsPage id={id} />
            </Suspense>
        </div>
    );
};

export default page;