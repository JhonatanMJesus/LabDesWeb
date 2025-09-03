import react from "react";
export default function Scoreboard({scores})
{
    return(
        <div className="scoreboard">
            <span>Vitórias X: {scores.X}</span>
            <span>Vitórias O: {scores.O}</span>
            <span>Empates: {scores.draw}</span>
        </div>
    )
}