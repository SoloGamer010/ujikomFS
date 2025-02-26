import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const NavbarAdmin = () => {
    return (
        <nav className="navbar-admin">
            <h1>Admin Panel</h1>
            <ul>
                {/* <li><Link to="/admin">Dashboard</Link></li> */}
                <li><Link to="/admin/film">Kelola Film</Link></li>
                <li><Link to="/admin/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;
