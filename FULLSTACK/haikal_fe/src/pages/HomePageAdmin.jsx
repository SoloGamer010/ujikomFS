import { useState, useEffect } from "react";
import api from "../utils/axios.js";
import NavbarAdmin from "../components/NavbarAdmin.jsx";
import BodyAdmin from "../components/BodyAdmin.jsx";
// import Footer from "../components/Footer";
// import '../styles/HPA.css';

const HomePageAdmin = () => {
    const [admin, setAdmin] = useState(null);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/admin", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAdmin(response.data);
            } catch (error) {   
                console.error("Error While Fetching Admin Data", error);
            }
        };
        if (token) fetchData();
    }, [token]);

    return (
        <div className="App">
            <NavbarAdmin />

            <BodyAdmin />
            
            {/* <Footer /> */}
        </div>
    );
};

export default HomePageAdmin;
