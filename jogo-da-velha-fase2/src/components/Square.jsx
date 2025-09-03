import react from "react";
export default function Square({value,onClick, disabled})
{
    return(
        <button className="square" 
        onClick={onClick} 
        disabled = {disabled || value}>{value}</button>
    )
}
