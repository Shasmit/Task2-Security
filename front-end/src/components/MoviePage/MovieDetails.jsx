import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CastBody } from "./CastBody";
import ReviewBody from "./ReviewBody";

export const MovieDetails = ({ movieId, movie, setActiveTab, setMovie }) => {
  // const [movieData, setMovieData] = useState([]);

  const [showAllCast, setShowAllCast] = useState(false);
  const maxToShow = 8; // Change this number to control how many cast names to show initially

  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState([]);
  const [isWatchlisted, setIsWatchlisted] = useState(false); // New state to track watchlist status

  useEffect(() => {
    axios
      .get(`http://localhost:3001/movies/${movie.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMovieDetails(response.data);
        setIsWatchlisted(movieDetails.data?.[0]?.isWatchListed); // Set watchlist status from response
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie.id, isWatchlisted]);

  console.log(movieDetails)

  // Function to handle adding/removing from watchlist
  const handleWatchlistToggle = async () => {
    try {
      if (isWatchlisted) {
        // Remove from watchlist
        await axios.delete(`http://localhost:3001/watchlist/${movie.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("removed from watchlist");
      } else {
        // Add to watchlist
        await axios.post(
          `http://localhost:3001/watchlist/${movie.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("added to watchlist");
      }
      setIsWatchlisted((prev) => !prev); // Toggle the watchlist status
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeUnlike = async (reviewID, isLiked) => {
    console.log(reviewID);
    try {
      const url = isLiked
        ? `http://localhost:3001/movies/${movieId}/reviews/${reviewID}/unlike`
        : `http://localhost:3001/movies/${movieId}/reviews/${reviewID}/like`;

      await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the movieDetails state with the updated like count and isLiked status
      setMovieDetails((prevMovieDetails) => {
        const updatedReviews = prevMovieDetails.data[0].topReviews.map(
          (review) => {
            if (review._id === reviewID) {
              return {
                ...review,
                likes: isLiked ? review.likes - 1 : review.likes + 1,
                isLiked: !isLiked,
              };
            }
            return review;
          }
        );

        return {
          data: [
            {
              ...prevMovieDetails.data[0],
              topReviews: updatedReviews,
            },
          ],
        };
      });

      console.log("liked");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = (reviewID) => {
    // Implement navigation to the WriteReviewPage with reviewID as a parameter
    // You can use the "navigate" function from react-router-dom for this
    navigate("/updateReview", {
      state: {
        movieDetails: movieDetails.data?.[0],
        reviewID: reviewID, // Pass the reviewID to the WriteReviewPage
      },
    });
  };

  // Function to delete a review
  const handleDeleteReview = async (reviewID) => {
    try {
      await axios.delete(
        `http://localhost:3001/movies/${movieId}/reviews/${reviewID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the movieDetails state to remove the deleted review
      setMovieDetails((prevMovieDetails) => {
        const updatedReviews = prevMovieDetails.data[0].topReviews.filter(
          (review) => review._id !== reviewID
        );

        return {
          data: [
            {
              ...prevMovieDetails.data[0],
              topReviews: updatedReviews,
            },
          ],
        };
      });

      console.log("Review deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img
        src={
          movieDetails.data?.[0]?.movie.backdrop_path == null
            ? "https://hips.hearstapps.com/hmg-prod/images/legacy-fre-image-placeholder-1641422577.png?crop=1.00xw:0.501xh;0,0.239xh&resize=1200:*"
            : `https://image.tmdb.org/t/p/w500/${movieDetails.data?.[0]?.movie.backdrop_path}`
        }
        alt=""
        className="object-cover h-[30vh] md:h-[50vh] w-full"
      />
      <div className="overlay absolute top-0 left-0 w-full h-[30vh] md:h-[50vh] bg-black opacity"></div>

      <div className="flex gap-7">
        <img
          src={
            movieDetails.data?.[0]?.movie.poster_path == null
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              : `https://image.tmdb.org/t/p/w500/${movieDetails.data?.[0]?.movie.poster_path}`
          }
          alt=""
          className="relative rounded-xl object-cover bottom-10 sm:bottom-14 md:bottom-20 left-[5%] h-[15vh] sm:h-[20vh]  md:h-[30vh] w-[20vw] sm:w-[15vw] md:w-[20vw] max-w-[180px] "
        />

        <div className="ml-[2%] sm:ml-[5%] mt-4 md:mt-6 mr-[4%] moviefonts w-full flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex gap-2 sm:gap-5 justify-center items-center">
              <h1 className="text-[17px] sm:text-2xl font-semibold ">
                {movieDetails.data?.[0]?.movie.title}
              </h1>
              <span className="text-xs sm:text-base">
                {movieDetails.data?.[0]?.movie.release_date}
              </span>
            </div>
            <div>
              {isWatchlisted ? (
                <FaBookmark
                  className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
                  onClick={handleWatchlistToggle}
                />
              ) : (
                <FaRegBookmark
                  className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
                  onClick={handleWatchlistToggle}
                />
              )}
              {/* {movieDetails.data?.[0]?.isWatchlisted ? (
                <FaBookmark className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6" onClick={handleWatchlistToggle}/>
              ) : (
                <FaRegBookmark className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6" onClick={handleWatchlistToggle}/>
              )} */}
              {/* <BiBookmark className="w-5 h-6 sm:w-6 sm:h-8" /> */}
            </div>
          </div>
          <div>
            <p className="text-justify text-[12px] sm:text-[14px] md:text-base">
              {movieDetails.data?.[0]?.movie.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col moviefonts ml-[16px] sm:ml-[60px] md:ml-[76px] gap-3">
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold">Cast</h1>
        <div className="mx-4 sm:mx-8 md:mx-11 flex flex-row flex-wrap gap-1">
          {showAllCast
            ? movieDetails.data?.[0]?.cast.map((cast) => (
                <CastBody key={cast.id} name={cast.name} />
              ))
            : movieDetails.data?.[0]?.cast
                .slice(0, maxToShow)
                .map((cast) => <CastBody key={cast.id} name={cast.name} />)}
          {movieDetails.data?.[0]?.cast.length > maxToShow && (
            <div
              className="rounded-md sm:rounded-lg  w-fit px-2 py-1 sm:px-2 sm:py-2 cursor-pointer"
              onClick={() => setShowAllCast((prev) => !prev)}
            >
              <h1 className="text-xs text-[#305973] sm:text-sm font-semibold">
                {showAllCast ? "See Less" : "See All"}
              </h1>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col moviefonts mt-10 ml-[16px] sm:ml-[60px] md:ml-[76px] gap-3">
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold">
          Popular Reviews
        </h1>

        {/* show top movies but if there are not any then show text */}

        {movieDetails.data?.[0]?.topReviews.length === 0 ? (
          <p className="text-sm sm:text-base md:text-lg">
            No reviews yet. Be the first one to write a review.
          </p>
        ) : (
          movieDetails.data?.[0]?.topReviews.map((review) => (
            <ReviewBody
              key={review.id}
              user={review.user}
              review={review.review}
              rating={review.rating}
              likes={review.likes}
              isLiked={review.isLiked}
              isUserLoggedIn={review.isUserLoggedIn}
              onLikeUnlike={() => handleLikeUnlike(review._id, review.isLiked)}
              onUpdateReview={() => handleUpdateReview(review._id)}
              onDeleteReview={() => handleDeleteReview(review._id)}
            />
          ))
        )}

        <div className="flex flex-col gap-3">
          <button
            className="text-sm sm:text-base md:text-lg"
            onClick={() => {
              navigate("/allReviews", {
                state: {
                  movieDetails: movieDetails.data?.[0],
                },
              });
            }}
          >
            All Reviews
          </button>
          <div className="border-b-[#305973] border-b-2 mb-2"></div>
        </div>
      </div>

      <div className="flex flex-col moviefonts mt-10 ml-[16px] sm:ml-[60px] md:ml-[76px] gap-3">
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold mb-2">
          Similar Movies
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-5 md:justify-start px-3">
          {movieDetails.data?.[0]?.similarMovies.slice(0, 6).map((movie) => (
            <div
              className="cursor-pointer rounded-md bg-blue-600 w-28 sm:h-40 sm:w-40 raila"
              onClick={() => {
                setActiveTab("movie details");
                setMovie(movie);
              }}
            >
              <img
                src={
                  movie.poster_path == null
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        <div>
          <div className="fixed bottom-3 right-3">
            <button
              className="floating-button bg-[#08BA0C] text-white rounded-[50%] p-3 sm:p-4 md:p-6"
              onClick={() => {
                navigate("/writeReviews", {
                  state: {
                    movieDetails: movieDetails.data?.[0],
                  },
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.883 3.007L12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
