import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../../../utils/axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargerRow }) => {
    const [movies, setMovies] = useState([]);  // Fixed setMovie to setMovies
    const [trailerUrl, setTrailerUrl] = useState('');
    const base_url = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        (async () => {
            try {
                console.log(fetchUrl);
                const request = await axios.get(fetchUrl);
                console.log(request);
                setMovies(request.data.results);  // Fixed: use setMovies
            } catch (error) {
                console.log('Error fetching movies:', error);
            }
        })();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    if (!url) return;  // Fixed: Avoids URL error
                    console.log(url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log('Error fetching trailer:', error));
        }
    };

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row_posters">
                {movies?.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index}
                        src={`${base_url}${isLargerRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie?.title || movie?.name || movie?.original_name}  // Fixed: Better alt text
                        className={`row_poster ${isLargerRow && 'row_posterLarge'}`}
                    />
                ))}
            </div>
            <div style={{ padding: '40px' }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
};

export default Row
