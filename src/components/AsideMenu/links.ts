
export interface LinkAsideMenuProps {
    name: string;
    path: string;
}

export const linksAsideMenu: LinkAsideMenuProps[] = [
    {
        name: "Dashboard",
        path: "/dashboard"
    },

    {
        name: "Transfers",
        path: "/transfers"
    },

    {
        name: "New transfer",
        path: "/new-transfer"
    }
];
