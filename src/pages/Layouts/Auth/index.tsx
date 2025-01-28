import { Outlet } from "react-router-dom";
import { Logo } from "../../../components/Logo";

export function AuthLayout() {
    return(
        <main className="h-full w-full">
            <div className="flex justify-between text-brand-font-dark-100">
                <Logo />
                <Outlet />
            </div>
        </main>
    )
}