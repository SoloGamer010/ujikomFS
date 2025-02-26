import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/axios";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [username, setUsername] = useState("");  

    const pembeliId = localStorage.getItem("pembeliId"); 

    useEffect(() => {
        if (searchQuery.length > 0) {
            const fetchFilms = async () => {
                try {
                    console.log("Mencari film:", searchQuery);
                    const response = await api.get(`/film/search?query=${searchQuery}`);
                    console.log("Hasil pencarian:", response.data.data);
                    setSearchResults(response.data.data);
                } catch (error) {
                    console.error("Gagal mencari film", error);
                }
            };
    
            fetchFilms();
        } else {
            setSearchResults([]); 
        }

    }, [searchQuery]);    

    useEffect(() => {
        const fetchUsername = async () => {
            if (!pembeliId) return; 

            try {
                const response = await api.get(`/pembeli/find/${pembeliId}`);
                setUsername(response.data.data.username); 
            } catch (error) {
                console.error("Gagal mengambil data pengguna", error);
            }
        };

        fetchUsername();
    }, [pembeliId]);

    return (
        <nav className="navbar">
            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                        console.log("Input berubah:", e.target.value);
                        setSearchQuery(e.target.value);
                    }}
                />
                {searchResults.length > 0 && (
                <ul className="dropdown-search">
                    {searchResults.map((film) => (
                        <li key={film.id} onClick={() => {
                            console.log("Klik film:", film.title);
                            navigate(`/film/${film.id}`);
                        }}>
                            {film.title}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className="nav-profile">
                <Link to="/film-kamu">Film Kamu</Link>
            </div>
            <div className="nav-logo">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-profile">
                <Link to="/profile">
                    Profil: {username ? username : "Loading..."}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
