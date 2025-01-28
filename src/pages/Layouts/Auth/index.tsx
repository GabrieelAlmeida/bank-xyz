import { Outlet } from "react-router-dom";
import { Logo } from "../../../components/Logo";
import financialBackgroundLogo from "../../../assets/financial-login.svg";

export function AuthLayout() {
    return(
        <main className="h-full w-full">
            <div className="flex justify-between text-brand-font-dark-100">
                <div className="w-[50vw] h-screen bg-brand-dark-background-200  p-6 flex flex-col gap-10">
                    <Logo />
                    <img src={financialBackgroundLogo} className="justify-center "alt="Bank XYZ financial background Logo"/>
                </div>
                <Outlet />
            </div>
        </main>
    )
}