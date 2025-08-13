import {webSocket, WebSocketServer} from 'ws';
import { createServer } from 'http';
import {readFile} from 'fs';
import {join} from 'path';

const server = createServer((req, res) => {
    readFile(join('public', 'index.html'), (err, data) => {
        if(err){
            res.write(500);
            return res.end("Erro ao carregar o index.html")
        }
        res.writeHead(200, {"Content/Type" : "text/html"});
        res.end(data);
    });
});

const wss = new WebSocketServer({server});
