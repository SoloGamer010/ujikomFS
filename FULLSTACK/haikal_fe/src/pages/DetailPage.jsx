import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/DP.css";

const DetailPage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [saldo, setSaldo] = useState(() => {
        return parseInt(localStorage.getItem("saldo")) || 5000000; 
    });

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await fetch(`http://localhost:3100/film/find/${id}`);
                if (!response.ok) throw new Error("Film not found");
                const data = await response.json();
                console.log("Film Data:", data);
                setFilm(data);
            } catch (error) {
                console.error("Error fetching film:", error);
            }
        };

        fetchFilm();
    }, [id]);

    useEffect(() => {
        localStorage.setItem("saldo", saldo); 
    }, [saldo]);

    if (!film) {
        return <p>Loading...</p>;
    }

    const handlePurchase = () => {
        if (saldo >= film.data.price) {
            const newSaldo = saldo - film.data.price;
            setSaldo(newSaldo);
            alert("Pembelian berhasil! Sisa saldo: Rp " + newSaldo);
        } else {
            alert("Saldo tidak cukup!");
        }
    };

    const handleWatchTrailer = () => {
        if (film.data.trailer) {
            window.open(film.data.trailer_link, "_blank");
        } else {
            alert("Trailer tidak tersedia.");
        }
    };    

    return (
        <>
            <Navbar />
            <div className="detail-container">
                <h1 className="film-title">{film?.data.title || "Judul Tidak Ada"}</h1>
                <div className="film-content">
                    <img 
                        className="film-image" 
                        src={`${film.data.img}`} 
                        alt={film?.title || "Gambar Tidak Ada"} 
                    />
                    <div className="film-details">
                        <p><strong>Durasi:</strong> {film?.data.duration || "Tidak ada data"} menit</p>
                        <p><strong>Genre:</strong> {film?.data.genre || "Tidak ada data"}</p>
                        <p><strong>Bahasa:</strong> {film?.data.language || "Tidak ada data"}</p>
                        <p><strong>Actors:</strong> {film?.data.actors || "Tidak ada data"}</p>
                        <p><strong>Produser:</strong> {film?.data.producers || "Tidak ada data"}</p>
                        <p><strong>Deskripsi:</strong> {film?.data.description || "Tidak ada data"}</p>
                        <p><strong>Harga:</strong> Rp {film?.data.price || 0}</p>
                        <p><strong>Saldo Anda:</strong> Rp {saldo}</p>
                        <div className="button-group">
                            <button className="buy-button" onClick={handlePurchase}>Beli Film</button>
                            <button className="trailer-button" onClick={handleWatchTrailer}>Lihat Trailer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailPage;
