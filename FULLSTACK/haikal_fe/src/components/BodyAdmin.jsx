import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BodyA.css";

const BodyAdmin = () => {
    const [filmData, setFilmData] = useState({
        title: "", price: "", description: "", trailer_link: "", img: "", genre: "", language: "", actors: "", producers: "", duration: "", rating: ""
    });

    const [films, setFilms] = useState([]);

    const handleChange = (e) => {
        setFilmData({ ...filmData, [e.target.name]: e.target.value });
    };

    const handleAddFilm = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3100/film/create", filmData);
            alert("Film berhasil ditambahkan!");
            setFilmData({ title: "", price: "", description: "", trailer_link: "", img: "",
            genre: "", language: "", actors: "", producers: "", duration: "", rating: "" });
            fetchFilms(); 
        } catch (error) {
            alert("Gagal menambahkan film.");
        }
    };

    const fetchFilms = async () => {
        try {
            const response = await axios.get("http://localhost:3100/film");
            console.log("Data film yang diterima:", films);
            setFilms(response.data);
            console.log("State setelah update:", films);

        } catch (error) {
            console.error("Gagal mengambil data film:", error);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    return (
        <div className="body-admin">
            {/* BAGIAN KIRI (FORM INPUT FILM) */}
            <div className="form-container">
                <h2>Tambah Film Baru</h2>
                <form onSubmit={handleAddFilm}>
                    <input type="text" name="title" placeholder="Judul Film" value={filmData.title} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Harga" value={filmData.price} onChange={handleChange} required />
                    <input name="description" placeholder="Deskripsi" value={filmData.description} onChange={handleChange} required />
                    <input type="text" name="trailer_link" placeholder="Link Trailer" value={filmData.trailer_link} onChange={handleChange} required />
                    <input type="text" name="img" placeholder="URL Gambar" value={filmData.img} onChange={handleChange} required />
                    <input type="text" name="genre" placeholder="Genre" value={filmData.genre} onChange={handleChange} required />
                    <input type="text" name="language" placeholder="Bahasa" value={filmData.language} onChange={handleChange} required />
                    <input type="text" name="actors" placeholder="Pemeran" value={filmData.actors} onChange={handleChange} required />
                    <input type="text" name="producers" placeholder="Produser" value={filmData.producers} onChange={handleChange} required />
                    <input type="text" name="duration" placeholder="Durasi (menit)" value={filmData.duration} onChange={handleChange} required />
                    <input type="text" name="rating" placeholder="Rating (1-10)" value={filmData.rating} onChange={handleChange} required />
                    <button type="submit">Tambah Film</button>
                </form>
            </div>

            <div className="film-list">
                <h2>Daftar Film</h2>
                {films.length > 0 ? (
                    films.map((film) => (
                        <div key={film.id} className="film-card">
                            <img src={film.img} alt={film.title} />
                            <h3>{film.title}</h3>
                            <p><strong>Price:</strong> {film.price}</p>
                            <p><strong>Description:</strong> {film.description}</p>
                            <p><strong>Genre:</strong> {film.genre}</p>
                            <p><strong>Language:</strong> {film.language}</p>
                            <p><strong>Actors:</strong> {film.actors}</p>
                            <p><strong>Producers:</strong> {film.producers}</p>
                            <p><strong>Duration:</strong> {film.duration}</p>
                            <p><strong>Rating:</strong> {film.rating}</p>
                            <p><strong>Trailer:</strong> <a href={film.trailer_link} target="_blank" rel="noopener noreferrer">Watch</a></p>
                            <img src={film.img} alt={film.title} width="150" />
                        </div>
                    ))
                ) : (
                    <p>Belum ada film tersedia.</p>
                )}
            </div>
        </div>
    );
};

export default BodyAdmin;
