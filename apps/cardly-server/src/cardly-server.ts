import { Server, Socket } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
import {
  CreateNewGameRequest,
  CreateNewGameResponse,
  SubscribeToGameUpdatesRequest,
  ScumGame,
  StartGameRequest,
  PlayCardsRequest,
  PassTurnRequest,
  StartNewRoundRequest,
  SwapCardsRequest,
} from '@playground/cardly-util';

export class CardlyServer {
  private server: http.Server;
  private io: Server;
  private app: express.Application;
  private games: { [gameId: string]: ScumGame };

  constructor() {
    this.games = {};
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // Use Express to handle HTTP requests
    this.server = http.createServer(this.app);
    this.server.on('request', this.app);

    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    // Create a new game
    this.app.post('/create-game', (req, res) => {});

    // Join a game
    this.app.post('/join-game', (req, res) => {});

    // Start a game
    this.app.post('/start-game', (req, res) => {});

    // Get game state
    this.app.get('/game-state', (req, res) => {});

    // Play cards
    this.app.post('/play-cards', (req, res) => {});

    // WebSocket connection handling
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected: ', socket.id);

      // socket.on('message', (message) => {
      //   this.gameManager.handleMessage(message, socket);
      // });

      socket.on('createNewGame', (payload: CreateNewGameRequest, cb) => {
        const game = new ScumGame(payload.user);
        this.games[game.gameId] = game;
        const response: CreateNewGameResponse = { gameId: game.gameId };
        cb(response);
      });

      socket.on('joinGame', (payload: any, cb) => {
        const game = this.games[payload.gameId];
        if (!game) {
          console.log('Game not found');
          return;
        }
        game.addUserToGame(payload.user);
        const users = game.getUsers();
        for (const user of users) {
          this.io.to(user.id).emit('gameStateUpdate', game.getCurrentGameState(user.id));
        }
        const response = { gameId: game.gameId };
        cb(response);
      });

      socket.on('startGame', (payload: StartGameRequest) => {
        const game = this.games[payload.gameId];
        game.startGame();
        const users = game.getUsers();
        for (const user of users) {
          this.io.to(user.id).emit('gameStateUpdate', game.getCurrentGameState(user.id));
        }
      });

      socket.on('playCards', (payload: PlayCardsRequest) => {
        const game = this.games[payload.gameId];
        game.playCards({ userId: payload.userId, cardsInPlay: payload.cards });
        const users = game.getUsers();
        for (const user of users) {
          this.io.to(user.id).emit('gameStateUpdate', game.getCurrentGameState(user.id));
        }
      });

      socket.on('passTurn', (payload: PassTurnRequest) => {
        const game = this.games[payload.gameId];
        game.passTurn(payload.userId);
        const users = game.getUsers();
        for (const user of users) {
          this.io.to(user.id).emit('gameStateUpdate', game.getCurrentGameState(user.id));
        }
      });

      socket.on('startNewRound', (payload: StartNewRoundRequest) => {
        const game = this.games[payload.gameId];
        game.startNewRound();
        const users = game.getUsers();
        for (const user of users) {
          this.io.to(user.id).emit('gameStateUpdate', game.getCurrentGameState(user.id));
        }
      });

      socket.on('swapCards', (payload: SwapCardsRequest) => {
        const game = this.games[payload.gameId];
        game.swapCards({ userId: payload.userId, cards: payload.cards });
        const users = game.getUsers();
        for (const user of users) {
          this.io.to(user.id).emit('gameStateUpdate', game.getCurrentGameState(user.id));
        }
      });

      socket.on('subscribeToGameUpdates', (payload: SubscribeToGameUpdatesRequest) => {
        socket.join(payload.gameId);
        socket.join(payload.userId);
        const game = this.games[payload.gameId];
        socket.emit('gameStateUpdate', game.getCurrentGameState(payload.userId));
      });

      socket.on('close', () => {
        console.log('Client disconnected');
      });
    });

    this.server.listen(3000, '0.0.0.0', () => {
      console.log('WebSocket server listening on port 3000');
    });
  }
}
