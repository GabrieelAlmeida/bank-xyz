import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Header() {
    const { logout } = useAuth();
    return(
        <header className="flex w-screen fixed z-10 justify-end py-5 px-10 border-b-3 border-b-brand-dark-background-500 bg-brand-dark-background-200">
            <div className="flex items-center gap-1.5 hover:text-brand-red hover:cursor-pointer" onClick={logout}>
                <p>Logout</p>
                <LogOut  size={16} />
            </div>
        </header>
    );
}