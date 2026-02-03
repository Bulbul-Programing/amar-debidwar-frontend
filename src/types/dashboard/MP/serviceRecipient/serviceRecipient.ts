export type TUnion = {
    id: string;
    name: string;
    population?: number | null;
    createdAt: Date;
};

export type TVillage = {
    id: string;
    name: string;
    population?: number | null;
    unionId: string;
};

export type TDonationSection = {
    id: string;
    title: string;
    photo: string | null;
};

export type TServiceRecipient = {
    id: string;
    name: string;
    phone: string;
    nidNumber: string;
    address: string;

    unionId: string;
    villageId: string;
    donationId: string;

    createdAt: string;
    updateAt: string;

    union: {
        id: string;
        name: string;
        population: number;
        createdAt: Date;
    };

    village: {
        id: string;
        name: string;
        population: number;
        unionId: string;
    };

    donation: {
        id: string;
        title: string;
        photo: string | null;
    };
};
