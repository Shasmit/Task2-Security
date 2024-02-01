import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewBody from "../components/MoviePage/ReviewBody";

export default function AllReviews() {
  const location = useLocation();
  const movieDetails = location.state?.movieDetails;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:3001/movies/${movieDetails.id}/reviews`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to handle liking/unliking a review
  const handleLikeUnlikeReview = async (reviewID, isLiked) => {
    try {
      const url = isLiked
        ? `https://localhost:3001/movies/${movieDetails.id}/reviews/${reviewID}/unlike`
        : `https://localhost:3001/movies/${movieDetails.id}/reviews/${reviewID}/like`;

      await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Fetch the updated reviews and set them in the component state
      const updatedReviewsResponse = await axios.get(
        `https://localhost:3001/movies/${movieDetails.id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReviews(updatedReviewsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-10 py-8">
      <div className="flex items-center mb-3">
        <div className="absolute top-3 left-3">
          <button
            className="bg-white p-3 rounded-full shadow-md"
            onClick={() => {
              window.history.back();
            }}
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>
      </div>

      {reviews.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm sm:text-base md:text-lg moviefonts">
            No reviews yet. Be the first one to write a review.
          </p>{" "}
        </div>
      ) : (
        reviews.data?.map((review) => (
          <ReviewBody
            key={review._id}
            user={review.user}
            review={review.review}
            rating={review.rating}
            likes={review.likes}
            isLiked={review.isLiked}
            onLikeUnlike={() =>
              handleLikeUnlikeReview(review._id, review.isLiked)
            }
          />
        ))
      )}
    </div>
  );
}
