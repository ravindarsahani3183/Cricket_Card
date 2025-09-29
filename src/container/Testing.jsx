// Series.js
import React, { useState } from "react";
import BracketColumn from "./BracketColumn";
import MatchCard from "./MatchCard";
import Toss from "./Toss";
import { useNavigate } from "react-router-dom";

// Utility function to format match display
const formatMatch = (match) => {
    const team1 = match.team1 || "TBD";
    const team2 = match.team2 || "TBD";
    return `${team1} vs ${team2}`;
};

function Testing({ matches = [] }) {
    const [selectedMatch, setSelectedMatch] = useState(null); // <-- state for toss section

    const groupA = matches.filter((match) => match.group === "A");
    const groupB = matches.filter((match) => match.group === "B");

    const quarterFinalsA = groupA.length
        ? groupA.map(formatMatch)
        : ["Quarter Final", "Quarter Final"];

    const quarterFinalsB = groupB.length
        ? groupB.map(formatMatch)
        : ["Quarter Final", "Quarter Final"];

    const semifinals = ["Semi Final", "Semi Final"];
    const final = "Final";

    const navigate = useNavigate();

    const handleMatchClick = (match) => {
        navigate("/toss", { state: { match } });
    };
    return (
        <div className="p-6 min-h-screen">
            <div className="grid grid-cols-1">
                <div className="flex items-center justify-center gap-6">
                    <BracketColumn matches={quarterFinalsA} onMatchClick={handleMatchClick} />
                    <BracketColumn matches={quarterFinalsB} onMatchClick={handleMatchClick} />
                </div>

                {selectedMatch && (
                    <Toss />
                )}

                <div className="flex items-center justify-center">
                    <div className="md:flex flex-col">
                        <div className="flex gap-6 md:gap-56 lg:gap-72">
                            {semifinals.map((match, index) => (
                                <div key={index}>
                                    <MatchCard match={match} />
                                    <div className="flex justify-center">
                                        <div className="border-l border-gray-500 h-6 sm:h-8 md:h-12 lg:h-16"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <div className="border-t border-gray-500 w-45 md:w-[69%]"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="border-l border-gray-500 h-6 sm:h-8 md:h-12 lg:h-16"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-6">
                    <MatchCard match={final} />
                </div>
            </div>
        </div>
    );
}

export default Testing;
