import React, { useState } from "react";
import cricketImage from '/src/assets/download (1).jpg';
function SeriesMatch({ match, onMatchComplete}) {
  const cardTypes = [
    { id: 1, label: "0", value: 0, type: "run", isFlipped: false },
    { id: 2, label: "1", value: 1, type: "run", isFlipped: false },
    { id: 3, label: "2", value: 2, type: "run", isFlipped: false },
    { id: 4, label: "3", value: 3, type: "run", isFlipped: false },
    { id: 5, label: "4", value: 4, type: "run", isFlipped: false },
    { id: 6, label: "6", value: 6, type: "run", isFlipped: false },
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
    setTossDone(true)
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

      if (firstInningsOver && chasing) {
        const target = team1Score.runs + 1;
        if (newRun >= target) {
          isGameOver = true;
          winner = tossLosserTeam
          newMatchResult = `${tossLosserTeam} wins by ${10 - newWicket} wicket(s)`;
        }
      }

      if (!isGameOver) {
        if (newWicket >= 10 || newOver >= 5) {
          if (!firstInningsOver) {
            setFirstInningsOver(true);
            setTeam1Score({ runs: newRun, wickets: newWicket, overs: newOver, balls: newBall });
            newRun = 0;
            newWicket = 0;
            newBall = 0;
            newOver = 0;
            setChasing(true);
            alert(`${tossWinningTeam}’s innings is over. Now it’s the other team’s turn to bat.`);
            setTossWinningTeam(prevT => prevT === team[0] ? team[1] : team[0]);
          } else {
            isGameOver = true;
            const target = team1Score.runs;
            if (newRun > target) {
              winner = tossLosserTeam
              newMatchResult = `${tossLosserTeam} wins by ${10 - newWicket} wicket(s)`;
            } else if (newRun === target) {
              winner = tossWinningTeam;
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
      setFlippedId(null);
      setIsClickable(true);
    }, 2000);
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
          <div className="flex justify-between md:mx-24 bg-white rounded-md shadow-2xl p-3">
            <div className="flex gap-2 md:gap-5">
              <div className="h-10 md:h-12 rounded-md px-3 bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-base md:text-2xl font-medium">
                  <h2>{tossWinningTeam}</h2>
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold"> {!firstInningsOver ? `${score.runs}/${score.wickets}` : `${team1Score.runs}/${team1Score.wickets}`}</h2>
                <p className="text-sm font-medium">{!firstInningsOver ? `${score.overs}.${score.balls}` : `${team1Score.overs}.${team1Score.balls}`}</p>
              </div>
            </div>
            {firstInningsOver && !gameOver && (
              <div className="flex justify-center items-center">
                <h2 className="text-xs md:text-base mx-5">{tossLosserTeam} needs {(team1Score?.runs + 1) - score.runs} run from {(30 - (score.overs * 6 + score.balls))} balls to win </h2>
              </div>
            )}
            <div className="flex gap-2 md:gap-5">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold "> {firstInningsOver ? `${score.runs}/${score.wickets}` : `0/0`}</h2>
                <p className="text-sm font-medium">{firstInningsOver ? `${score.overs}.${score.balls}` : `0.0`}</p>
              </div>
              <div className="h-10 md:h-12 px-3 rounded-md bg-gradient-to-br from-accent to-black flex items-center justify-center shadow-lg">
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
                  <h2 className="text-base md:text-2xl font-semibold text-center">
                    {
                      flippedId === item.id ? item.label : <img src={cricketImage} className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-md" alt="cricket" />}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border rounded-md p-4">
            {team.length === 2 && (
              <div className="flex items-center justify-center gap-10 mt-6">
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
            <div className="flex justify-center mt-10">
              <button
                className={`text-white rounded-md px-4 py-1 my-4 w-50 ${tossDone ? "bg-blue-200 cursor-not-allowed" : "bg-blue-800 cursor-pointer"}`}
                onClick={toss}
                disabled={tossDone}
              >
                Toss
              </button>
            </div>
          </div>
          {tossDone && (
            <div className="border rounded-md p-4">
              <div className="py-5">
                <p className="text-lg font-semibold text-green-600">
                  {tossWinnerStatus} won the toss!
                </p>
                <p>Choose to bat or bowl first:</p>
                <div className="flex gap-5 my-5">
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

      )}
    </div>
  );
}

export default SeriesMatch;