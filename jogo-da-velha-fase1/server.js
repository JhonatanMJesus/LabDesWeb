import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import {readFile} from 'fs';
import {join} from 'path';

const server = createServer((req, res) => {
    readFile(join('public', 'index.html'), (err, data) => {
        if(err){
            res.write(500);
            return res.end("Erro ao carregar o index.html")
        }
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(data);
    });
});

const wss = new WebSocketServer({server});
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;
const players = [];

function broadcast(data){
    wss.clients.forEach(client => {
        if(client.readyState == client.OPEN){
            client.send(JSON.stringify(data));
        }
    });
}

function checkWin(board, symbol){
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6], []
    ];
    return winConditions.some(condition => condition.every(index => board[index] === symbol))
}

wss.on("connection", (ws) => {
    if(players.length < 2) {
        const symbol = players.length == 0 ? "X" : "O";
        players.push({ws, symbol});
        ws.send(JSON.stringify({type:"assign", symbol}))
    } else {
        ws.send(JSON.stringify({type:"assign", symbol:null}));
    }
    ws.send(JSON.stringify({type:"state", board, currentPlayer, gameActive}));

    ws.on("close", () => {
        const index = players.findIndex(p => p.ws === ws);
        if(index !== -1) {
            players.splice(index, 1);
            currentPlayer = "X";
            gameActive = true;
            board = Array(9).fill(null);
            broadcast({type: "gameOver", board, currentPlayer, gameActive, reason: "Disconnect"});
            broadCast({type:"state", board, currentPlayer, gameActive});
        }
    })
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);
        if(data.type === "restart") {
            board = Array(9).fill(null);
            currentPlayer = "X";
            gameActive = true;
            broadcast({type:"state", board, currentPlayer, gameActive});
            return;
        }
        if(!gameActive) {
            return;
        }
        if(data.type === "play") {
            const{index, symbol} = data;
            const player = players.find(p => p.ws === ws);
            if(!player || player.symbol !== symbol) {
                return;
            }
            if(symbol === currentPlayer && board[index] === null) {
                board[index] = symbol;
                if(checkWin(board, symbol)) {
                    broadCast({type:"gameOver", winner:symbol, board});
                    gameActive = false;
                    currentPlayer = null;
                } else if(board.every(cell => cell !== null)){
                    broadCast({type:"gameOver", winner:null, board});
                    gameActive = false;
                    currentPlayer = null;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    broadCast({type:"play", index, symbol, next:currentPlayer, board});
                }
            }
        }
    })
});

const port = 3000;
server.listen(port, () => console.log(`Jogo da velha rodando na porta ${port} link: http://localhost:${port}`))
