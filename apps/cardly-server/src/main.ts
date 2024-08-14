import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { RouteHandlers } from './RouteHandler';
import { SocketHandlers } from './SocketHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const routeHandler = new RouteHandlers(app);
const socketHandler = new SocketHandlers(io);

const port = parseInt(process.env.PORT) || 3000;

server.listen(port, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
