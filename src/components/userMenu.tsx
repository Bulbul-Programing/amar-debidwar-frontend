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
  const clientHasToken = useAuthToken();
  const hasToken = clientHasToken || initialHasToken;
  const userInfo = hasToken ? initialUserInfo : null;

  if (hasToken && userInfo) {
    return (
      <>
        <UserDropdown userInfo={userInfo} />
      </>
    );
  }

  return (
    <Link href="/login" className="cursor-pointer">
      <Button className="cursor-pointer">Login</Button>
    </Link>
  );
}
