""

import { NavSection } from "@/types/dashboard/dashboardNavItem";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "MP", "ADMIN"],
                },
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER", "MP", "ADMIN"],
                },
                {
                    title: "Home",
                    href: "/",
                    icon: "Home", // ✅ String
                    roles: ["USER", "MP", "ADMIN"],
                }
            ]
        }
    ]
}

export const getUserNavItem = async (): Promise<NavSection[]> => {

    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    href: "/user/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["USER"],
                }
            ],
        }
    ];
}

export const getMPNavItems = async (): Promise<NavSection[]> => {
    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    href: "/mp/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["MP"],
                }
            ],
        },
        {
            title: "User Management",
            items: [
                {
                    title: "Users",
                    href: "/mp/dashboard/users",
                    icon: "Calendar",
                    badge: undefined,
                    roles: ["MP"],
                }
            ],
        },
    ]
}

export const adminNavItems: NavSection[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Dashboard",
                href: "/admin/dashboard",
                icon: "LayoutDashboard",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Users",
                href: "/admin/dashboard/user-management",
                icon: "User",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "Spot Management",
        items: [
            {
                title: "Tour Spot",
                href: "/admin/dashboard/guide-spot",
                icon: "Mountain",
                roles: ["ADMIN"],
            },
            {
                title: "Payments",
                href: "/admin/dashboard/all-payments",
                icon: "DollarSign",
                roles: ["ADMIN"],
            },
        ]
    },
    {
        title: "Coupon Management",
        items: [
            {
                title: "Coupon",
                href: "/admin/dashboard/coupon",
                icon: "Percent",
                roles: ["ADMIN"],
            }
        ]
    }
]

export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...adminNavItems, ...commonNavItems,];
        case "USER":
            return [...await getUserNavItem(), ...commonNavItems];
        case "MP":
            return [...await getMPNavItems(), ...commonNavItems];
        default:
            return [];
    }
}