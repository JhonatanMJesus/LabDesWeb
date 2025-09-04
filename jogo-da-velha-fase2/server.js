import { WebSocketServer } from "ws";
//servidor ws
const wss = new WebSocketServer({port:3000});
let currentPlayer = "X";
let board = Array(9).fill(null);
const players = [];

function broadCast(data)
{
    wss.clients.forEach((player)=>{
        if(wss.clients.readyState == WebSocket.OPEN)
        {
            wss.clients.send(JSON.stringify(data));
        }
    });
}

wss.on("connection", (ws)=>{
    if(players.length < 2)
    {
         //jogadores
        const symbol = players.length == 0?"X":"O";
        players.push({ws,symbol});
        console.log(`Jogador ${symbol} entrou. Número de Jogadores:${players.length}`);
        ws.send(JSON.stringify({type:"assign",symbol}));
        ws.send(JSON.stringify({type:"update", board, next:currentPlayer}));
    }
    else
    {
        //espectador
         ws.send(JSON.stringify({type:"assign",symbol:null}));
    }

    
    ws.on("close", ()=>{
        //procurar quem se desconectou
        const index = players.findIndex(p=>p.ws === ws);
        if(index !== -1)
        {
            const desconnectSymbol = players[index].symbol
            //remover o jogador que se desconectou
            players.splice(index, 1);
            currentPlayer = "X";
            board = Array(9).fill(null);
            console.log(`Jogo terminou! Jogador ${desconnectSymbol} se desconectou.`);
            broadCast({ type: 'info', message:`Jogo terminou! Jogador ${desconnectSymbol} se desconectou.`});
            broadCast({ type:"restart", board, next:currentPlayer });
        }
    });
    ws.on("message", (msg)=>{
        const data = JSON.parse(msg);
        if(data.type === "restart"){
            board = Array(9).fill(null);
            currentPlayer = "X";
            //acertar
            broadCast({type:"restart", board, next: currentPlayer});
            return;
        }
        
        if(data.type === "play"){
            
            if(data.symbol === currentPlayer && board[data.index] === null){
                board[data.index] = data.symbol;
                currentPlayer = data.symbol === "X"?"O":"X";
                broadCast({type:"update", board, next: currentPlayer});
            }
        }
    });
});

console.log("Jogo da Velha - webSocket rodando em ws://localhost:3000");
