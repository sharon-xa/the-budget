import { NavLink } from "react-router-dom";
import { LogoutButton } from "../UI/AuthButtons";

const linkStyles = `text-yellow font-medium text-3xl w-32 hover:opacity-75`;

const Navbar = () => {

    return (
        <nav className="h-20 w-full flex justify-center items-center gap-2 fixed text-center bg-black bg-opacity-90">
            <NavLink to={"/"} className={({ isActive }) => `${isActive ? "linkUnderline" : ""} ${linkStyles}`}> Budget </NavLink>
            <NavLink to={"/history"} className={({ isActive }) => `${isActive ? "linkUnderline" : ""} ${linkStyles}`}> History </NavLink>
            <div className="absolute right-10 flex gap-6">
                <LogoutButton />
            </div>
        </nav>
    )
}

export default Navbar;
