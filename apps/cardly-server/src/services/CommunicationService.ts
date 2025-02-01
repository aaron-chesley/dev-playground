import { Server } from 'socket.io';
import { UserSocketMap } from './UserSocketMap';

export class CommunicationService {
  constructor(
    private io: Server,
    private userSocketMap: UserSocketMap,
  ) {}

  sendToUser(userId: string, message: any) {
    const socketId = this.userSocketMap.get(userId);
    this.io.to(socketId).emit('msg', message);
  }

  broadcastToGame(gameId: string, message: any) {
    this.io.to(gameId).emit('msg', message);
  }

  joinGameRoom(userId: string, gameId: string) {
    const socketId = this.userSocketMap.get(userId);
    this.io.sockets.sockets.get(socketId).join(gameId);
  }

  leaveGameRoom(userId: string, gameId: string) {
    const socketId = this.userSocketMap.get(userId);
    this.io.sockets.sockets.get(socketId).leave(gameId);
  }
}
