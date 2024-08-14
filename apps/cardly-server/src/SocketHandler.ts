import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { CardlyUser, CardlyPayload } from '@playground/cardly-util';
import { CardlyGameManager } from './CardlyGameManager';
import { CommunicationService } from './CommunicationService';
import { Serialized } from '@playground/shared/util/typescript';

const secretKey = 'myCoolSecretKey';

export class SocketHandlers {
  private io: Server;
  private userSocketMap: { [userId: string]: string };
  private commService: CommunicationService;
  private cardlyGameManager: CardlyGameManager;

  constructor(io: Server) {
    this.io = io;
    this.userSocketMap = {};
    this.commService = new CommunicationService(this.io, this.userSocketMap);
    this.cardlyGameManager = new CardlyGameManager(this.commService);
    this.setupMiddlewares();
    this.setupSocketHandlers();
  }

  private setupMiddlewares(): void {
    this.io.use((socket, next) => {
      const cookie = socket.handshake.headers.cookie;

      if (!cookie) {
        next(new Error('Authentication error'));
        return;
      }

      const tokenMatch = cookie.match(/token=([^;]+)/);
      if (!tokenMatch || !tokenMatch[1]) {
        next(new Error('Authentication error: Token not found in cookie'));
        return;
      }

      const token = tokenMatch[1];

      try {
        const payload = jwt.verify(token, secretKey) as { user: CardlyUser };
        socket.user = payload.user;
        next();
      } catch (err) {
        next(new Error('Authentication error'));
      }
    });
  }

  private setupSocketHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected: ', socket.id, socket.user.displayName);
      this.userSocketMap[socket.user.id] = socket.id;

      socket.on('msg', (msg: Serialized<CardlyPayload>) => {
        this.cardlyGameManager.handleMessage(msg, socket.user);
      });

      socket.on('close', () => {
        console.log('Client disconnected');
        delete this.userSocketMap[socket.id];
      });
    });
  }
}
