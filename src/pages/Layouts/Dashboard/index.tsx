import { Outlet } from "react-router-dom";
import { AsideMenu } from "../../../components/AsideMenu";
import { Header } from "../../../components/Header";

export function DashboardLayout() {
    return (
        <div className="flex h-screen">
            <AsideMenu />

            <div className="flex flex-col w-screen">
                <Header />
                <div className="pt-24 pl-72">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}