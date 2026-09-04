import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'path';

import { WebSocketServer } from 'ws';

const PORT = process.env.PORT ?? 9000;

const httpServer = http.createServer(async function (req,res){
    const indexFile = await fs.readFile(path.resolve('./index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
});
const wsServer = new WebSocketServer({server: httpServer});

wsServer.on('connection', (websocket)=>{
    console.log('Websocket Connection....');

    websocket.on('message', (data)=>{
        console.log(`WebSocket Message Recv.`, data.toString());
        // Broadcast the message to all the clients connected...
        wsServer.clients.forEach((client) => {
            client.send(data.toString());
        })
    });
});

httpServer.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});