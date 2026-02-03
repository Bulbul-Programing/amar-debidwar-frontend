export interface TCategory {
    id: string;
    name: string;
    nameBn: string;
    isActive: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface TComplain {
    id: string;
    title: string;
    description: string;
    photo?: string; // optional if no photo
    location: string;
    complainCategory: string; // category id
    createdAt: string; // ISO date string
    updateAt: string; // ISO date string
    category: TCategory;
}
