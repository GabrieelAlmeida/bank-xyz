import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import { LinkAsideMenuProps, linksAsideMenu } from "./links";

export function AsideMenu() {
    return(
        <aside className="bg-brand-dark-background-500 w-64 pl-6">
            <div className="py-5 mr-14 border-b-2 border-b-brand-dark-background-100">
                <Logo />
            </div>

            <nav className="pt-4">
                <ul className="font-medium space-y-2">
                    {linksAsideMenu.map((item: LinkAsideMenuProps, index: number) => (
                        <li key={`${index}-${item.name}`} className="flex hover:text-brand-purple-100 hover:cursor-pointer">
                            <NavLink
                                to={item?.path}
                                className={({ isActive }) =>
                                    isActive ? "text-brand-purple-100" : ""
                                }>
                                {item?.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}