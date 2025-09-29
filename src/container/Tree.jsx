
import React from 'react';

const Tree = () => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex  gap-6">
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
      </div>
      <h2 className="text-xl font-bold">Semi Final</h2>
      <div className="flex items-center justify-center gap-6">
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
      </div>
      <h2 className="text-xl font-bold">Final</h2>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="bg-white border shadow-md rounded-md p-4 w-60 text-center">
          <p className="font-medium">Rahul vs Ravi</p>
          <p className="text-green-600 text-sm mt-2">Winner</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Quarter Final</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-1 gap-4 mt-5">
            {
              matches.map((m, i) => (
                <div
                  key={i}
                  className="bg-white border shadow-md rounded-md p-4 w-48 text-center"
                >
                  <p>{m.team1} vs {m.teams2}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;


// import { useState, useRef, useEffect } from "react"

// function Toss({ match, onMatchComplete }) {
//   console.log(match)
//   const cardTypes = [
//     { id: 1, label: "0", value: 0, type: "run", isFlipped: false },
//     { id: 2, label: "1", value: 1, type: "run", isFlipped: false },
//     { id: 3, label: "2", value: 2, type: "run", isFlipped: false },
//     { id: 4, label: "3", value: 3, type: "run", isFlipped: false },
//     { id: 5, label: "4", value: 4, type: "run", isFlipped: false, isSpecial: true },
//     { id: 6, label: "6", value: 6, type: "run", isFlipped: false, isSpecial: true },
//     { id: 7, label: "Wide", value: 1, type: "extra", isFlipped: false },
//     { id: 8, label: "No Ball", value: 1, type: "extra", isFlipped: false },
//     { id: 9, label: "0 Run", value: 0, type: "run", isFlipped: false },
//     { id: 10, label: "1 Run", value: 1, type: "run", isFlipped: false },
//     { id: 11, label: "4 Run", value: 4, type: "run", isFlipped: false, isSpecial: true },
//     { id: 12, label: "2 Run", value: 2, type: "run", isFlipped: false },
//     { id: 13, label: "1 Run", value: 1, type: "run", isFlipped: false },
//     { id: 14, label: "0 Run", value: 0, type: "run", isFlipped: false },
//     { id: 15, label: "6 Run", value: 6, type: "run", isFlipped: false, isSpecial: true },
//     { id: 16, label: "4 Run", value: 4, type: "run", isFlipped: false, isSpecial: true },
//     { id: 17, label: "6 Run", value: 6, type: "run", isFlipped: false, isSpecial: true },
//     { id: 18, label: "4 Run", value: 4, type: "run", isFlipped: false, isSpecial: true },
//     { id: 19, label: "Catch Out", value: 1, type: "wicket", isFlipped: false, isSpecial: true },
//     { id: 20, label: "Bowled Out", value: 1, type: "wicket", isFlipped: false, isSpecial: true },
//     { id: 21, label: "Run Out", value: 1, type: "wicket", isFlipped: false, isSpecial: true },
//     { id: 22, label: "Hit Wicket", value: 1, type: "wicket", isFlipped: false, isSpecial: true },
//     { id: 23, label: "LBW Out", value: 1, type: "wicket", isFlipped: false, isSpecial: true },
//     { id: 24, label: "Stumped Out", value: 1, type: "wicket", isFlipped: false, isSpecial: true },
//   ]

//   const [card, setCard] = useState(cardTypes)
//   const [score, setScore] = useState({ runs: 0, wickets: 0, balls: 0, overs: 0 })
//   const [flippedId, setFlippedId] = useState(null)
//   const [celebrationCard, setCelebrationCard] = useState(null)
//   const [showFireworks, setShowFireworks] = useState(false)

//   const [team, setTeam] = useState([match?.team1 || "Team A", match?.team2 || "Team B"])
//   const [tossWinningTeam, setTossWinningTeam] = useState("")
//   const [tossLosserTeam, setTossLosserTeam] = useState("")
//   const [tossWinnerStatus, setTossWinnerStatus] = useState("")
//   const [tossDone, setTossDone] = useState(false)
//   const [choose, setChoose] = useState("")
//   const [gameStarted, setGameStarted] = useState(false)
//   const [gameOver, setGameOver] = useState(false)

//   const [firstInningsOver, setFirstInningsOver] = useState(false)
//   const [team1Score, setTeam1Score] = useState(null)
//   const [chasing, setChasing] = useState(false)
//   const [matchResult, setMatchResult] = useState(null)

//   const sixAudioRef = useRef(null)
//   const fourAudioRef = useRef(null)
//   const wicketAudioRef = useRef(null)
//   const crowdCheerRef = useRef(null)

//   useEffect(() => {
//     // Create audio elements programmatically since we can't use external files
//     const createAudioContext = () => {
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)()
//       return audioContext
//     }

//     // Simple beep sound generator
//     const playBeep = (frequency, duration, type = "sine") => {
//       try {
//         const audioContext = createAudioContext()
//         const oscillator = audioContext.createOscillator()
//         const gainNode = audioContext.createGain()

//         oscillator.connect(gainNode)
//         gainNode.connect(audioContext.destination)

//         oscillator.frequency.value = frequency
//         oscillator.type = type

//         gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
//         gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

//         oscillator.start(audioContext.currentTime)
//         oscillator.stop(audioContext.currentTime + duration)
//       } catch (error) {
//         console.log("Audio not supported")
//       }
//     }

//     sixAudioRef.current = () => playBeep(800, 0.5, "square")
//     fourAudioRef.current = () => playBeep(600, 0.4, "sawtooth")
//     wicketAudioRef.current = () => playBeep(300, 0.6, "triangle")
//     crowdCheerRef.current = () => {
//       playBeep(400, 0.2)
//       setTimeout(() => playBeep(500, 0.2), 100)
//       setTimeout(() => playBeep(600, 0.2), 200)
//     }
//   }, [])

//   const toss = () => {
//     if (!team[0] || !team[1]) {
//       alert("Please enter both team names before the toss!")
//       return
//     }
//     const tossWinner = Math.random() < 0.5 ? team[0] : team[1]
//     const tossLoser = tossWinner === team[0] ? team[1] : team[0]
//     setTossWinningTeam(tossWinner)
//     setTossLosserTeam(tossLoser)
//     setTossWinnerStatus(tossWinner)
//     setTossDone(true)
//   }

//   const handleChoose = (select) => {
//     setChoose(select)
//     if (select === "batting") {
//       setTossWinningTeam(tossWinningTeam)
//       setTossLosserTeam(tossLosserTeam)
//     } else if (select === "bowling") {
//       setTossWinningTeam(tossLosserTeam)
//       setTossLosserTeam(tossWinningTeam)
//     }
//   }

//   const shuffledCards = (array) => {
//     return [...array].sort(() => Math.random() - 0.5)
//   }

//   const handleCards = (item) => {
//     if (gameOver) return

//     // Play sound effects based on card type
//     if (item.isSpecial) {
//       if (item.type === "wicket") {
//         wicketAudioRef.current?.()
//       } else if (item.value === 6) {
//         sixAudioRef.current?.()
//         setShowFireworks(true)
//         setTimeout(() => setShowFireworks(false), 2000)
//       } else if (item.value === 4) {
//         fourAudioRef.current?.()
//       }

//       // Set celebration animation
//       setCelebrationCard(item.id)
//       setTimeout(() => setCelebrationCard(null), 1500)
//     }

//     setScore((prev) => {
//       let newRun = prev.runs
//       let newWicket = prev.wickets
//       let newBall = prev.balls
//       let newOver = prev.overs

//       if (item.type === "run") {
//         newRun += item.value
//         newBall += 1
//       } else if (item.type === "wicket") {
//         newWicket += 1
//         newBall += 1
//       } else if (item.type === "extra") {
//         newRun += item.value
//       }

//       if (newBall >= 6) {
//         newOver += Math.floor(newBall / 6)
//         newBall = newBall % 6
//       }

//       let isGameOver = false
//       let newMatchResult = null
//       let winner = null

//       if (firstInningsOver && chasing) {
//         const target = team1Score.runs + 1
//         if (newRun >= target) {
//           isGameOver = true
//           winner = tossLosserTeam
//           newMatchResult = `${tossLosserTeam} wins by ${10 - newWicket} wicket(s)`
//           crowdCheerRef.current?.()
//         }
//       }

//       if (!isGameOver) {
//         if (newWicket >= 10 || newOver >= 5) {
//           if (!firstInningsOver) {
//             setFirstInningsOver(true)
//             setTeam1Score({ runs: newRun, wickets: newWicket, overs: newOver, balls: newBall })
//             newRun = 0
//             newWicket = 0
//             newBall = 0
//             newOver = 0
//             setChasing(true)
//             alert(`${tossWinningTeam}'s innings is over. Now it's the other team's turn to bat.`)
//             setTossWinningTeam((prevT) => (prevT === team[0] ? team[1] : team[0]))
//           } else {
//             isGameOver = true
//             const target = team1Score.runs
//             if (newRun > target) {
//               winner = tossLosserTeam
//               newMatchResult = `${tossLosserTeam} wins by ${10 - newWicket} wicket(s)`
//             } else if (newRun === target) {
//               newMatchResult = `Match tied!`
//               winner = "Tie" // Handle tie case
//             } else {
//               winner = tossWinningTeam
//               newMatchResult = `${tossWinningTeam} wins by ${target - newRun} runs`
//             }
//             crowdCheerRef.current?.()
//           }
//         }
//       }

//       if (isGameOver && newMatchResult) {
//         setMatchResult(newMatchResult)
//         if (onMatchComplete && winner) {
//           setTimeout(() => {
//             onMatchComplete(winner)
//           }, 3000) // Give time to see the result before progressing
//         }
//       }

//       setGameOver(isGameOver)

//       return { runs: newRun, wickets: newWicket, balls: newBall, overs: newOver }
//     })

//     setFlippedId(item.id)
//     setTimeout(() => {
//       setCard(shuffledCards(card))
//       setFlippedId(null)
//     }, 3000)
//   }

//   const restart = () => {
//     setScore({ runs: 0, wickets: 0, balls: 0, overs: 0 })
//     setCard(shuffledCards(card))
//     setFlippedId(null)
//     setGameOver(false)
//     setGameStarted(false)
//     setTossDone(false)
//     setTossWinningTeam("")
//     setTossLosserTeam("")
//     setFirstInningsOver(false)
//     setTeam1Score(null)
//     setChasing(false)
//     setMatchResult(null)
//     setChoose("")
//     setCelebrationCard(null)
//     setShowFireworks(false)
//   }

//   return (
//     <div className="relative">
//       {showFireworks && (
//         <div className="fixed inset-0 pointer-events-none z-50">
//           <div className="absolute top-1/4 left-1/4 animate-ping">
//             <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
//           </div>
//           <div className="absolute top-1/3 right-1/4 animate-ping animation-delay-200">
//             <div className="w-6 h-6 bg-red-400 rounded-full"></div>
//           </div>
//           <div className="absolute top-1/2 left-1/2 animate-ping animation-delay-400">
//             <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
//           </div>
//           <div className="absolute top-1/4 right-1/3 animate-ping animation-delay-600">
//             <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//           </div>
//         </div>
//       )}

//       {gameStarted ? (
//         <>
//           {firstInningsOver && !gameOver && (
//             <div className="text-center my-5 bg-blue-50 p-4 rounded shadow-md mx-24">
//               <h2 className="text-xl font-bold">{tossLosserTeam} is now chasing</h2>
//               <p>Target: {team1Score?.runs + 1} runs</p>
//             </div>
//           )}
//           {gameOver && matchResult && (
//             <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 text-white rounded-lg p-6 mb-6 mx-24 text-center shadow-lg">
//               <h2 className="text-3xl font-bold mb-2"> Game Over!</h2>
//               <p className="text-xl mb-2">
//                 Final Score: {score.runs}/{score.wickets} in {score.overs}.{score.balls} overs
//               </p>
//               <h3 className="text-2xl font-semibold mt-2">{matchResult}</h3>

//               <button onClick={restart} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md">
//                 Restart Game
//               </button>
//             </div>
//           )}
//           <div className="flex justify-center gap-4 my-5">
//             <div className="rounded-md shadow-2xl py-3 w-64 flex flex-col items-center bg-white">
//               <h2 className="text-xl font-bold ">{score.runs}</h2>
//               <p>Total Run</p>
//             </div>
//             <div className="rounded-md shadow-2xl py-3 w-64 flex flex-col items-center bg-white">
//               <h2 className="text-xl font-bold ">{score.wickets}</h2>
//               <p>Wicket</p>
//             </div>
//             <div className="rounded-md shadow-2xl py-3 w-64 flex flex-col items-center bg-white">
//               <h2 className="text-xl font-bold ">{score.balls}</h2>
//               <p>Current Balls</p>
//             </div>
//             <div className="rounded-md shadow-2xl px-5 py-3 w-64 flex flex-col items-center bg-white">
//               <h2 className="text-xl font-bold ">
//                 {score.overs}.{score.balls}
//               </h2>
//               <p>Overs</p>
//             </div>
//           </div>
//           <div className="grid md:grid-cols-8 gap-5 px-24 mt-5">
//             {card.map((item) => (
//               <div key={item.id} className="flex justify-center items-center" onClick={() => handleCards(item)}>
//                 <div
//                   className={`rounded-md shadow-2xl w-32 h-32 flex flex-col justify-center items-center text-white cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                     celebrationCard === item.id ? "animate-bounce scale-125 shadow-2xl" : ""
//                   } ${
//                     item.type === "wicket"
//                       ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
//                       : item.value === 6
//                         ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
//                         : item.value === 4
//                           ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
//                           : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
//                   }`}
//                 >
//                   {celebrationCard === item.id && (
//                     <div className="absolute -top-2 -right-2 text-2xl ">
//                       {item.type === "wicket" ? "💥" : item.value === 6 ? "🎆" : "✨"}
//                     </div>
//                   )}
//                   <span className="text-4xl">
//                     {flippedId === item.id ? (
//                       <div className="text-center">
//                         <div className="text-lg font-bold">{item.label}</div>
//                         {item.type === "wicket" && <div className="text-sm">💀</div>}
//                         {item.value === 6 && <div className="text-sm">🚀</div>}
//                         {item.value === 4 && <div className="text-sm">⚡</div>}
//                       </div>
//                     ) : (
//                       <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
//                         <span className="text-2xl">🏏</span>
//                       </div>
//                     )}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="text-center p-8">
//           {team.map((teamName, index) => (
//             <h2 key={index} className="text-2xl font-bold mb-2">
//               {teamName}
//             </h2>
//           ))}
//           <button
//             className="bg-blue-500 rounded-md px-6 py-3 cursor-pointer text-white font-semibold hover:bg-blue-600 transition-colors"
//             onClick={toss}
//           >
//             Toss
//           </button>
//           <div className="mt-4 text-lg">{tossWinningTeam && `Winner: ${tossWinningTeam}`}</div>
//           {tossDone && (
//             <>
//               <div className="py-5">
//                 <p className="text-lg font-semibold text-green-600">{tossWinnerStatus} won the toss!</p>
//                 <p className="mb-4">Choose to bat or bowl first:</p>
//                 <div className="flex gap-5 my-5 justify-center">
//                   <button
//                     className="bg-gray-500 rounded-md px-5 py-2 text-white cursor-pointer hover:bg-green-500 transition-colors"
//                     onClick={() => handleChoose("batting")}
//                   >
//                     Batting
//                   </button>
//                   <button
//                     className="bg-gray-500 rounded-md px-5 py-2 text-white cursor-pointer hover:bg-green-500 transition-colors"
//                     onClick={() => handleChoose("bowling")}
//                   >
//                     Bowling
//                   </button>
//                 </div>
//                 {choose && (
//                   <p className="mb-4">
//                     {tossWinnerStatus} selected to {choose === "batting" ? "bat" : "bowl"} first
//                   </p>
//                 )}
//                 <button
//                   onClick={() => setGameStarted(true)}
//                   className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors font-semibold"
//                 >
//                   Start Match
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Toss

// import { useState } from "react"
// import Toss from "./Toss"
// import { FaTrophy } from "react-icons/fa";
// import { HiSparkles } from "react-icons/hi";

// function Tournament() {
//   const [teams, setTeams] = useState([])
//   const [input, setInput] = useState("")
//   const [quarterFinals, setQuarterFinals] = useState([])
//   const [semiFinals, setSemiFinals] = useState([])
//   const [finals, setFinals] = useState([])
//   const [selectedMatch, setSelectedMatch] = useState(null)
//   const [showCricketCards, setShowCricketCards] = useState(false)
//   const [currentStage, setCurrentStage] = useState("setup") // setup, quarterfinals, semifinals, finals, champion
//   const [quarterResults, setQuarterResults] = useState([])
//   const [semiResults, setSemiResults] = useState([])
//   const [champion, setChampion] = useState(null)
//   const [showChampionPopup, setShowChampionPopup] = useState(false)

//   const addTeam = () => {
//     if (input.trim() !== "" && teams.length < 8) {
//       setTeams([...teams, input.trim()])
//       setInput("")
//     }
//   }

//   const shuffleAndStart = () => {
//     if (teams.length === 8) {
//       const shuffled = [...teams].sort(() => Math.random() - 0.5)
//       const quarter = [
//         { id: 1, group: "A", team1: shuffled[0], team2: shuffled[1], stage: "quarterfinals" },
//         { id: 2, group: "A", team1: shuffled[2], team2: shuffled[3], stage: "quarterfinals" },
//         { id: 3, group: "B", team1: shuffled[4], team2: shuffled[5], stage: "quarterfinals" },
//         { id: 4, group: "B", team1: shuffled[6], team2: shuffled[7], stage: "quarterfinals" },
//       ]
//       setQuarterFinals(quarter)
//       setCurrentStage("quarterfinals")
//     }
//   }

//   const handleMatchClick = (match) => {
//     setSelectedMatch(match)
//     setShowCricketCards(true)
//   }

//   const handleBackToTournament = () => {
//     setSelectedMatch(null)
//     setShowCricketCards(false)
//   }

//   const handleMatchComplete = (match, winner) => {
//     if (match.stage === "quarterfinals") {
//       const newResults = [...quarterResults, { matchId: match.id, winner }]
//       setQuarterResults(newResults)

//       // Check if all quarterfinals are complete
//       if (newResults.length === 4) {
//         // Create semifinals
//         const semiMatches = [
//           {
//             id: 5,
//             team1: newResults.find((r) => r.matchId === 1)?.winner,
//             team2: newResults.find((r) => r.matchId === 2)?.winner,
//             stage: "semifinals",
//           },
//           {
//             id: 6,
//             team1: newResults.find((r) => r.matchId === 3)?.winner,
//             team2: newResults.find((r) => r.matchId === 4)?.winner,
//             stage: "semifinals",
//           },
//         ]
//         setSemiFinals(semiMatches)
//         setCurrentStage("semifinals")
//       }
//     } else if (match.stage === "semifinals") {
//       const newResults = [...semiResults, { matchId: match.id, winner }]
//       setSemiResults(newResults)

//       // Check if both semifinals are complete
//       if (newResults.length === 2) {
//         // Create final
//         const finalMatch = [
//           {
//             id: 7,
//             team1: newResults.find((r) => r.matchId === 5)?.winner,
//             team2: newResults.find((r) => r.matchId === 6)?.winner,
//             stage: "finals",
//           },
//         ]
//         setFinals(finalMatch)
//         setCurrentStage("finals")
//       }
//     } else if (match.stage === "finals") {
//       setChampion(winner)
//       setCurrentStage("champion")
//       setShowChampionPopup(true)
//     }

//     handleBackToTournament()
//   }

//   const ChampionPopup = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 relative overflow-hidden">
//         {/* Animated background elements */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-4 left-4 animate-bounce">
//             <HiSparkles className="w-6 h-6 text-white" />
//           </div>
//           <div className="absolute top-4 right-4 animate-bounce animation-delay-200">
//             <HiSparkles className="w-6 h-6 text-white" />
//           </div>
//           <div className="absolute bottom-4 left-4 animate-bounce animation-delay-400">
//             <HiSparkles className="w-6 h-6 text-white" />
//           </div>
//           <div className="absolute bottom-4 right-4 animate-bounce animation-delay-600">
//             <HiSparkles className="w-6 h-6 text-white" />
//           </div>
//         </div>

//         <div className="relative z-10">
//           <div className="animate-pulse mb-4">
//             <FaTrophy className="w-24 h-24 text-yellow-200 mx-auto" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-2">🎉 CHAMPION! 🎉</h1>
//           <h2 className="text-2xl font-semibold text-yellow-100 mb-4">{champion}</h2>
//           <p className="text-white text-lg mb-6">Congratulations on winning the Cricket Tournament!</p>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={() => setShowChampionPopup(false)}
//               className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//             >
//               Close
//             </button>
//             <button
//               onClick={() => {
//                 // Reset tournament
//                 setTeams([])
//                 setQuarterFinals([])
//                 setSemiFinals([])
//                 setFinals([])
//                 setQuarterResults([])
//                 setSemiResults([])
//                 setChampion(null)
//                 setCurrentStage("setup")
//                 setShowChampionPopup(false)
//               }}
//               className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//             >
//               New Tournament
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   const getCurrentMatches = () => {
//     switch (currentStage) {
//       case "quarterfinals":
//         return quarterFinals
//       case "semifinals":
//         return semiFinals
//       case "finals":
//         return finals
//       default:
//         return []
//     }
//   }

//   const getStageTitle = () => {
//     switch (currentStage) {
//       case "quarterfinals":
//         return "Quarter Finals"
//       case "semifinals":
//         return "Semi Finals"
//       case "finals":
//         return "Final"
//       case "champion":
//         return "Tournament Complete"
//       default:
//         return "Cricket Tournament"
//     }
//   }

//   return (
//     <div className="p-6 min-h-screen">
//       {showChampionPopup && <ChampionPopup />}

//       {showCricketCards && selectedMatch ? (
//         <div>
//           <button
//             onClick={handleBackToTournament}
//             className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
//           >
//             ← Back to Tournament
//           </button>
//           <Toss
//             match={selectedMatch}
//             onMatchComplete={(winner) => handleMatchComplete(selectedMatch, winner)}
//           />
//         </div>
//       ) : selectedMatch ? (
//         <Toss
//           match={selectedMatch}
//           onBack={handleBackToTournament}
//           onMatchComplete={(winner) => handleMatchComplete(selectedMatch, winner)}
//         />
//       ) : (
//         <>
//           <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{getStageTitle()}</h2>

//           {currentStage === "setup" && (
//             <>
//               <div className="flex gap-5 mb-6 justify-center">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Enter Team Name"
//                   className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
//                 />
//                 <button
//                   onClick={addTeam}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   Add Team
//                 </button>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold mb-3 text-center">Teams ({teams.length}/8):</h3>
//                 <div className="flex flex-wrap gap-3 justify-center">
//                   {teams.map((team, i) => (
//                     <span key={i} className="bg-white border-2 border-gray-200 px-4 py-2 rounded-full shadow-sm">
//                       {team}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="text-center mb-6">
//                 <button
//                   onClick={shuffleAndStart}
//                   disabled={teams.length !== 8}
//                   className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Start Tournament
//                 </button>
//               </div>
//             </>
//           )}

//           {currentStage === "champion" && (
//             <div className="text-center">
//               <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-8 mb-6 mx-auto max-w-md">
//                 <FaTrophy className="w-16 h-16 mx-auto mb-4" />
//                 <h3 className="text-2xl font-bold mb-2">Tournament Winner</h3>
//                 <h4 className="text-xl">{champion}</h4>
//               </div>
//             </div>
//           )}

//           {getCurrentMatches().length > 0 && currentStage !== "champion" && (
//             <div className="max-w-4xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {getCurrentMatches().map((m, i) => {
//                   const isCompleted =
//                     (m.stage === "quarterfinals" && quarterResults.some((r) => r.matchId === m.id)) ||
//                     (m.stage === "semifinals" && semiResults.some((r) => r.matchId === m.id))

//                   return (
//                     <div
//                       key={i}
//                       onClick={() => !isCompleted && handleMatchClick(m)}
//                       className={`bg-white border-2 shadow-lg rounded-xl p-6 text-center transition-all transform ${
//                         isCompleted
//                           ? "border-green-300 bg-green-50 cursor-default"
//                           : "border-gray-200 cursor-pointer hover:shadow-xl hover:border-blue-300 hover:scale-105"
//                       }`}
//                     >
//                       <div className="text-lg font-semibold text-gray-800">
//                         {m.team1} <span className="text-blue-500 mx-2">vs</span> {m.team2}
//                       </div>
//                       {m.group && <div className="text-sm text-gray-500 mt-2">Group {m.group}</div>}
//                       {isCompleted ? (
//                         <div className="text-sm text-green-600 mt-2 font-semibold">
//                           Winner:{" "}
//                           {m.stage === "quarterfinals"
//                             ? quarterResults.find((r) => r.matchId === m.id)?.winner
//                             : semiResults.find((r) => r.matchId === m.id)?.winner}
//                         </div>
//                       ) : (
//                         <div className="text-xs text-blue-600 mt-2">Click to play match</div>
//                       )}
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }

// export default Tournament


// import React, { useState } from "react";
// import Series from "./Series";
// import Toss from "./Toss";
// function Tournament() {
//     const [teams, setTeams] = useState([])
//     const [input, setInput] = useState("")
//     const [quarterFinals, setQuarterFinals] = useState([])
//     const [semiFinals, setSemiFinals] = useState([])
//     const [final, setFinal] =useState([])
//     // const [matches, setMatches] = useState([])
//     const [selectedMatch, setSelectedMatch] = useState(null);

//     console.log(selectedMatch)

//     const addTeam = () => {
//         if (input.trim() !== "" && teams.length < 8) {
//             setTeams([...teams, input.trim()])
//             setInput("")
//         }
//     }
//     const shuffleAndStart = () => {
//         if (teams.length === 8) {
//             let shuffled = [...teams].sort(() => Math.random() - 0.5)
//             let quarter = [
//                 { group: "A", team1: shuffled[0], team2: shuffled[1] },
//                 { group: "A", team1: shuffled[2], team2: shuffled[3] },
//                 { group: "B", team1: shuffled[4], team2: shuffled[5] },
//                 { group: "B", team1: shuffled[6], team2: shuffled[7] }
//             ]
//             setQuarterFinals(quarter)
//         }
//     }

//     const handleMatchClick = (match) => {
//         setSelectedMatch(match); // Set selected match
//     };
//    return (
//     <div className="p-6 min-h-screen">
//         {selectedMatch ? (
//             <Toss match={selectedMatch}  
//              onMatchComplete={(winner) => handleMatchComplete(selectedMatch, winner)}/>
//         ) : (
//             <>
//                 <h2 className="text-2xl font-bold mb-4">Tournament</h2>
//                 <div className="flex gap-5 mb-4">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Enter Team Name"
//                         className="border rounded px-3 py-1"
//                     />
//                     <button
//                         onClick={addTeam}
//                         className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer"
//                     >
//                         Add
//                     </button>
//                 </div>

//                 <div className="mb-4">
//                     <h2>Teams:</h2>
//                     <ul className="list-disc pl-5 flex gap-5">
//                         {teams.map((team, i) => (
//                             <li key={i}>{team}</li>
//                         ))}
//                     </ul>
//                 </div>

//                 <button
//                     onClick={shuffleAndStart}
//                     disabled={teams.length !== 8}
//                     className="bg-green-500 text-white px-5 py-1 cursor-pointer rounded-md disabled:opacity-50"
//                 >
//                     Start Tournament
//                 </button>

//                 {/* <Series matches={matches} /> */}

//                 <div className="grid grid-cols-3 gap-4">
//                     <div className="grid grid-cols-1 gap-4 mt-5">
//                         {matches.map((m, i) => (
//                             <div
//                                 key={i}
//                                 onClick={() => handleMatchClick(m)}
//                                 className="bg-white border shadow-md rounded-md p-4 w-48 text-center cursor-pointer hover:bg-gray-100"
//                             >
//                                 <p>{m.team1} vs {m.team2}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </>
//         )}
//     </div>
// );

// }

// export default Tournament;

{/* <div className="flex justify-center gap-4 my-5">
  <div
    className="rounded-md shadow-2xl py-3 w-64 flex flex-col items-center bg-white"
  >
    <h2 className="text-xl font-bold ">{score.runs}</h2>
    <p>Total Run</p>
  </div>
  <div
    className="rounded-md shadow-2xl py-3 w-64 flex flex-col items-center bg-white"
  >
    <h2 className="text-xl font-bold ">{score.wickets}</h2>
    <p>Wicket</p>
  </div>
  <div
    className="rounded-md shadow-2xl py-3 w-64 flex flex-col items-center bg-white"
  >
    <h2 className="text-xl font-bold ">{score.balls}</h2>
    <p>Current Balls</p>
  </div>
  <div
    className="rounded-md shadow-2xl px-5 py-3 w-64 flex flex-col items-center bg-white"
  >
    <h2 className="text-xl font-bold ">{score.overs}.{score.balls}</h2>
    <p>Overs</p>
  </div>
</div> */}
