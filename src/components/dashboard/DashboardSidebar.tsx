import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/service/Auth/getUserInfo";
import { NavSection } from "@/types/dashboard/dashboardNavItem";
import { TUser } from "@/types/User/TUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as TUser;

  const navItems: NavSection[] = await getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
