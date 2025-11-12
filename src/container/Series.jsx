import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import SeriesMatch from "./SeriesMatch";
import series from "/src/assets/series.jpg";

function Series() {
  const [teams, setTeams] = useState([]);
  const [input, setInput] = useState("");
  const [selectedMatches, setSelectedMatches] = useState(null);
  const [selectedMatchData, setSelectedMatchData] = useState(null);
  const [showMatchPlay, setShowMatchPlay] = useState(false);
  const [matchResults, setMatchResults] = useState([]);
  const [seriesWinner, setSeriesWinner] = useState(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const addHandle = () => {
    if (input.trim() !== "" && teams.length < 2) {
      setTeams([...teams, input.trim()]);
      setInput("");
    }
  };

  // ✅ Allow only the next unplayed match to open
  const handleMatchClick = (matchIndex) => {
    const isPlayed = matchResults.some((m) => m.matchNumber === matchIndex + 1);
    if (isPlayed || seriesWinner) return;

    const nextMatchNumber = matchResults.length + 1;
    if (matchIndex + 1 !== nextMatchNumber) return; // only next match clickable

    const matchData = {
      matchNumber: matchIndex + 1,
      team1: teams[0],
      team2: teams[1],
    };
    setSelectedMatchData(matchData);
    setShowMatchPlay(true);
  };

  const handleMatchComplete = (winner, result, matchNumber) => {
    setMatchResults((prev) => {
      const updated = prev.some((m) => m.matchNumber === matchNumber)
        ? prev.map((m) =>
          m.matchNumber === matchNumber ? { matchNumber, winner, result } : m
        )
        : [...prev, { matchNumber, winner, result }];

      const team1Wins = updated.filter((m) => m.winner === teams[0]).length;
      const team2Wins = updated.filter((m) => m.winner === teams[1]).length;
      const requiredWins = Math.ceil(selectedMatches / 2);

      if (team1Wins === requiredWins) {
        setSeriesWinner(teams[0]);
        setShowWinnerPopup(true);
      }
      if (team2Wins === requiredWins) {
        setSeriesWinner(teams[1]);
        setShowWinnerPopup(true);
      }

      return updated;
    });

    setShowMatchPlay(false);
  };

  const resetSeries = () => {
    setTeams([]);
    setSelectedMatches(null);
    setSelectedMatchData(null);
    setShowMatchPlay(false);
    setMatchResults([]);
    setSeriesWinner(null);
    setShowWinnerPopup(false);
  };

  return (
    <div className="p-3 md:p-6 min-h-screen">
      {!showMatchPlay && (
        <>
          <div>
            <h2 className="text-lg md:text-3xl mx-2 mb-2 md:mb-3 font-bold text-start text-green-900">
              Series Tournament
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mb-2 rounded-xl bg-green-10">
            <div className="relative flex flex-col col-span-1 bg-white rounded-xl shadow-lg overflow-hidden items-center">
              <img
                src={series}
                alt="series"
                className="w-full h-60 sm:h-90 md:h-110 lg:h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105 shadow-md"
              />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
                Series
              </span>
            </div>

            <div className="flex flex-col col-span-2 rounded-xl">
              <h2 className="text-lg md:text-2xl font-bold text-green-900 mb-3">
                Team Setup
              </h2>
              <div className="flex flex-col md:flex-row gap-3 mb-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter Team"
                  className="border-2 border-green-600 w-full text-green-900 rounded-lg px-4 py-2 focus:border-green-800 focus:outline-none shadow-inner hover:shadow-md transition-shadow"
                />
                <button
                  className="bg-green-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  onClick={addHandle}
                >
                  Add
                </button>
              </div>

              {/* Teams List */}
              <div className="mb-3">
                <h3 className="text-xl text-green-900 font-semibold mb-3 text-start">
                  Teams ({teams.length}/2):
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {teams.map((team, i) => (
                    <span
                      key={i}
                      className="bg-green-50 border-2 border-green-400 px-4 py-2 rounded-md shadow-md text-center font-medium text-green-900 hover:bg-green-100 cursor-pointer transition-colors"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Selection */}
              {teams.length === 2 && !seriesWinner && (
                <div className="mb-2">
                  <h3 className="text-lg text-green-900 font-semibold mb-3 text-start">
                    Select Series Matches:
                  </h3>
                  <div className="flex gap-3 justify-start">
                    {[3, 5].map((num) => (
                      <button
                        key={num}
                        className={`px-4 py-2 rounded-md border-2 cursor-pointer ${selectedMatches === num
                            ? "bg-gray-700 text-white border-gray-700"
                            : "border-gray-300 bg-white hover:bg-gray-100"
                          }`}
                        onClick={() => setSelectedMatches(num)}
                        disabled={!!selectedMatches}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-span-3">
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  Series Rules
                </h3>
                <ul className="space-y-2 text-green-800 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    In a 3-match series, the team that wins 2 or more matches
                    wins the series.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    In a 5-match series, the team that wins 3 or more matches
                    wins the series.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Match List */}
          {selectedMatches && (
            <div>
              <h3 className="text-xl text-green-900 font-semibold mb-3 text-start">
                {selectedMatches}-Match Series
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: selectedMatches }, (_, i) => {
                  const result = matchResults.find(
                    (m) => m.matchNumber === i + 1
                  );
                  const isPlayed = !!result;
                  const isNextMatch = matchResults.length + 1 === i + 1;

                  return (
                    <div
                      key={i}
                      onClick={() => handleMatchClick(i)}
                      className={`bg-white border border-green-700 shadow-lg rounded-xl p-6 text-center transition-all transform ${isPlayed || seriesWinner
                          ? "cursor-not-allowed opacity-70"
                          : isNextMatch
                            ? "cursor-pointer hover:border-blue-300 hover:shadow-xl hover:scale-105"
                            : "cursor-not-allowed opacity-50"
                        }`}
                    >
                      <div className="text-lg font-semibold text-green-800">
                        {teams[0]}{" "}
                        <span className="text-gray-500 mx-2">vs</span>
                        {teams[1]}
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Match {i + 1}
                      </div>

                      {result ? (
                        <div className="text-green-600 font-medium mt-2">
                          🏆 {result.winner}
                          <br />
                          <span className="text-gray-600 text-sm">
                            {result.result}
                          </span>
                        </div>
                      ) : isNextMatch ? (
                        <div className="text-xs text-green-600 mt-2">
                          Click to play match
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 mt-2">
                          🔒 Locked
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Match Play */}
      {showMatchPlay && selectedMatchData && (
        <SeriesMatch
          match={selectedMatchData}
          onMatchComplete={(winner, result) =>
            handleMatchComplete(winner, result, selectedMatchData.matchNumber)
          }
        />
      )}

      {/* Winner Popup */}
      {showWinnerPopup && seriesWinner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-400 via-sky-500 to-gray-500 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 animate-bounce">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-4 right-4 animate-bounce animation-delay-200">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 animate-bounce animation-delay-400">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-4 right-4 animate-bounce animation-delay-600">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="relative z-10">
              <div className="animate-pulse mb-4">
                <FaTrophy className="w-24 h-24 text-yellow-200 mx-auto" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                🎉 CHAMPION! 🎉
              </h1>
              <h2 className="text-2xl font-semibold text-yellow-100 mb-4">
                {seriesWinner}
              </h2>
              <p className="text-white text-lg mb-6">
                Congratulations on winning the Cricket Series!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={resetSeries}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  New Series
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Series;
