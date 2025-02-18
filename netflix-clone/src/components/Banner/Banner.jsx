import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import './banner.css';

const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request.data);
                setMovie(request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    return (
        <div
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button" onClick={() => console.log("Play movie")}>
                        Play
                    </button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner_fadeButton" />
        </div>
    );
};

export default Banner;
