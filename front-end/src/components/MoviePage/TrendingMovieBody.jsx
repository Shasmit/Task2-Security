import axios from "axios";
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


import { TrendingMovie } from "./TrendingMovie";
import "./trendingStyles.css";

const TrendingMoviesBody = ({ setActiveTab, movie, setMovie, movieDetails, setMovieDetails }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/movies/trending/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTrendingMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex items-center h-[40vh] justify-center md:h-[100vh] cursor-pointer">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwipers"
      >
        {trendingMovies.map((movieData) => (
          <SwiperSlide key={movieData.id} className="swiper-slide relative">
            <TrendingMovie
              imageUrl={movieData.backdrop_path}
              movieName={movieData.title}
              movieDetails={movieDetails}
              setMovieDetails={setMovieDetails}
              onClick= {() => {
                setActiveTab("movie details");
                setMovie(movieData);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { TrendingMoviesBody };

