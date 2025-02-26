import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/Body.css';

const Body = () => {
    const [filmPopuler, setFilmPopuler] = useState([]); 
    const [filmLainnya, setFilmLainnya] = useState([]);

    const images = import.meta.glob("../assets/img/*", { eager: true });

    useEffect(() => {
        const fetchFilmPopuler = async () => {
            try {
                const response = await axios.get("http://localhost:3100/film/populer");
                setFilmPopuler(response.data.data);
            } catch (error) {
                console.error("Gagal mengambil film populer", error);
            }
        };

        fetchFilmPopuler();
    }, []);

    useEffect(() => {
        const fetchFilmLainnya = async () => {
            try {
                const response = await axios.get("http://localhost:3100/film/lainnya");
                setFilmLainnya(response.data.data);
            } catch (error) {
                console.error("Gagal mengambil film lainnya", error);
            }
        };

        fetchFilmLainnya();
    }, []);

    return (
        <div className="body-container">
            <div className="film-populer">
                <h2>Film Populer</h2>
                <div className="film-list">
                    {filmPopuler.length > 0 ? (
                        filmPopuler.map((film) => (
                            <Link to={`/film/${film.id}`} key={film.id} className="film-card">        
                                    <img 
                                        src={film.img || "/react.jpg"}  
                                        alt={film.title} 
                                        />
                                    <h3>{film.title}</h3>
                                    {/* <p>Durasi: {film.duration} menit</p>*/}
                            </Link>
                        ))
                    ) : (
                        <p>Tidak ada film populer.</p>
                    )}
                </div>
            </div>

            <div className="film-lainnya">
                <h2>Film Lainnya</h2>
                <div className="film-list">
                    {filmLainnya.length > 0 ? (
                        filmLainnya.map((film) => (
                            <Link to={`/film/${film.id}`} key={film.id} className="film-card">
                                <img 
                                    src={film.img || "/react.jpg"}  
                                    alt={film.title} 
                                    />
                                <p>{film.title}</p>
                                {/* <p>Durasi: {film.duration} menit</p>*/}
                            </Link>
                        ))
                    ) : (
                        <p>Tidak ada film lainnya.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Body;
