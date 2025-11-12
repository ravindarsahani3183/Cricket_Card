import { useState } from "react"
import Toss from "./Toss"
import { FaTrophy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import tournament from '/src/assets/tournament.jpg';

function Tournament() {
  const [teams, setTeams] = useState([])
  const [input, setInput] = useState("")
  const [quarterFinals, setQuarterFinals] = useState([])
  const [semiFinals, setSemiFinals] = useState([])
  const [finals, setFinals] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [showCricketCards, setShowCricketCards] = useState(false)
  const [currentStage, setCurrentStage] = useState("setup") // setup, quarterfinals, semifinals, finals, champion
  const [quarterResults, setQuarterResults] = useState([])
  const [semiResults, setSemiResults] = useState([])
  const [champion, setChampion] = useState(null)
  const [showChampionPopup, setShowChampionPopup] = useState(false)

  const addTeam = () => {
    if (input.trim() !== "" && teams.length < 8) {
      setTeams([...teams, input.trim()])
      setInput("")
    }
  }

  const shuffleAndStart = () => {
    if (teams.length === 8) {
      const shuffled = [...teams].sort(() => Math.random() - 0.5)
      const quarter = [
        { id: 1, group: "A", team1: shuffled[0], team2: shuffled[1], stage: "quarterfinals" },
        { id: 2, group: "A", team1: shuffled[2], team2: shuffled[3], stage: "quarterfinals" },
        { id: 3, group: "B", team1: shuffled[4], team2: shuffled[5], stage: "quarterfinals" },
        { id: 4, group: "B", team1: shuffled[6], team2: shuffled[7], stage: "quarterfinals" },
      ]
      setQuarterFinals(quarter)
      setCurrentStage("quarterfinals")
    }
  }

  const handleMatchClick = (match) => {
    setSelectedMatch(match)
    setShowCricketCards(true)
  }

  const handleBackToTournament = () => {
    setSelectedMatch(null)
    setShowCricketCards(false)
  }

  const handleMatchComplete = (match, winner) => {
    if (match.stage === "quarterfinals") {
      const newResults = [...quarterResults, { matchId: match.id, winner }]
      setQuarterResults(newResults)

      // Check if all quarterfinals are complete
      if (newResults.length === 4) {
        // Create semifinals
        const semiMatches = [
          {
            id: 5,
            team1: newResults.find((r) => r.matchId === 1)?.winner,
            team2: newResults.find((r) => r.matchId === 2)?.winner,
            stage: "semifinals",
          },
          {
            id: 6,
            team1: newResults.find((r) => r.matchId === 3)?.winner,
            team2: newResults.find((r) => r.matchId === 4)?.winner,
            stage: "semifinals",
          },
        ]
        setSemiFinals(semiMatches)
        setCurrentStage("semifinals")
      }
    } else if (match.stage === "semifinals") {
      const newResults = [...semiResults, { matchId: match.id, winner }]
      setSemiResults(newResults)

      // Check if both semifinals are complete
      if (newResults.length === 2) {
        // Create final
        const finalMatch = [
          {
            id: 7,
            team1: newResults.find((r) => r.matchId === 5)?.winner,
            team2: newResults.find((r) => r.matchId === 6)?.winner,
            stage: "finals",
          },
        ]
        setFinals(finalMatch)
        setCurrentStage("finals")
      }
    } else if (match.stage === "finals") {
      setChampion(winner)
      setCurrentStage("champion")
      setShowChampionPopup(true)
    }

    handleBackToTournament()
  }

  const ChampionPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 relative overflow-hidden">
        {/* Animated background elements */}
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
          <h1 className="text-4xl font-bold text-white mb-2">🎉 CHAMPION! 🎉</h1>
          <h2 className="text-2xl font-semibold text-yellow-100 mb-4">{champion}</h2>
          <p className="text-white text-lg mb-6">Congratulations on winning the Cricket Tournament!</p>
          <div className="flex justify-center gap-4">
            {/* <button
              onClick={() => setShowChampionPopup(false)}
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Close
            </button> */}
            <button
              onClick={() => {
                // Reset tournament
                setTeams([])
                setQuarterFinals([])
                setSemiFinals([])
                setFinals([])
                setQuarterResults([])
                setSemiResults([])
                setChampion(null)
                setCurrentStage("setup")
                setShowChampionPopup(false)
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              New Tournament
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const getCurrentMatches = () => {
    switch (currentStage) {
      case "quarterfinals":
        return quarterFinals
      case "semifinals":
        return semiFinals
      case "finals":
        return finals
      default:
        return []
    }
  }

  const getStageTitle = () => {
    switch (currentStage) {
      case "quarterfinals":
        return "Quarter Finals"
      case "semifinals":
        return "Semi Finals"
      case "finals":
        return "Final"
      case "champion":
        return "Tournament Complete"
      default:
        return "Cricket Tournament"
    }
  }

  return (
    <div className="p-6 min-h-screen">
      {showChampionPopup && <ChampionPopup />}

      {showCricketCards && selectedMatch ? (
        <div>
          {/* <button
            onClick={handleBackToTournament}
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            ← Back to Tournament
          </button> */}
          <Toss
            match={selectedMatch}
            onMatchComplete={(winner) => handleMatchComplete(selectedMatch, winner)}
          />
        </div>
      ) : selectedMatch ? (
        <Toss
          match={selectedMatch}
          onBack={handleBackToTournament}
          onMatchComplete={(winner) => handleMatchComplete(selectedMatch, winner)}
        />
      ) : (
        <>
          <h2 className="text-lg md:text-3xl font-bold mb-2 text-start text-gray-800">{getStageTitle()}</h2>
          {currentStage === "setup" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 p-1 md:p-5 rounded-xl">
              {/* Rules / Image Section */}
              <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden items-center">
                <img
                  src={tournament}
                  alt="Tournament"
                  className="w-full h-full rounded-lg object-cover transition-transform duration-300 hover:scale-105 shadow-md"
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
                  Tournament
                </span>
              </div>

              {/* Tournament Setup Section */}
              <div className="flex flex-col lg:col-span-2 rounded-xl p-2">
                <h2 className="text-2xl font-bold text-green-900 mb-5">
                  Tournament Setup
                </h2>

                {/* Add Team Input */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Team Name"
                    className="border-2 border-green-600 w-full text-green-900 rounded-lg px-4 py-2 focus:border-green-800 focus:outline-none shadow-inner hover:shadow-md transition-shadow"
                  />
                  <button
                    onClick={addTeam}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    Add
                  </button>
                </div>

                {/* Teams List */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-green-900">
                    Teams ({teams.length}/8):
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

                {/* Start Tournament Button */}
                <div className="text-left">
                  <button
                    onClick={shuffleAndStart}
                    disabled={teams.length !== 8}
                    className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    Start Tournament
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  Tournament Rules
                </h3>
                <ul className="space-y-2 text-green-800 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    8 teams participate, but only four will qualify for the semifinals as the other four are knocked out of the competition.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                     4 teams participate in the semifinals, and 2 will qualify for the final; the other 2 are knocked out.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    In the last match, the victorious team will be awarded the tournament trophy
                  </li>
                </ul>
              </div>
            </div>
          )}

          {currentStage === "champion" && (
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-8 mb-6 mx-auto max-w-md">
                <FaTrophy className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Tournament Winner</h3>
                <h4 className="text-xl">{champion}</h4>
              </div>
            </div>
          )}

          {getCurrentMatches().length > 0 && currentStage !== "champion" && (
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getCurrentMatches().map((m, i) => {
                  const isCompleted =
                    (m.stage === "quarterfinals" && quarterResults.some((r) => r.matchId === m.id)) ||
                    (m.stage === "semifinals" && semiResults.some((r) => r.matchId === m.id))

                  return (
                    <div
                      key={i}
                      onClick={() => !isCompleted && handleMatchClick(m)}
                      className={`bg-white border-2 shadow-lg rounded-xl p-6 text-center transition-all transform ${isCompleted
                        ? "border-green-300 bg-green-50 cursor-default"
                        : "border-gray-200 cursor-pointer hover:shadow-xl hover:border-blue-300 hover:scale-105"
                        }`}
                    >
                      <div className="text-lg font-semibold text-gray-800">
                        {m.team1} <span className="text-blue-500 mx-2">vs</span> {m.team2}
                      </div>
                      {m.group && <div className="text-sm text-gray-500 mt-2">Group {m.group}</div>}
                      {isCompleted ? (
                        <div className="text-sm text-green-600 mt-2 font-semibold">
                          Winner:{" "}
                          {m.stage === "quarterfinals"
                            ? quarterResults.find((r) => r.matchId === m.id)?.winner
                            : semiResults.find((r) => r.matchId === m.id)?.winner}
                        </div>
                      ) : (
                        <div className="text-xs text-blue-600 mt-2">Click to play match</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Tournament