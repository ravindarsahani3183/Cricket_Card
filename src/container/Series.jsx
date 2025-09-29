import React, { useState } from "react";

function Series() {
    const [teams, setTeams] = useState([])
    const [input, setInput] = useState("")
    const addHandle = () => {
        if (input.trim() !== "" && teams.length < 2) {
            setTeams([...teams, input.trim()])
            setInput("")
        }
    }
    
    
    return (
        <div className="p-6 min-h-screen">
            <div className="flex gap-5 mb-6 justify-start">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Team"
                    className="border-2 border-gray-500 rounded-lg px-4 py-1 focus:border-gray-700 focus:outline-none"
                />
            </div>
            <button className="bg-gray-500 text-white px-6 py-1 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
             onClick={addHandle}
             >Add</button>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-start">Teams ({teams.length}/2):</h3>
                <div className="flex flex-wrap gap-3 justify-start">
                    {teams.map((team, i) => (
                        <span key={i} className="bg-white border-2 border-gray-200 px-4 py-1 rounded-md shadow-sm">
                            {team}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Series;
