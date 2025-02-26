import { useState, useEffect } from "react";
import api from "../utils/axios.js";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import Footer from "../components/Footer";
import '../styles/HP.css';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/pembeli", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error While Fetching Data", error);
            }
        };
        if (token) fetchData();
    }, [token]);

    return (
        <div className="App">
            <Navbar />

            <Body />
            
            <Footer />
        </div>
    );
};

export default HomePage;
