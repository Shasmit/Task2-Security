import React from "react";

export const MovieLists = ({setActiveTab, movie, setMovie}) => {
  console.log(movie);
  return (
    <div className="flex flex-col gap-2 cursor-pointer" onClick={
      () => {
        setActiveTab("movie details");
        setMovie(movie.movieDetails);
      }
    }>
      <div className="bg-gray-300 h-[25vh] md:h-[25vh] min-w-[10vw] object-cover rounded-lg ">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.movieDetails.poster_path}`}
          alt="movie-img"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <p className="text-center py-1 mb-1 watchlistfonts text-[12px] md:text-sm font-semibold ">
        {movie.movieDetails.title}
      </p>
    </div>
  );
};
