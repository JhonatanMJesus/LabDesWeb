import { useState, useEffect } from 'react';
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import "./index.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function checkWin(board){
    const winConditions = [
        [0,1,2], [3,4,5],[6,7,8],
        [0,3,6], [1,4,7],[2,5,8],
        [0,4,8], [2,4,6]
    ];
    const winnerLine = winConditions.find(([a,b,c])=>
      board[a] && board[a] === board[b] && board[a] === board[c]);
    if(winnerLine)
    {
      return board[winnerLine[0]];
    }
    if(board.every(bo=>bo !== null))
    {
      return "draw";
    }
    return null;
  }
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const[currentPlayer, setCurrentPlayer] = useState("X");
  const [mySymbol, setMysymbol] = useState(null);
  const [scores, setScores] = useState({X:0, O:0, draw:0});
  //incluir
  const [ws, setWs] = useState(null);
  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:3000");
    setWs(socket);
    socket.onmessage=(event)=>{
      const data = JSON.parse(event.data);
      if(data.type === "assign"){
        if(!data.symbol){
          toast.success("Você é um espectador e não pode jogar");
        }
        else{
          setMysymbol(data.symbol);
          toast.success(`Você é o jogador ${data.symbol}`);
        }
      }
      if(data.type === "info")
      {
        toast.info(data.message);

      }
      if(data.type === "update"){
        setBoard(data.board);
        setCurrentPlayer(data.next);
        //atualizar a pontuação
        const winner = checkWin(data.board);
        if(winner){
          if(winner === "draw"){
            setScores(prevScores=>({...prevScores, draw:prevScores.draw + 1}));

          }
          else{
            setScores(prevScores=>({...prevScores, [winner]:prevScores[winner] + 1}));
          }
        }
      }
      if(data.type === "restart"){
        setBoard(data.board);
        setCurrentPlayer(data.next);
      }
    };
    return()=>socket.close();
  },[]);
  
  //reagir e atualizar a exibição
  const winner = checkWin(board);

  const handlePlay = (index) => {
    if(ws && ws.readyState === 1 && !board[index] && !checkWin(board)) {
      ws.send(JSON.stringify({type: "play", index, symbol: mySymbol}))
    }
  }

  const handleRestart = () => {
    if(ws && ws.readyState === 1) {
      ws.send(JSON.stringify({type: "restart"}))
    }
  }

  return (
    <div className='game'>
      <h1>Jogo da Velha</h1>
      <Scoreboard scores={scores}/>
      <Board board={board} onPlay={handlePlay} disabled={!!winner || currentPlayer !== mySymbol} />

      {winner && (
        <div className='game-status'>
          <p>
            {winner === "draw" ? "Empate" : `Vencedor: ${winner}`}
          </p>
          <button onClick={handleRestart}>Jogar novamente</button>
        </div>
      )}
      <ToastContainer position='top-center' autoClose={4000} />
    </div>
  );
}

export default App
