'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuthToken } from "@/lib/useAuthToken"
import UserDropdown from "./UserDropdown"
import { TUser } from "@/types/User/TUserInfo"

interface NavbarAuthButtonsProps {
  initialHasToken: boolean;
  initialUserInfo: TUser | null;
  initialDashboardRoute: string;
}

export default function UserMenu({
  initialHasToken,
  initialUserInfo,
  initialDashboardRoute,
}: NavbarAuthButtonsProps) {
  // Detect client-side auth state changes on navigation
  const clientHasToken = useAuthToken();

  // Use client token state if available, otherwise fall back to server state
  const hasToken = clientHasToken || initialHasToken;
  const userInfo = hasToken ? initialUserInfo : null;
  const dashboardRoute = initialDashboardRoute;

  if (hasToken && userInfo) {
    return (
      <>
        {/* <Link href={dashboardRoute}>
          <Button variant="outline" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link> */}
        <UserDropdown userInfo={userInfo} />
      </>
    );
  }

  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}
