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
        {
            title: "Project Management",
            items: [
                {
                    title: "Found Sources",
                    href: "/mp/dashboard/fundSources",
                    icon: "BanknoteArrowUp",
                    badge: undefined,
                    roles: ["MP"],
                },
                {
                    title: "Budget",
                    href: "/mp/dashboard/budget",
                    icon: "DollarSign",
                    badge: undefined,
                    roles: ["MP"],
                },
                {
                    title: "Projects",
                    href: "/mp/dashboard/projects",
                    icon: "SquareChartGantt",
                    badge: undefined,
                    roles: ["MP"],
                },
                {
                    title: "Expense Category",
                    href: "/mp/dashboard/expenseCategory",
                    icon: "ChartBarStacked",
                    badge: undefined,
                    roles: ["MP"],
                },
                {
                    title: "Expense",
                    href: "/mp/dashboard/expense",
                    icon: "BanknoteArrowDown",
                    badge: undefined,
                    roles: ["MP"],
                },
            ],
        },
        {
            title: "Donation Management",
            items: [
                {
                    title: "Donation Section",
                    href: "/mp/dashboard/donationSection",
                    icon: "HandCoins",
                    badge: undefined,
                    roles: ["MP"],
                },
                {
                    title: "Service recipient",
                    href: "/mp/dashboard/ServiceRecipient",
                    icon: "Accessibility",
                    badge: undefined,
                    roles: ["MP"],
                }
            ],
        },
        {
            title: "Complain Management",
            items: [
                {
                    title: "Complains Category",
                    href: "/mp/dashboard/complainsCategory",
                    icon: "ChartBarStacked",
                    badge: undefined,
                    roles: ["MP"],
                },
                {
                    title: "Complains",
                    href: "/mp/dashboard/complains",
                    icon: "MessageCircleWarning",
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