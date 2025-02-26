import { useState } from "react";
import axios from "axios";

const RegisterFormAdmin = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:3100/admin/register", { 
                username,
                email,
                password
            });

            alert("Registrasi berhasil! Silakan login.");
            window.location.href = "/LoginAdmin"; 
        } catch (err) {
            setError(err.response?.data?.msg || "Terjadi kesalahan saat registrasi");
        }
    };

    return (
        <div className="register-container">
            <h2>Registrasi Admin</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterFormAdmin;
