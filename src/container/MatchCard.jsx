// MatchCard.js
import React from "react";

const MatchCard = ({ match, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white border shadow-md rounded-md p-2 md:p-3 lg:p-4 w-40 sm:w-35 md:w-44 lg:w-60 text-sm md:text-base text-center cursor-pointer hover:bg-gray-100"
  >
    <p className="font-medium">{match}</p>
  </div>
);

export default MatchCard;
