import React from "react";

export default function Scoreboard({scores})
{
    return (
        <div className="scoreBoard">
            <span>Vitórias X: {scores.x}</span>
            <span>Vitórias O: {scores.o}</span>
            <span>Empates: {scores.draw}</span>
        </div>
    )
}