import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./otherStyles.css";

export const PopularMoviesBody = ({setActiveTab, setMovieId, setMovie}) => {
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [hoveredSlide, setHoveredSlide] = useState(null);

  const [popularMovies, setPopularMovies] = useState([]);

  // const handleMovieDetailsClick = ({}) => {
  //   setMovieId(popularMovies[hoveredSlide].id);
  //   setActiveTab("movie details");
  // };
  

  useEffect(() => {
    axios
      .get("http://localhost:3001/movies/popular/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopularMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesPerView(6);
      } else if (window.innerWidth >= 1024) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSlideMouseEnter = (index) => {
    setHoveredSlide(index);
  };

  const handleSlideMouseLeave = () => {
    setHoveredSlide(null);
  };

  return (
    <div className="h-[15vh] sm:h-[25vh]">
      <Swiper
        slidesPerView={slidesPerView}
        centeredSlides={false}
        spaceBetween={25}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {popularMovies.map((popularMovie, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col cursor-pointer"
            onMouseEnter={() => handleSlideMouseEnter(index)}
            onMouseLeave={handleSlideMouseLeave}
            onClick={
              () => {
                setActiveTab("movie details");
                setMovie(popularMovie);
              }
            }
          >
            <img src={`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`}  alt={popularMovie.text} className="bg-center" />
            <div
              className={`absolute bg-[#0000009a] top-0 w-full h-full rounded-[10px] flex items-center justify-center text-white transition-opacity duration-300 ${
                hoveredSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-center px-2 poppins font-medium text-[14px]">{popularMovie.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
