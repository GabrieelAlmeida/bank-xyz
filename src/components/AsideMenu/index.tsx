import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import { LinkAsideMenuProps, linksAsideMenu } from "./links";

export function AsideMenu() {
  function handleStyleActiveLink(isActive: boolean) {
    if (isActive) {
      return "text-brand-purple-100";
    }

    return "";
  }
  return (
    <aside className="bg-brand-dark-background-500 fixed z-20 h-screen w-64 pl-6">
      <div className="border-b-brand-dark-background-100 mr-14 border-b-2 py-5">
        <Logo />
      </div>

      <nav className="pt-4" data-testid="links-container">
        <ul className="space-y-2 font-medium">
          {linksAsideMenu.map((item: LinkAsideMenuProps, index: number) => (
            <li
              key={`${index}-${item.name}`}
              className="hover:text-brand-purple-100 flex hover:cursor-pointer"
            >
              <NavLink
                to={item?.path}
                className={({ isActive }) => handleStyleActiveLink(isActive)}
              >
                {item?.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
