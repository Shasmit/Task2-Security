import React, { useState } from "react";
import { MovieBody } from "../components/MoviePage/MovieBody";
import { MovieDetails } from "../components/MoviePage/MovieDetails";
import { ProfileBody } from "../components/ProfilePage/ProfileBody";
import { SearchBody } from "../components/SearchPage/SearchBody";
import { WatchlistBody } from "../components/WatchlistPage/WatchlistBody";
import Sidebar from "../components/common/Sidebar";

export default function MovieScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("movies");
  const [movieId, setMovieId] = useState(null);
  const [movie, setMovie] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderBodyContent = () => {
    switch (activeTab) {
      case "movies":
        return <MovieBody setActiveTab={handleTabChange}  movieId={movieId} setMovieId={setMovieId} movie={movie} setMovie={setMovie}  />;
      case "search":
        return <SearchBody setActiveTab={setActiveTab} setMovie={setMovie}/>;
      case "watchlist":
        return <WatchlistBody setActiveTab={handleTabChange} setMovie={setMovie} />;
      case "profile":
        return <ProfileBody />;
      case "movie details":
        return <MovieDetails movieId={movieId} movie={movie} setActiveTab={setActiveTab} setMovie={setMovie} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {renderBodyContent()}
    </div>
  );
}
