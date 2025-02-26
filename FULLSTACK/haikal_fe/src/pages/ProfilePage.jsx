import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/PP.css";

const ProfilePage = () => {
    const [pembeli, setPembeli] = useState(null);
    const [saldo, setSaldo] = useState(0);
    const [newPassword, setNewPassword] = useState("");
    const pembeliId = localStorage.getItem("pembeliId");

    const handleLogout = () => {
        localStorage.removeItem("pembeliId"); 
        localStorage.removeItem("saldo"); 
        window.location.href = "/login"; 
    };    

    useEffect(() => {
        if (!pembeliId) {
            console.error("Pembeli ID tidak ditemukan di localStorage!");
            return;
        }
    
        const fetchPembeliData = async () => {
            try {
                console.log("Fetching data for pembeliId:", pembeliId);
                const response = await fetch(`http://localhost:3100/pembeli/find/${pembeliId}`);
                if (!response.ok) throw new Error("Gagal mengambil data pembeli");
    
                const result = await response.json();
                setPembeli(result.data);
                
                if (result.data.saldo !== undefined) {
                    setSaldo(result.data.saldo);
                } else {
                    setSaldo(parseInt(localStorage.getItem("saldo")) || 0);
                }
            } catch (error) {
                console.log("Error fetching pembeli data:", error);
            }
        };
    
        fetchPembeliData();
    }, [pembeliId]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3100/pembeli/update/${pembeliId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword }),
            });
            if (!response.ok) throw new Error("Gagal mengubah password");
            alert("Password berhasil diperbarui!");
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    if (!pembeli) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-left">
                    <img src={pembeli.profilePic || 'https://ik.trn.asia/uploads/2021/12/1638889414060.jpeg?tr=w-1080'} alt="Profile" className="profile-pic" />
                    <h2>{pembeli.username}</h2>
                </div>
                <div className="profile-right">
                    <div className="info-box">
                        <p><strong>Email:</strong> {pembeli.email}</p>
                        <p><strong>No. Telp:</strong> {pembeli.phone_number || "Belum diatur"}</p>
                        <p><strong>Bergabung pada:</strong> {new Date(pembeli.createdAt).toLocaleDateString()}</p>
                        <p><strong>Saldo Anda:</strong> Rp {saldo.toLocaleString("id-ID")}</p>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="password-box">
                        <h3>Ubah Password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <input
                                type="password"
                                placeholder="Masukkan password baru"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
