import { Server } from 'socket.io';

export class CommunicationService {
  constructor(
    private io: Server,
    private userSocketMap: { [userId: string]: string },
  ) {}

  sendToUser(userId: string, message: any) {
    this.io.to(this.userSocketMap[userId]).emit('msg', message);
  }

  broadcastToGame(gameId: string, message: any) {
    this.io.to(gameId).emit('msg', message);
  }

  joinGameRoom(userId: string, gameId: string) {
    this.io.sockets.sockets.get(this.userSocketMap[userId]).join(gameId);
  }

  leaveGameRoom(userId: string, gameId: string) {
    this.io.sockets.sockets.get(this.userSocketMap[userId]).leave(gameId);
  }
}
