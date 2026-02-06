export const dynamic = 'force-dynamic';
import DashboardHome from '@/components/dashboard/Mp/DBHome/MPDashboardHome';
import { getMPDashboardHomeData } from '@/service/Dashboard/MP/dashboardHome';
import React from 'react';

const MpDashboardHome = async () => {
    const getDBHomeData = await getMPDashboardHomeData()
    return (
        <div>
            <DashboardHome data={getDBHomeData?.data} />
        </div>
    );
};

export default MpDashboardHome