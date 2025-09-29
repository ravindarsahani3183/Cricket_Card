// BracketColumn.js
import React from "react";
import MatchCard from "./MatchCard";

const BracketColumn = ({ matches, onMatchClick }) => (
  <div className="flex flex-col">
    <div className="md:flex gap-6">
      {matches.map((match, index) => (
        <div key={index}>
          <MatchCard match={match} onClick={() => onMatchClick(match)} />
          <div className="flex justify-center">
            <div className="border-l border-gray-500 my-5 sm:my-0 sm:h-8 md:h-12 lg:h-16"></div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-center">
      <div className="border-t border-gray-500 sm:w-40 md:w-50 lg:w-66"></div>
    </div>
    <div className="flex justify-center">
      <div className="border-l border-gray-500 sm:h-8 md:h-12 lg:h-16"></div>
    </div>
  </div>
);

export default BracketColumn;
