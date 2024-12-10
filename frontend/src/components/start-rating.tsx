import { Star } from "lucide-react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // Calificación (0-5)
}

export const StarRating = ({ rating }: StarRatingProps) => {
  const maxStars = 5;

  return (
    <div className="flex items-center  space-x-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <div key={index} className="flex items-center">
            <p className="ms-1  font-light text-yellow-200 dark:text-yellow-300 scale-150">
              {rating >= starValue - 0.2 ? (
                <FaStar />
              ) : rating >= starValue - 0.6 ? (
                <span className=" text-yellow-200 dark:text-yellow-300">
                  <FaStarHalfAlt />
                </span>
              ) : (
                <span className=" text-gray-400 dark:text-gray-400">
                  <Star className="size-4" />
                </span>
              )}
              {}
            </p>
          </div>
        );
      })}
      <div className="flex items-center justify-center">
        <p className="text-gray-400 dark:text-gray-400 text-center ml-2 text-xs">
          {rating} de {maxStars}
        </p>
      </div>
    </div>
  );
};
