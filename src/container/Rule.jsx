import React from "react";
import tournament from '/src/assets/tournament.jpg';
import { GiPodiumWinner } from "react-icons/gi"; // optional icon for final

function Rule() {
    return (
        <div className="flex flex-col items-center bg-green-200 p-6 rounded-xl space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center">
                <img
                    src={tournament}
                    alt="Tournament"
                    className="w-24 h-24 border-4 border-green-700"
                />
                <h2 className="mt-4 text-3xl font-extrabold text-green-900">Tournament Rules</h2>
            </div>

            {/* Quarterfinals */}
            <div className="w-full bg-gradient-to-r from-green-300 to-green-400 p-5 rounded-xl shadow-lg border border-green-500">
                <h3 className="text-xl font-bold text-green-900">Quarterfinals</h3>
                <p className="mt-2 text-green-800 text-base">
                    8 teams participate. The top 4 teams advance to the semifinals, while the remaining 4 are eliminated.
                </p>
            </div>

            {/* Semifinals */}
            <div className="w-full bg-gradient-to-r from-green-400 to-green-500 p-5 rounded-xl shadow-lg border border-green-600">
                <h3 className="text-xl font-bold text-green-900">Semifinals</h3>
                <p className="mt-2 text-green-900 text-base">
                    The 4 remaining teams compete. 2 winners advance to the final, while the other 2 are eliminated.
                </p>
            </div>

            {/* Final */}
            <div className="w-full bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-xl shadow-2xl border border-green-700 flex items-center gap-3">
                <GiPodiumWinner className="text-yellow-500 text-3xl"/>
                <div>
                    <h3 className="text-xl font-bold text-green-900">Final</h3>
                    <p className="mt-1 text-green-900 text-base">
                        The last 2 teams battle in the grand finale to claim the championship trophy.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Rule;
