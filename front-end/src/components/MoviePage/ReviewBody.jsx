import React, { useContext, useState } from "react";
import { FaEdit, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const remainingStar = rating - filledStars;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push(true);
    } else if (i === filledStars && remainingStar >= 0.5) {
      stars.push(true);
    } else {
      stars.push(false);
    }
  }

  return (
    <div className="flex py-1">
      {stars.map((star, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={star ? "#34D399" : "#D1D5DB"}
          viewBox="0 0 24 24"
          className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] md:h-4 md:w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2L8 8l-6 1 4.5 4.5L6 20l6-3 6 3-1.5-6.5L22 9l-6-1z"
          />
        </svg>
      ))}
    </div>
  );
};

export default function ReviewBody({
  user,
  review,
  rating,
  likes,
  isLiked,
  onLikeUnlike,
  isUserLoggedIn,
  onUpdateReview,
  onDeleteReview,
}) {
  const [likeCount, setLikeCount] = useState(likes.length); // Local state to keep track of like count
  const [liked, setLiked] = useState(isLiked); // Local state to keep track of like status
  const {user: currentUser} = useContext(UserContext)

  const handleHeartClick = async () => {
    try {
      await onLikeUnlike();
      // Update local state after a successful API call
      setLiked((prevLiked) => !prevLiked);
      setLikeCount((prevLikeCount) =>
        liked ? prevLikeCount - 1 : prevLikeCount + 1
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = () => {
    onUpdateReview(); // Call the onUpdateReview function when the "Update" icon is clicked
  };

  const handleTrashClick = async () => {
    try {
      // Make the API call to delete the review
      await onDeleteReview();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col mx-6 my-2 ">
      <div className="flex flex-row justify-between mr-10">
        <div className="flex flex-row">
          <img
            src={
              user.image == null
                ? "https://img.freepik.com/free-icon/user_318-159711.jpg"
                : `http://localhost:3001/uploads/${user.image}`
            }
            alt=""
            className="h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px] object-cover rounded-[50%]"
          />
          <div className="flex flex-col px-4 py-2 gap-1">
            <div className="flex flex-row moviefonts items-center gap-2 sm:gap-3 md:gap-4">
              <p className="text-[13px] sm:text-[15px] md:text-base">
                Review by <span className="font-semibold">{user.username}</span>
              </p>
              <div className="flex py-1">
                <RatingStars rating={rating} />
              </div>
              {isUserLoggedIn && (
                <div className="flex items-center ml-5 gap-3 sm:gap-6">
                  <FaEdit
                    className="cursor-pointer text-[#305973] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    onClick={handleUpdateClick}
                  />
                  <FaTrash
                    className="cursor-pointer text-[#305973] w-3 h-3  sm:w-4 sm:h-4 md:w-5 md:h-5"
                    onClick={handleTrashClick}
                  />
                </div>
              )}

              {
                currentUser?.user[0]?.userType === "admin" && (
                  <div className="flex items-center ml-5 gap-3 sm:gap-6">
                  <FaTrash
                    className="cursor-pointer text-[#305973] w-3 h-3  sm:w-4 sm:h-4 md:w-5 md:h-5"
                    onClick={handleTrashClick}
                  />
                </div>
                )
              }
            </div>
            <p className="text-sm sm:text-base md:text-lg py-2">{review}</p>
            <div className="flex flex-row items-center text-center gap-2">
              {liked ? (
                <FaHeart
                  className="cursor-pointer text-[#305973]  w-4 h-4 sm:w-5 sm:h-5"
                  onClick={handleHeartClick}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer  w-4 h-4 sm:w-5 sm:h-5"
                  onClick={handleHeartClick}
                />
              )}
              <p className="text-xs sm:text-sm">{likeCount} Likes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[#305973] border-b-2 mr-2 sm:mr-8"></div>
    </div>
  );
}
