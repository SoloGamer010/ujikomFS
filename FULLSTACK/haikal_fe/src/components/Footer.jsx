import React from "react";
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="bungkusFoot">
            <p>&copy; {new Date().getFullYear()} Toko Film. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
