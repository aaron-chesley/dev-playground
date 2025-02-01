import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { RouteHandlers } from './routes/RouteHandler';
import { SocketHandlers } from './sockets/SocketHandler';
import { CardlyGameManager } from './managers/CardlyGameManager';
import { ScumGameManager } from './managers/ScumGameManager';
import { CommunicationService } from './services/CommunicationService';
import { config } from './config';
import { UserSocketMap } from './services/UserSocketMap';
import { CardlyGame } from '@playground/cardly-util';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = new UserSocketMap();
const commService = new CommunicationService(io, userSocketMap);
const cardlyGameManager = new CardlyGameManager();
cardlyGameManager.registerGameManager(CardlyGame.SCUM, new ScumGameManager(commService));

new RouteHandlers(app);
new SocketHandlers(io, cardlyGameManager, userSocketMap);

server.listen(config.port, config.serverAddress, () => {
  console.log(`Server is running on port ${config.port}`);
});
