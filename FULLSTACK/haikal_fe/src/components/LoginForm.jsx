import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LP.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log("Mengirim data login:", { email, password }); 

        try {
            const response = await axios.post("http://localhost:3100/pembeli/login", {
                email,
                password
            });
        
            console.log("Response dari server:", response.data);
            console.log("Pembeli ID yang diterima:", response.data.userId); 
        
            if (response.data.userId) {
                localStorage.setItem("pembeliId", response.data.userId);
            } else {
                console.error("User ID tidak ditemukan dalam response!");
            }
        
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.msg || "Login Failed");
        }        
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h2>Login</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Isi Email"
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
                            placeholder="Isi Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className='buttonL' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
