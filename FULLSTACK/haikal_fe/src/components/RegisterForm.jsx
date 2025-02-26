import React, { useState } from "react";
import axios from "axios";
import '../styles/RP.css';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:3100/pembeli/register", {
                username,
                email,
                password,
                phone_number: phoneNumber 
            });

            localStorage.setItem('token', response.data.token); 
            navigate('/login'); 
        } catch (error) {
            setError(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <React.Fragment>
            <div className="register-wrapper">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="register-box">
                <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="   input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <button className="buttonR" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterForm;
