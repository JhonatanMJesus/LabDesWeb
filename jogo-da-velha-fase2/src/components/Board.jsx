import Square from "./Square";
import react from "react";
export default function Board({board, onPlay, disabled})
{
    return (
        <div className="board">
            {board.map((cell, i) => (
                <Square key={i} value={cell} onClick={() => onPlay(i)} disabled={disabled} />
            ))}
        </div>
    );
}