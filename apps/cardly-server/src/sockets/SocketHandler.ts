import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { CardlyUser, CardlyPayload } from '@playground/cardly-util';
import { CardlyGameManager } from '../managers/CardlyGameManager';
import { Serialized } from '@playground/shared/util/typescript';
import { config } from '../config';
import { UserSocketMap } from '../services/UserSocketMap';

export class SocketHandlers {
  private io: Server;
  private userSocketMap: UserSocketMap;
  private cardlyGameManager: CardlyGameManager;

  constructor(io: Server, cardlyGameManager: CardlyGameManager, userSocketMap: UserSocketMap) {
    this.io = io;
    this.userSocketMap = userSocketMap;
    this.cardlyGameManager = cardlyGameManager;
    this.setupMiddlewares();
    this.setupSocketHandlers();
  }

  private setupMiddlewares(): void {
    this.io.use((socket, next) => {
      const cookie = socket.handshake.headers.cookie;

      if (!cookie) {
        next(new Error('Authentication error: No cookie found'));
        return;
      }

      const tokenMatch = cookie.match(/token=([^;]+)/);
      if (!tokenMatch || !tokenMatch[1]) {
        next(new Error('Authentication error: Token not found in cookie'));
        return;
      }

      const token = tokenMatch[1];

      try {
        const payload = jwt.verify(token, config.secretKey) as { user: CardlyUser };
        socket.user = payload.user;
        next();
      } catch (err) {
        next(new Error('Authentication error: Invalid token'));
      }
    });
  }

  private setupSocketHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected: ', socket.id, socket.user?.displayName);
      if (socket.user) {
        this.userSocketMap.set(socket.user.id, socket.id);
      }

      socket.on('msg', (msg: Serialized<CardlyPayload>) => {
        if (socket.user) {
          this.cardlyGameManager.handleMessage(msg, socket.user);
        }
      });

      socket.on('close', () => {
        console.log('Client disconnected');
        if (socket.user) {
          this.userSocketMap.delete(socket.user.id);
        }
      });
    });
  }
}
