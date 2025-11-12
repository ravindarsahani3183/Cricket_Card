import React from "react";
import { Link } from "react-router-dom";
import battle from '/src/assets/battle.jpg';
import tournament from '/src/assets/tournament.jpg';
import series from '/src/assets/series.jpg';
import Triseries from '/src/assets/Tri-series.jpg';
import { BsTrophy } from "react-icons/bs";
function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-5 md:px-0 pt-5 md:pt-10 mb-3 md:pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg ">
            <BsTrophy size={35} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 drop-shadow-lg">
            Cricket Card Game
          </h1>
        </div>
        <p className="text-gray-600 text-lg mt-2">
          Flip the cards — score runs, take wickets, and win!
        </p>
      </div>
      <div className="text-center mt-2 md:mt-4">
        <div className="flex justify-center flex-wrap gap-3 md:gap-8 pt-2">
          {/* Tournament */}
          <Link to="/tournament" className="relative group">
            <img
              src={tournament}
              alt="Tournament"
              className="w-40 h-40 sm:w-50 sm:h-50 md:w-60 md:h-60 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
              Tournament
            </span>
          </Link>

          {/* Series */}
          <Link to="/series" className="relative group">
            <img
              src={series}
              alt="Series"
              className="w-40 h-40 sm:w-50 sm:h-50 md:w-60 md:h-60 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
              Series
            </span>
          </Link>

          {/* 3 Player */}
          <Link to="/multiplePlayer" className="relative group">
            <img
              src={Triseries}
              alt="3 Player"
              className="w-40 h-40 sm:w-50 sm:h-50 md:w-60 md:h-60 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
              3 Player
            </span>
          </Link>

          {/* Extra */}
          <Link to="/battle" className="relative group">
            <img
              src={battle}
              alt="Battle"
              className="w-40 h-40 sm:w-50 sm:h-50 md:w-60 md:h-60 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
              Battle
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-md mx-5 sm:mx-10 md:mx-14 lg:mx-24 px-5 py-5 my-5">
        <h2 className="font-semibold text-lg">How to Play:</h2>
        <ul className="space-y-2 mt-4 px-3 list-disc list-inside">
          <li>Click on any card to flip it and see what you get</li>
          <li>Number cards (1, 2, 3, 4, 6) add runs to your score</li>
          <li>
            Out cards (Catch, Bowled, Run Out, Hit Wicket, LBW) cost you a
            wicket
          </li>
          <li>Game ends when you lose 10 wickets or run out of cards</li>
          <li>The match is limited to 5 overs.</li>
          <li>Try to score as many runs as possible!</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
