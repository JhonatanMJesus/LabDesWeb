import React from "react";

export default function Square({value, onClick, disabled})
{
    return (
        <button className="square" onClick={onClick} disabled={disabled}>{disabled}</button>
    )
}