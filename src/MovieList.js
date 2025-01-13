import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Import images (ensure these paths are correct)
import actionImage from './assets/images/action.jpg';
import adventureImage from './assets/images/adventure.jpeg';
import animationImage from './assets/images/animation.jpeg';
import biographyImage from './assets/images/biography.jpg';
import comedyImage from './assets/images/comedy.jpg';
import crimeImage from './assets/images/crime.jpeg';
import dramaImage from './assets/images/drama.jpg';
import fantasyImage from './assets/images/fantasy.jpg';
import historyImage from './assets/images/history.jpg';
import horrorImage from './assets/images/horror.jpg';
import musicImage from './assets/images/music.jpg';
import mysteryImage from './assets/images/mystery.jpg';
import romanceImage from './assets/images/romance.png';
import sciFiImage from './assets/images/sci-fi.jpg';
import sportImage from './assets/images/sport.png';
import thrillerImage from './assets/images/thriller.jpg';
import warImage from './assets/images/war.jpg';

const genres = [
    "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller", "Romance", 
    "Adventure", "Fantasy", "Animation", "Crime", "Mystery", "Biography", 
    "History", "War", "Music", "Sport"
];

const genreImages = {
    "Action": actionImage,
    "Adventure": adventureImage,
    "Animation": animationImage,
    "Biography": biographyImage,
    "Comedy": comedyImage,
    "Crime": crimeImage,
    "Drama": dramaImage,
    "Fantasy": fantasyImage,
    "History": historyImage,
    "Horror": horrorImage,
    "Music": musicImage,
    "Mystery": mysteryImage,
    "Romance": romanceImage,
    "Sci-Fi": sciFiImage,
    "Sport": sportImage,
    "Thriller": thrillerImage,
    "War": warImage
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [visibleGenres, setVisibleGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [randomMovie, setRandomMovie] = useState(null);

    useEffect(() => {
        // Animate genres one by one
        const timeoutIds = genres.map((genre, index) => {
            return setTimeout(() => {
                setVisibleGenres((prev) => [...prev, genre]);
            }, index * 350); // Delay between each genre
        });

        // Animate the title after a short delay
        const titleTimeout = setTimeout(() => {
            setVisibleGenres((prev) => [...prev, 'title']);
        }, 100); // Delay for the title animation

        return () => {
            // Clear timeouts on unmount
            timeoutIds.forEach((id) => clearTimeout(id));
            clearTimeout(titleTimeout);
        };
    }, []);

    useEffect(() => {
        if (selectedGenre) {
            setLoading(true);
            setError(null); // Clear previous errors
            const fetchMovies = async () => {
                try {
                    const response = await axios.get(`https://filmfolio-backend-ad0f.onrender.com/api/movies/top-rated?genre=${selectedGenre}`);
                    const top3Movies = response.data.sort((a, b) => b.rating - a.rating).slice(0, 3);
                    setMovies(top3Movies);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                    setError('Failed to fetch movies. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchMovies();
        }
    }, [selectedGenre]);

    const handleRandomMovieByGenre = async () => {
        if (!selectedGenre) {
            alert("Please select a genre first.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`https://filmfolio-backend-ad0f.onrender.com/api/movies?genre=${selectedGenre}`);
            const movies = response.data;
            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                setRandomMovie(movies[randomIndex]);
            } else {
                setRandomMovie(null);
            }
        } catch (error) {
            console.error('Error fetching random movie:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRandomMovieAllGenres = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://filmfolio-backend-ad0f.onrender.com/api/movies`);
            const movies = response.data;
            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                setRandomMovie(movies[randomIndex]);
            } else {
                setRandomMovie(null);
            }
        } catch (error) {
            console.error('Error fetching random movie:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className={`main-container ${selectedGenre ? 'shift-left' : ''}`}>
                {/* Genre grid and title */}
                <div className="genre-sections">
                    {/* Title as a grid item */}
                    <div
                        className={`genre-section ${visibleGenres.includes('title') ? 'visible' : ''}`}
                        style={{ gridColumn: '1 / -1' }} // Span the title across all columns
                    >
                        <h1 className="genre-title">FilmFolio</h1>
                    </div>

                    {/* Genre sections */}
                    {genres.map((genre, index) => (
                        <div
                            key={genre}
                            className={`genre-section ${visibleGenres.includes(genre) ? 'visible' : ''}`}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            <img src={genreImages[genre]} alt={genre} />
                            <h2>{genre}</h2>
                        </div>
                    ))}
                </div>

                {/* Top 3 Movies section */}
                {selectedGenre && (
                    <div className="movie-list">
                        <h2>Highest Rated {selectedGenre} Movies</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: 'red' }}>{error}</p>
                        ) : movies.length > 0 ? (
                            <ul>
                                {movies.map((movie, index) => (
                                    <li key={movie.id}>
                                        <h3>{index + 1}. {movie.name}</h3>
                                        <p>Rating: {movie.rating}</p>
                                        <p>Genres: {movie.genres}</p>
                                        <p>Release Date: {movie.releaseDate}</p>
                                        <p>Run Length: {movie.runLength}</p>
                                        <p>Rated: {movie.movieRated}</p>
                                        <p>Number of Raters: {movie.numRaters}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No movies found for {selectedGenre}.</p>
                        )}

                        {/* Random Movie Buttons and Display */}
                        <div style={{ marginTop: '20px' }}>
                            <button onClick={handleRandomMovieByGenre}>Random Movie (Genre)</button>
                            <button onClick={handleRandomMovieAllGenres}>Random Movie (All)</button>
                            {randomMovie && (
                                <div style={{ marginTop: '20px' }}>
                                    <h3>Random Movie: {randomMovie.name}</h3>
                                    <p>Rating: {randomMovie.rating}</p>
                                    <p>Genres: {randomMovie.genres}</p>
                                    <p>Release Date: {randomMovie.releaseDate}</p>
                                    <p>Run Length: {randomMovie.runLength}</p>
                                    <p>Rated: {randomMovie.movieRated}</p>
                                    <p>Number of Raters: {randomMovie.numRaters}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieList;
