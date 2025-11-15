import { useRef, useState } from "react";
import Toss from "./Toss";
import { FaTrophy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Triseries from '/src/assets/Tri-series.jpg';
import celebrationSound from "/src/assets/celebration.mp3";
function MultiplePlayer() {
  const [teams, setTeams] = useState([]);
  const [input, setInput] = useState("");
  const [semiFinal, setSemiFinal] = useState(null);
  const [finalMatch, setFinalMatch] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showCricketCards, setShowCricketCards] = useState(false);
  const [semiResult, setSemiResult] = useState(null);
  const [champion, setChampion] = useState(null);
  const [showChampionPopup, setShowChampionPopup] = useState(false);

  const celebrationAudio = useRef(new Audio(celebrationSound));

  const addTeam = () => {
    if (input.trim() !== "" && teams.length < 3) {
      setTeams([...teams, input.trim()]);
      setInput("");
    }
  };

  const shuffleAndStart = () => {
    if (teams.length === 3) {
      const shuffled = [...teams].sort(() => Math.random() - 0.5);
      const randomIndex = Math.floor(Math.random() * 3);
      const finalTeam = shuffled[randomIndex];
      const semiTeams = shuffled.filter((_, i) => i !== randomIndex);

      setSemiFinal({
        id: 1,
        team1: semiTeams[0],
        team2: semiTeams[1],
        stage: "semifinal",
      });
      setFinalMatch({
        id: 2,
        team1: null,
        team2: finalTeam,
        stage: "final",
      });
    }
  };

  const handleMatchClick = (match) => {
    // Prevent re-clicking a completed match
    if (match.stage === "semifinal" && semiResult) return;
    if (match.stage === "final" && champion) return;

    setSelectedMatch(match);
    setShowCricketCards(true);
  };

  const handleBackToTournament = () => {
    setSelectedMatch(null);
    setShowCricketCards(false);
  };

  const handleMatchComplete = (match, winner) => {
    if (match.stage === "semifinal") {
      setSemiResult(winner);
      setFinalMatch((prev) => ({
        ...prev,
        team1: winner,
      }));
    } else if (match.stage === "final") {
      setChampion(winner);
      setShowChampionPopup(true);
      celebrationAudio.current.play().catch(() => { });
    }
    handleBackToTournament();
  };

  const ChampionPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[0, 200, 400, 600].map((delay, i) => (
            <HiSparkles
              key={i}
              className="absolute w-6 h-6 text-white animate-bounce"
              style={{
                top: i < 2 ? "1rem" : "auto",
                bottom: i >= 2 ? "1rem" : "auto",
                left: i % 2 === 0 ? "1rem" : "auto",
                right: i % 2 === 1 ? "1rem" : "auto",
                animationDelay: `${delay}ms`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <FaTrophy className="w-24 h-24 text-yellow-200 mx-auto animate-pulse mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">🎉 CHAMPION! 🎉</h1>
          <h2 className="text-2xl font-semibold text-yellow-100 mb-4">{champion}</h2>
          <p className="text-white text-lg mb-6">
            Congratulations on winning the Cricket Tournament!
          </p>
          <button
            onClick={() => {
              setTeams([]);
              setSemiFinal(null);
              setFinalMatch(null);
              setSemiResult(null);
              setChampion(null);
              setShowChampionPopup(false);
              celebrationAudio.current.pause();
                celebrationAudio.current.currentTime = 0;
            }}
            className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            New Tournament
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-3 md:p-6 min-h-screen">
      {showChampionPopup && <ChampionPopup />}

      {showCricketCards && selectedMatch ? (
        <Toss
          match={selectedMatch}
          onMatchComplete={(winner) => handleMatchComplete(selectedMatch, winner)}
        />
      ) : (
        <>
          <h2 className="text-lg md:text-3xl font-bold mx-2 mb-1 text-start text-green-800">
            3-Team Cricket Tournament
          </h2>

          {/* Setup Section */}
          {!semiFinal && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 p-2 md:p-4 rounded-xl">
                <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden items-center">
                  <img
                    src={Triseries}
                    alt="3 palyer"
                    className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105 shadow-md"
                  />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
                    3 Player
                  </span>
                </div>
                <div className="flex flex-col md:col-span-2 rounded-xl">
                  <h2 className="text-lg md:text-2xl font-bold text-green-900 md:text-left mb-3">
                    Team Setup
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter Team Name"
                      className="border-2 border-green-600 w-full text-green-900 rounded-lg px-4 py-2 focus:border-green-800 focus:outline-none shadow-inner hover:shadow-md transition-shadow w-full flex-grow"
                    />
                    <button
                      onClick={addTeam}
                      className="bg-green-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-medium"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mb-3 md:mb-5">
                    <h3 className="text-xl text-green-700 font-semibold mb-3 text-start">
                      Teams ({teams.length}/3):
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                  <div className="text-start mb-3">
                    <button
                      onClick={shuffleAndStart}
                      disabled={teams.length !== 3}
                      className="bg-green-500 text-white px-8 py-2 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Tournament
                    </button>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 mt-2">
                  <h3 className="text-lg md:text-xl font-bold text-green-900 mb-3">3 Player Rules</h3>
                  <ul className="space-y-2 text-green-800 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      There are 3 teams in total.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      One team automatically advances to the final.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      The remaining two teams play in the semifinal.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      The winner of the semifinal advances to the final to face the team that got a direct entry.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      After that, the winner of the final match collects the tournament trophy.
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* Semi Final */}
          {semiFinal && (
            <div className="mt-2 md:mt-5 mx-2">
              <h3 className="text-2xl font-semibold text-green-800 mb-3 text-start">
                Semi Final
              </h3>
              <div
                onClick={() => handleMatchClick(semiFinal)}
                className={`bg-white border border-green-500 shadow-lg rounded-xl p-6 text-center transition-all transform ${semiResult
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer hover:shadow-xl hover:border-blue-300"
                  }`}
              >
                <div className="text-lg font-semibold text-green-800">
                  {semiFinal.team1}{" "}
                  <span className="text-blue-500 mx-2">vs</span> {semiFinal.team2}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  {semiResult
                    ? `Winner: ${semiResult}`
                    : "Click to play match"}
                </div>
              </div>
            </div>
          )}

          {/* Final Match */}
          {finalMatch && (
            <div className="mt-5 mx-2">
              <h3 className="text-2xl font-semibold text-green-800 mb-3 text-start">
                Final Match
              </h3>
              <div
                onClick={() => {
                  if (semiResult && finalMatch.team1) {
                    handleMatchClick(finalMatch);
                  }
                }}
                className={`bg-white border border-green-500 shadow-lg rounded-xl p-6 text-center transition-all transform ${semiResult && finalMatch.team1
                  ? "cursor-pointer hover:shadow-xl hover:border-blue-300"
                  : "opacity-50 cursor-not-allowed"
                  }`}
              >
                <div className="text-lg font-semibold text-green-800">
                  {finalMatch.team1 || "Winner of Semi Final"}{" "}
                  <span className="text-blue-500 mx-2">vs</span> {finalMatch.team2}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  {semiResult && finalMatch.team1
                    ? "Click to play Final"
                    : "Waiting for Semi Final winner..."}
                </div>
              </div>

            </div>
          )}

          {/* Champion */}
          {champion && (
            <div className="text-center mt-10">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-8 mb-6 mx-auto max-w-md">
                <FaTrophy className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Tournament Winner</h3>
                <h4 className="text-xl">{champion}</h4>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MultiplePlayer;
