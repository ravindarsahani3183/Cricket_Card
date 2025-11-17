import React, { useState } from "react";
// import cricketImage from '/src/assets/cricket.png';
import cricketImage from '/src/assets/download (1).jpg';
import battle from '/src/assets/twoplayer.jpeg';

function Battle() {
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
  const [gameOver, setGameOver] = useState(false);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [battingTeam, setBattingTeam] = useState("");
  const [tossWinnerStatus, setTossWinnerStatus] = useState("")
  const [tossLoser, setLTossLoser] = useState("")
  const [tossDone, setTossDone] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [firstInningsOver, setFirstInningsOver] = useState(false);
  const [team1Score, setTeam1Score] = useState(null);
  const [chasing, setChasing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [choose, setChoose] = useState("")
  const [isClickable, setIsClickable] = useState(true);

  const [showInningsPopup, setShowInningsPopup] = useState(false);
  const [showChaseInfo, setShowChaseInfo] = useState(false);

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

  const handleToss = () => {
    if (!team1 || !team2) {
      alert("Please enter both team names before the toss!");
      return;
    }
    const tossWinner = Math.random() < 0.5 ? team1 : team2;
    setTossWinnerStatus(tossWinner)
    const tossLoser = tossWinner === team1 ? team2 : team1;
    setLTossLoser(tossLoser)
    setBattingTeam(tossWinner);
    setTossDone(true);
  };
  // const handleChoose = (select) => {
  //   setChoose(select);

  //   if (select === "batting") {
  //     setBattingTeam(battingTeam);
  //     setLTossLoser(tossLoser);
  //   } else if (select === "bowling") {
  //     setBattingTeam(tossLoser);
  //     setLTossLoser(battingTeam);
  //   }

  //   console.log("batting:", select === "batting" ? battingTeam : tossLoser);
  //   console.log("bowling:", select === "batting" ? tossLoser : battingTeam);
  // };

  const handleChoose = (select) => {
    if (!tossWinnerStatus || !tossLoser) return;

    setChoose(select);

    if (select === "batting") {
      setBattingTeam(tossWinnerStatus); // explicitly use toss winner
      setLTossLoser(tossLoser);         // explicitly use toss loser
    } else if (select === "bowling") {
      setBattingTeam(tossLoser);        // toss loser bats
      setLTossLoser(tossWinnerStatus);  // toss winner bowls
    }

    console.log("Batting Team:", select === "batting" ? tossWinnerStatus : tossLoser);
    console.log("Bowling Team:", select === "batting" ? tossLoser : tossWinnerStatus);
  };

  const shuffledCards = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }
  const handleCards = (item) => {
    if (gameOver || !isClickable) return; // prevent click when game over or locked

    setIsClickable(false);

    if (item.type === "run") {
      speakText(`${item.value} runs`)
    } else if (item.type === "wicket") {
      speakText(`${item.label}`)
    } else if (item.type === "extra") {
      speakText(`${item.label}`)
    }
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

      // If in second innings and chasing
      if (firstInningsOver && chasing) {
        const target = team1Score.runs + 1;  // target to win
        if (newRun >= target) {
          // target achieved → terminate immediately
          isGameOver = true;
          newMatchResult = `${tossLoser} wins by ${10 - newWicket} wicket(s)`;
        }
      }

      if (!isGameOver) {
        // If not yet terminated by target, check the normal ending conditions
        if (newWicket >= 10 || newOver >= 1) {
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
            // alert(`${battingTeam}’s innings is over. Now it’s the other team’s turn to bat.`);
            // setBattingTeam(prevT => prevT === team1 ? team2 : team1);
            setBattingTeam(prevT => {
              const currentTeam1 = team1;
              const currentTeam2 = team2;
              return prevT === currentTeam1 ? currentTeam2 : currentTeam1;
            });

            setShowChaseInfo(false);
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
              newMatchResult = `${tossLoser} wins by ${10 - newWicket} wicket(s)`;
            } else if (newRun === target) {
              newMatchResult = `Match tied!`;
            } else {
              // const opponent = battingTeam === team1 ? team2 : team1;
              newMatchResult = `${battingTeam} wins by ${target - newRun} runs`;
            }
          }
        }
      }

      if (isGameOver && newMatchResult) {
        setMatchResult(newMatchResult);
      }

      setGameOver(isGameOver);

      return { runs: newRun, wickets: newWicket, balls: newBall, overs: newOver };
    });
    setFlippedId(item.id);
    setTimeout(() => {
      setCard(shuffledCards(card));
      setFlippedId(null);
      setIsClickable(true);
    }, 1300);
  };

  const restart = () => {
    setScore({ runs: 0, wickets: 0, balls: 0, overs: 0 });
    setCard(shuffledCards(card));
    setFlippedId(null);
    setGameOver(false);
    setGameStarted(false);
    setTossDone(false);
    setTeam1("");
    setTeam2("");
    setBattingTeam("");
    setFirstInningsOver(false);
    setTeam1Score(null);
    setChasing(false);
    setMatchResult(null);
    setChoose("");
  };

  return (
    <div className="min-h-screen">
      {gameStarted ? (
        <>
          <div className="py-2"></div>
          {gameOver && matchResult && (
            <div className=" bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 text-white rounded-lg p-6 mb-3 md:mb-6 mx-2 md:mx-24 text-center shadow-lg pt-5">
              <h2 className="text-3xl font-bold mb-2"> Game Over!</h2>
              <p className="text-xl mb-2">
                Final Score: {score.runs}/{score.wickets} in {score.overs}.{score.balls} overs
              </p>
              <h3 className="text-2xl font-semibold mt-2">{matchResult}</h3>

              <button
                onClick={restart}
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer"
              >
                Restart Game
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 mx-2 md:mx-24 bg-white rounded-md shadow-2xl p-3">
            <div className="flex gap-2 order-1 md:gap-5">
              <div className="h-10 md:h-11 rounded-md px-3 bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-base md:text-2xl font-medium">
                  <h2>{battingTeam}</h2>
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-base md:text-lg font-bold"> {!firstInningsOver ? `${score.runs}/${score.wickets}` : `${team1Score.runs}/${team1Score.wickets}`}</h2>
                <p className="text-sm font-medium">{!firstInningsOver ? `${score.overs}.${score.balls}` : `${team1Score.overs}.${team1Score.balls}`}</p>
              </div>
            </div>
            <div className="col-span-2 order-3 md:order-2 mt-3 md:mt-0">
              {firstInningsOver && !gameOver && showChaseInfo && (
                <div className="flex justify-center items-center">
                  <h2 className="md:text-base text-xs mx-5">
                    {tossLoser} needs {(team1Score?.runs + 1) - score.runs} run from {(30 - (score.overs * 6 + score.balls))} balls to win
                  </h2>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 order-2 md:order-3 md:gap-5">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold "> {firstInningsOver ? `${score.runs}/${score.wickets}` : `0/0`}</h2>
                <p className="text-sm font-medium">{firstInningsOver ? `${score.overs}.${score.balls}` : `0.0`}</p>
              </div>
              <div className="h-10 md:h-11 px-3 rounded-md bg-gradient-to-br from-accent to-black flex items-center justify-center shadow-lg">
                <span className="text-white text-base md:text-2xl font-medium">
                  <h2>{tossLoser}</h2>
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-5 mx-2 md:px-24 mt-5">
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
                      flippedId === item.id ? item.label : <img src={cricketImage} className="w-20 h-20 sm:w-full rounded-md sm:h-24 md:w-32 md:h-32" alt="cricket" />}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 mx-3 sm:mx-5 gap-3 md:gap-5 py-5">
            {/* Title */}
            <div className="col-span-1 md:col-span-3 text-center md:text-start">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-700">Battle Cricket</h2>
            </div>

            {/* Battle Image */}
            <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden items-center col-span-1">
              <img
                src={battle}
                alt="battle"
                className="w-full h-64 sm:h-80 md:h-96 rounded-lg object-cover transition-transform duration-300 hover:scale-105 shadow-md"
              />
              <span className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 text-white text-base sm:text-lg md:text-xl font-semibold drop-shadow-md">
                Battle
              </span>
            </div>

            {/* Team Input Section */}
            <div className="flex flex-col col-span-1 md:col-span-2 gap-4 py-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700">Teams Name</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Team 1 Name"
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  className="border-2 border-green-600 text-green-900 rounded-lg px-4 py-2 focus:border-green-800 focus:outline-none shadow-inner hover:shadow-md transition-shadow w-full"
                />
                <input
                  type="text"
                  placeholder="Team 2 Name"
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  className="border-2 border-green-600 text-green-900 rounded-lg px-4 py-2 focus:border-green-800 focus:outline-none shadow-inner hover:shadow-md transition-shadow w-full"
                />
                <button
                  onClick={handleToss}
                  disabled={tossDone}
                  className={`text-white font-medium rounded-md px-5 py-2 transition-all duration-300 ${tossDone
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 cursor-pointer"
                    }`}
                >
                  Toss
                </button>
              </div>

              {/* Toss Result Section */}
              {tossDone && (
                <div className="pt-4 pb-5">
                  <p className="text-lg font-semibold text-green-600 mb-2">
                    {tossWinnerStatus} won the toss!
                  </p>
                  <p className="text-gray-700 mb-3">Choose to bat or bowl first:</p>
                  <div className="flex flex-wrap gap-4 my-4">
                    <button
                      className={`rounded-md px-5 py-2 text-white text-sm font-medium cursor-pointer transition-all duration-300 ${choose
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
                      className={`rounded-md px-5 py-2 text-white text-sm font-medium cursor-pointer transition-all duration-300 ${choose
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
                    <p className="text-green-700 font-medium">
                      {tossWinnerStatus} has chosen to{" "}
                      <span className="font-semibold">
                        {choose === "batting" ? "bat" : "bowl"}
                      </span>{" "}
                      first.
                    </p>
                  )}

                  <button
                    onClick={() => setGameStarted(true)}
                    disabled={!choose}
                    className={`mt-5 bg-green-600 text-white px-6 py-2 cursor-pointer rounded-md font-medium transition-all duration-300 ${!choose ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                      }`}
                  >
                    Start Match
                  </button>
                </div>
              )}
            </div>

            {/* Rules Section */}
            <div className="col-span-1 md:col-span-3">
              <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-3">Battle Rules</h3>
              <ul className="space-y-2 text-green-800 font-medium">
                <li className="flex items-start sm:items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 sm:mt-0"></span>
                  There are 2 teams in total.
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 sm:mt-0"></span>
                  The two teams play a match against each other.
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 sm:mt-0"></span>
                  The winner of the match receives the tournament trophy.
                </li>
              </ul>
            </div>
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
                <span className="font-semibold text-green-600">{battingTeam}</span>’s innings is complete.
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
                className="mt-2 sm:mt-4 bg-green-500 text-white font-medium px-5 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-green-600 active:scale-95"
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

export default Battle;
