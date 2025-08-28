import Square from './Square';
import React from 'react';

export default function Board({board, onPlay, disabled})
{
    return (
        <div className='board'>
            <Square key={i} value={cell} onclick={() => onPlay(i)} disabled = {disabled}></Square>
        </div>
    )
}