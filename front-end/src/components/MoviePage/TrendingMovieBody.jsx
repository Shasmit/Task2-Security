import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { UserContext } from "../../context/UserContext";
import { TrendingMovie } from "./TrendingMovie";
import "./trendingStyles.css";

const TrendingMoviesBody = ({
  setActiveTab,
  movie,
  setMovie,
  movieDetails,
  setMovieDetails,
}) => {
  const { user } = useContext(UserContext);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:3001/movies/trending/", {
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

  console.log(trendingMovies);

  return (
    <div className="flex items-center h-[40vh] justify-center md:h-[100vh] cursor-pointer">
      {trendingMovies && trendingMovies.length > 0 ? ( // Add conditional check
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
                onClick={() => {
                  if (user) {
                    setActiveTab("movie details");
                    setMovie(movieData);
                  } else {
                    navigate("/please-login");
                  }
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center w-full">
          <div className="loader ease-linear rounded-full border-t-8 border-[#305973] h-32 w-32 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export { TrendingMoviesBody };

