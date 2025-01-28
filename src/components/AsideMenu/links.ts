
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
        name: "Transactions",
        path: "/transactions"
    },

    {
        name: "New transaction",
        path: "/new-transaction"
    }
];
