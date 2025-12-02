import React, { useState } from "react";
import cricketImage from '/src/assets/download (1).jpg';
import pitch from "/src/assets/pitch.jpg";
function Toss({ match, onMatchComplete }) {
    console.log(match)
    let stageWords = match.stage
        .replace(/(final)/i, ' $1')
        .trim()
        .split(" ")
        .map(word => word.toLowerCase() === "final" ? "Final" : word);

    let matchHeading = stageWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    const cardTypes = [
        { id: 1, label: "0 Run", value: 0, type: "run", isFlipped: false },
        { id: 2, label: "1 Run", value: 1, type: "run", isFlipped: false },
        { id: 3, label: "2 Run", value: 2, type: "run", isFlipped: false },
        { id: 4, label: "3 Run", value: 3, type: "run", isFlipped: false },
        { id: 5, label: "4 Run", value: 4, type: "run", isFlipped: false },
        { id: 6, label: "6 Run", value: 6, type: "run", isFlipped: false },
        { id: 7, label: "Wide", value: 1, type: "extra", isFlipped: false },
        { id: 8, label: "No Ball", value: 1, type: "extra", isFlipped: false },
        { id: 9, label: "0 Run", value: 0, type: "run", isFlipped: false },
        { id: 10, label: "1 Run", value: 1, type: "run", isFlipped: false },
        { id: 11, label: "4 Run", value: 4, type: "run", isFlipped: false },
        { id: 12, label: "2 Run", value: 2, type: "run", isFlipped: false },
        { id: 13, label: "1 Run", value: 1, type: "run", isFlipped: false },
        { id: 14, label: "0 Run", value: 0, type: "run", isFlipped: false },
        { id: 15, label: "6 Run", value: 6, type: "run", isFlipped: false },
        { id: 16, label: "4 Run", value: 4, type: "run", isFlipped: false },
        { id: 17, label: "6 Run", value: 6, type: "run", isFlipped: false },
        { id: 18, label: "4 Run", value: 4, type: "run", isFlipped: false },
        { id: 19, label: "Catch Out", value: 1, type: "wicket", isFlipped: false },
        { id: 20, label: "Bowled Out", value: 1, type: "wicket", isFlipped: false },
        { id: 21, label: "Run Out", value: 1, type: "wicket", isFlipped: false },
        { id: 22, label: "Hit Wicket", value: 1, type: "wicket", isFlipped: false },
        { id: 23, label: "LBW Out", value: 1, type: "wicket", isFlipped: false },
        { id: 24, label: "Stumped Out", value: 1, type: "wicket", isFlipped: false },
    ];

    const [card, setCard] = useState(cardTypes);
    const [score, setScore] = useState({ runs: 0, wickets: 0, balls: 0, overs: 0 })
    const [flippedId, setFlippedId] = useState(null)

    const [team, setTeam] = useState([match?.team1 || "Team A", match?.team2 || "Team B"]);
    const [tossWinningTeam, setTossWinningTeam] = useState("");
    const [tossLosserTeam, setTossLosserTeam] = useState("")
    const [tossWinnerStatus, setTossWinnerStatus] = useState("")
    const [tossDone, setTossDone] = useState(false)
    const [choose, setChoose] = useState("")
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [firstInningsOver, setFirstInningsOver] = useState(false);
    const [team1Score, setTeam1Score] = useState(null);
    const [chasing, setChasing] = useState(false);
    const [matchResult, setMatchResult] = useState(null);
    const [isClickable, setIsClickable] = useState(true);
    const [showInningsPopup, setShowInningsPopup] = useState(false);
    const [showChaseInfo, setShowChaseInfo] = useState(false);
    const [showMatchInfo, setShowMatchInfo] = useState(true);


    const speakText = (text) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text); // pass the text here
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Speech Synthesis not supported in this browser");
        }
    }
    const toss = () => {
        if (!team[0] || !team[1]) {
            alert("Please enter both team names before the toss!");
            return;
        }
        const tossWinner = Math.random() < 0.5 ? team[0] : team[1];
        const tossLoser = tossWinner === team[0] ? team[1] : team[0];
        setTossWinningTeam(tossWinner);
        setTossLosserTeam(tossLoser)
        setTossWinnerStatus(tossWinner)
        // console.log("Toss Winner:", tossWinner);
        setTossDone(true)
        setShowMatchInfo(false);
    };

    const handleChoose = (select) => {
        setChoose(select)
        if (choose === "batting") {
            setTossWinningTeam(tossWinningTeam);
            setTossLosserTeam(tossLosserTeam)
        } else if (select === "bowling") {
            setTossWinningTeam(tossLosserTeam);
            setTossLosserTeam(tossWinningTeam)
        }
    }

    const shuffledCards = (array) => {
        return [...array].sort(() => Math.random() - 0.5)
    }
    const handleCards = (item) => {
        if (gameOver || !isClickable) return;

        if (item.type === "run") {
            speakText(`${item.value} runs`)
        } else if (item.type === "wicket") {
            speakText(`${item.label}`)
        } else if (item.type === "extra") {
            speakText(`${item.label}`)
        }
        setIsClickable(false);
        setScore((prev) => {
            let newRun = prev.runs;
            let newWicket = prev.wickets;
            let newBall = prev.balls;
            let newOver = prev.overs;

            if (item.type === "run") {
                newRun += item.value;
                newBall += 1;
            } else if (item.type === "wicket") {
                newWicket += 1;
                newBall += 1;
            } else if (item.type === "extra") {
                newRun += item.value;
            }

            if (newBall >= 6) {
                newOver += Math.floor(newBall / 6);
                newBall = newBall % 6;
            }

            let isGameOver = false;
            let newMatchResult = null;
            let winner = null

            // If in second innings and chasing
            if (firstInningsOver && chasing) {
                const target = team1Score.runs + 1;  // target to win
                if (newRun >= target) {
                    // target achieved → terminate immediately
                    isGameOver = true;
                    winner = tossLosserTeam
                    newMatchResult = `${tossLosserTeam} wins by ${10 - newWicket} wicket(s)`;
                }
            }

            if (!isGameOver) {
                // If not yet terminated by target, check the normal ending conditions
                if (newWicket >= 10 || newOver >= 2) {
                    if (!firstInningsOver) {
                        // End of first innings
                        setFirstInningsOver(true);
                        setTeam1Score({ runs: newRun, wickets: newWicket, overs: newOver, balls: newBall });
                        // reset for second innings
                        newRun = 0;
                        newWicket = 0;
                        newBall = 0;
                        newOver = 0;
                        setChasing(true);
                        // alert(`${tossWinningTeam}’s innings is over. Now it’s the other team’s turn to bat.`);
                        // setTossWinningTeam(prevT => prevT === team[0] ? team[1] : team[0]);
                        // gameOver remains false
                        setTimeout(() => {
                            setShowInningsPopup(true);
                            setShowChaseInfo(false);
                        }, 1300);
                    } else {
                        // End of second innings by overs/wickets
                        isGameOver = true;
                        // Determine winner
                        const target = team1Score.runs;
                        if (newRun > target) {
                            winner = tossLosserTeam
                            newMatchResult = `${tossLosserTeam} wins by ${10 - newWicket} wicket(s)`;
                        } else if (newRun === target) {
                            winner = tossWinnerStatus;
                            newMatchResult = `${winner} wins the match as they won the toss!`;
                        } else {
                            winner = tossWinningTeam
                            newMatchResult = `${tossWinningTeam} wins by ${target - newRun} runs`;
                        }
                    }
                }
            }

            if (isGameOver && newMatchResult) {
                setMatchResult(newMatchResult);
                if (onMatchComplete && winner) {
                    setTimeout(() => {
                        onMatchComplete(winner)
                    }, 5000)
                }
            }

            setGameOver(isGameOver);

            return { runs: newRun, wickets: newWicket, balls: newBall, overs: newOver };
        });
        setFlippedId(item.id);
        setTimeout(() => {
            setCard(shuffledCards(card));
            setIsClickable(true);
            setFlippedId(null);
        }, 1300);
    };

    return (
        <div>
            {gameStarted ? (
                <>
                    {gameOver && matchResult && (
                        <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 text-white rounded-lg p-6 mb-6 md:mx-24 text-center shadow-lg">
                            <h2 className="text-3xl font-bold mb-2"> Game Over!</h2>
                            <p className="text-xl mb-2">
                                Final Score: {score.runs}/{score.wickets} in {score.overs}.{score.balls} overs
                            </p>
                            <h3 className="text-2xl font-semibold mt-2">{matchResult}</h3>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 md:mx-24 bg-white rounded-md shadow-2xl p-3">
                        <div className="flex gap-2 order-1 md:gap-5">
                            <div className="h-11 md:h-12 rounded-md px-3 bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-lg">
                                <span className="text-white text-base md:text-2xl font-medium">
                                    <h2>{tossWinningTeam}</h2>
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-base md:text-lg font-bold"> {!firstInningsOver ? `${score.runs}/${score.wickets}` : `${team1Score.runs}/${team1Score.wickets}`}</h2>
                                <p className="text-sm font-medium">{!firstInningsOver ? `${score.overs}.${score.balls}` : `${team1Score.overs}.${team1Score.balls}`}</p>
                            </div>
                        </div>
                        <div className="col-span-2 order-3 md:order-2">
                            {firstInningsOver && !gameOver && showChaseInfo && (
                                <div className="flex justify-center items-center">
                                    <h2 className="md:text-base text-xs mx-5 mt-2">{tossLosserTeam} needs {(team1Score?.runs + 1) - score.runs} run from {(30 - (score.overs * 6 + score.balls))} balls to win </h2>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 order-2 md:order-3 md:gap-5">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold "> {firstInningsOver ? `${score.runs}/${score.wickets}` : `0/0`}</h2>
                                <p className="text-sm font-medium">{firstInningsOver ? `${score.overs}.${score.balls}` : `0.0`}</p>
                            </div>
                            <div className="h-11 md:h-12 px-3 rounded-md bg-gradient-to-br from-accent to-black flex items-center justify-center shadow-lg">
                                <span className="text-white text-base md:text-2xl font-medium">
                                    <h2>{tossLosserTeam}</h2>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 md:px-24 mt-5">
                        {card.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-center items-center"
                                onClick={() => handleCards(item)}
                            >
                                <div className={`rounded-md shadow-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex flex-col justify-center items-center text-white cursor-pointer bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-transform transform`}>
                                    <span className="text-4xl">
                                        {/* <MdSportsCricket /> */}
                                    </span>
                                    <h2 className="text-base md:text-2xl font-semibold text-center">
                                        {
                                            flippedId === item.id ? item.label : <img src={cricketImage} className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-md" alt="cricket" />}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="md:grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <h2 className="text-2xl font-semibold mx-2">
                            {matchHeading} Match
                        </h2>
                    </div>
                    <div className="relative w-full h-50 sm:h-60 md:h-[71%] rounded-2xl overflow-hidden shadow-2xl my-3 md:my-0">
                        <img
                            src={pitch}
                            alt="Cricket Pitch"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-5">
                            <h2 className="text-white text-2xl font-semibold drop-shadow-md">Cricket Toss Time</h2>
                            <p className="text-gray-200 text-sm">Every toss can change the game!</p>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-2">
                        <div className="border border-green-500 bg-gradient-to-br from-syk-100 via-green-200 to-sky-50 rounded-md">
                            {team.length === 2 && (
                                <div className="flex items-center justify-around gap-16 mt-6">
                                    <div className="flex flex-col">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-md bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-lg">
                                            <span className="text-white text-2xl font-medium">
                                                {team[0][0]}
                                            </span>
                                        </div>
                                        <span className="text-center mt-2 underline">{team[0]}</span>
                                    </div>
                                    <span className="text-xl font-bold">Vs</span>
                                    <div className="flex flex-col">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-md bg-gradient-to-br from-accent to-black flex items-center justify-center shadow-lg">
                                            <span className="text-white text-2xl font-medium">
                                                {team[1][0]}
                                            </span>
                                        </div>
                                        <span className="text-center mt-2 underline">{team[1]}</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-center mt-5">
                                <button
                                    className={`text-white rounded-md px-4 py-1 my-4 w-full mx-10 ${tossDone ? "bg-blue-200 cursor-not-allowed" : "bg-blue-800 cursor-pointer"}`}
                                    onClick={toss}
                                    disabled={tossDone}
                                >
                                    Toss
                                </button>
                            </div>
                        </div>
                        {showMatchInfo && (
                            <div className="border border-green-500 bg-gradient-to-br from-sky-100 via-green-200 to-sky-50 rounded-md px-4 py-6 mt-3 md:mt-0 flex items-center justify-center h-40 sm:h-48 md:h-30 lg:h-52 text-center">
                                <div className="text-base sm:text-lg md:text-xl font-semibold text-green-600 flex flex-col">
                                    <p>{matchHeading} Match between</p>
                                    <div>
                                        <span className="mx-1 text-blue-600">{match.team1}</span>
                                        and
                                        <span className="mx-1 text-blue-600">{match.team2}</span>
                                    </div>
                                </div>
                            </div>

                        )}
                        {tossDone && (
                            <div className="border border-green-500 bg-gradient-to-br from-syk-100 via-green-200 to-sky-50 rounded-md px-5 mt-3 md:mt-0">
                                <div className="py-3">
                                    <p className="text-lg font-semibold text-green-600 mb-2">
                                        {tossWinnerStatus} won the toss!
                                    </p>
                                    <p>Choose to bat or bowl first:</p>
                                    <div className="flex gap-5 my-3">
                                        <button
                                            className={`rounded-md px-5 py-1 text-white text-sm cursor-pointer 
                                            ${choose
                                                    ? choose === "batting"
                                                        ? "bg-green-500 cursor-not-allowed"
                                                        : "bg-gray-300 cursor-not-allowed"
                                                    : "bg-gray-500 hover:bg-green-500"
                                                }`}
                                            onClick={() => handleChoose("batting")}
                                            disabled={!!choose}
                                        >
                                            Batting
                                        </button>

                                        <button
                                            className={`rounded-md px-5 py-1 text-white text-sm cursor-pointer 
                                            ${choose
                                                    ? choose === "bowling"
                                                        ? "bg-green-500 cursor-not-allowed"
                                                        : "bg-gray-300 cursor-not-allowed"
                                                    : "bg-gray-500 hover:bg-green-500"
                                                }`}
                                            onClick={() => handleChoose("bowling")}
                                            disabled={!!choose}
                                        >
                                            Bowling
                                        </button>
                                    </div>

                                    {choose && (
                                        <p>{tossWinnerStatus} is selected to {choose === "batting" ? "bat" : "bowl"} first</p>
                                    )}
                                    <button
                                        onClick={() => { setGameStarted(true), setCard(shuffledCards(card)) }}
                                        disabled={!choose}
                                        className="mt-4 bg-green-600 text-white px-5 py-1 rounded-md cursor-pointer"
                                    >
                                        Start Match
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            )}
            {showInningsPopup && (
                <div className="fixed inset-0 flex justify-center items-start sm:items-center z-50 bg-black/30 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white border border-green-500 rounded-2xl shadow-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] text-center transform transition-all duration-300 scale-100 hover:scale-105 mx-3 my-3 sm:mx-0">

                        {/* Content */}
                        <div className="flex flex-col space-y-4 pt-6 px-4 sm:px-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700">
                                First Innings Completed!
                            </h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                <span className="font-semibold text-green-600">{tossWinningTeam}</span>’s innings is complete.
                                Now it’s time for the opponent to take the chase!
                            </p>
                        </div>

                        {/* Button Section */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => {
                                    setShowInningsPopup(false);
                                    setShowChaseInfo(true);
                                }}
                                className="mt-2 sm:mt-4 bg-green-500 text-white cursor-pointer font-medium px-5 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-green-600 active:scale-95"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Toss;
