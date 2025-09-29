import React, { useState } from "react";
import cricketImage from '/src/assets/cricket.png';
import { BsTrophy } from "react-icons/bs";
import Tournament from "./Tournament";
import { Link } from "react-router-dom";
function Home() {
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
  const handleChoose = (select) => {
  setChoose(select);

  if (select === "batting") {
    setBattingTeam(battingTeam); 
    setLTossLoser(tossLoser);
  } else if (select === "bowling") {
    setBattingTeam(tossLoser);
    setLTossLoser(battingTeam);
  }

  console.log("batting:", select === "batting" ? battingTeam : tossLoser);
  console.log("bowling:", select === "batting" ? tossLoser : battingTeam);
};

  const shuffledCards = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }
  const handleCards = (item) => {
    if (gameOver) return;
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
        if (newWicket >= 10 || newOver >= 5) {
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
            alert(`${battingTeam}’s innings is over. Now it’s the other team’s turn to bat.`);
            setBattingTeam(prevT => prevT === team1 ? team2 : team1);
            // gameOver remains false
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
    }, 3000);
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
    <div>
      {gameStarted ? (
        <>
          {firstInningsOver && !gameOver && (
            <div className="text-center my-5 bg-blue-50 p-4 rounded shadow-md mx-24">
              <h2 className="text-xl font-bold">{tossLoser} is now chasing</h2>
              <p>Target: {team1Score?.runs + 1} runs</p>
            </div>
          )}
          {gameOver && matchResult && (
            <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 text-white rounded-lg p-6 mb-6 mx-24 text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-2"> Game Over!</h2>
              <p className="text-xl mb-2">
                Final Score: {score.runs}/{score.wickets} in {score.overs}.{score.balls} overs
              </p>
              <h3 className="text-2xl font-semibold mt-2">{matchResult}</h3>

              <button
                onClick={restart}
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md"
              >
                Restart Game
              </button>
            </div>
          )}
          <div className="flex justify-center gap-4 my-5">
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
          </div>
          <div className="grid md:grid-cols-8 gap-5 px-24 mt-5">
            {card.map((item) => (
              <div
                key={item.id}
                className="flex justify-center items-center"
                onClick={() => handleCards(item)}
              >
                <div className={`rounded-md shadow-2xl w-32 h-32 flex flex-col justify-center items-center text-white cursor-pointer bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-transform transform`}>
                  <span className="text-4xl">
                    {/* <MdSportsCricket /> */}
                  </span>
                  <h2 className="text-2xl font-semibold text-center">
                    {
                      flippedId === item.id ? item.label : <img src={cricketImage} className="w-32 h-32" alt="cricket" />}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-end gap-2 mx-5">
            <Link to="/tournament" className="bg-blue-500 rounded-md py-1 px-3 text-white text-sm">Touranment</Link>
           <Link to="/series" className="bg-blue-500 rounded-md py-1 px-3 text-white text-sm">Series</Link>
          </div>
          <div className={`flex ${tossDone ? "justify-center mx-24" : "justify-center"}`}>
            <div className="flex flex-col gap-3 items-center my-5">
              <div>
                <div className="flex gap-5 items-center justify-center">
                  <span className="text-yellow-800">
                    <BsTrophy size={30} />
                  </span>
                  <h2 className="text-4xl">Cricket Card Game</h2>
                </div>
                <h2 className="flex justify-center text-lg font-light">
                  Click on cards to play cricket! Score runs or get out!
                </h2>
              </div>
              <div>
                <div className="flex flex-col gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Team 1 Name"
                    value={team1}
                    onChange={(e) => setTeam1(e.target.value)}
                    className="border px-4 py-1 rounded-md w-64"
                  />
                  <input
                    type="text"
                    placeholder="Team 2 Name"
                    value={team2}
                    onChange={(e) => setTeam2(e.target.value)}
                    className="border px-4 py-1 rounded-md w-64"
                  />
                  <button
                    onClick={handleToss}
                    className="bg-purple-600 text-white px-5 py-1 rounded-md cursor-pointer"
                  >
                    Toss
                  </button>
                </div>
              </div>
            </div>
            {tossDone && (
              <>
                <div className="border-l border-black mx-10 px-10 py-5">
                  <p className="text-lg font-semibold text-green-600">
                    {tossWinnerStatus} won the toss!
                  </p>
                  <p>Choose to bat or bowl first:</p>
                  <div className="flex gap-5 my-5">
                    <button className="bg-gray-500 rounded-md px-5 py-1 text-white text-sm cursor-pointer hover:bg-green-500" onClick={() => handleChoose("batting")}>Batting</button>
                    <button className="bg-gray-500 rounded-md px-5 py-1 text-white text-sm cursor-pointer hover:bg-green-500" onClick={() => handleChoose("bowling")}>Bowling</button>
                  </div>
                  {choose && (
                    <p>{tossWinnerStatus} is selected to {choose === "batting" ? "bat" : "bowl"} first</p>
                  )}
                  <button
                    onClick={() => setGameStarted(true)}
                    className="mt-4 bg-green-600 text-white px-5 py-1 rounded-md cursor-pointer"
                  >
                    Start Match
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col bg-white rounded-md mx-24 px-5 py-5 my-5">
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
      )}
    </div>
  );
}

export default Home;
