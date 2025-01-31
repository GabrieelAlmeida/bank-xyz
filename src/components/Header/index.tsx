import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Header() {
  const { logout } = useAuth();
  return (
    <header
      data-testid="header"
      className="border-b-brand-dark-background-500 bg-brand-dark-background-200 fixed z-10 flex w-screen justify-end border-b-3 px-10 py-5"
    >
      <div
        data-testid="logout"
        className="hover:text-brand-red flex items-center gap-1.5 hover:cursor-pointer"
        onClick={logout}
      >
        <p>Logout</p>
        <LogOut size={16} />
      </div>
    </header>
  );
}
