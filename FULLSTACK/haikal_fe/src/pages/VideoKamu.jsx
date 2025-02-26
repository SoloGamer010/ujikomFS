import { useState, useEffect } from "react";
import api from "../utils/axios";
import "../styles/VK.css";

const VideoKamu = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true); // Tambahkan indikator loading
    const pembeliId = localStorage.getItem("pembeliId");

    useEffect(() => {
        if (!pembeliId) {
            console.error("Pembeli ID tidak ditemukan di localStorage");
            setLoading(false);
            return;
        }

        const fetchFilms = async () => {
            try {
                const response = await api.get(`/transaksi/films/${pembeliId}`);
                console.log("Data film yang dibeli:", response.data);
                setFilms(response.data.data || []);
            } catch (error) {
                console.error("Gagal mengambil film yang dibeli:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, [pembeliId]);

    return (
        <div className="video-kamu-container">
            <h1>Film Kamu</h1>
            {loading ? (
                <p>Loading...</p>
            ) : films.length > 0 ? (
                <div className="film-list">
                    {films.map((film) => (
                        <div key={film.id} className="film-card">
                            <img src={film.img} alt={film.title} className="film-img" />
                            <div className="film-details">
                                <h2>{film.title}</h2>
                                <p><strong>Genre:</strong> {film.genre}</p>
                                <p><strong>Language:</strong> {film.language}</p>
                                <p><strong>Actors:</strong> {film.actors}</p>
                                <p><strong>Producers:</strong> {film.producers}</p>
                                <p><strong>Duration:</strong> {film.duration} mins</p>
                                <p><strong>Rating:</strong> {film.rating}</p>
                                <p><strong>Price:</strong> ${film.price}</p>
                                <a href={film.trailer_link} target="_blank" rel="noopener noreferrer" className="trailer-link">Watch Trailer</a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Belum ada film yang dibeli.</p>
            )}
        </div>
    );
};

export default VideoKamu;
