export class UserSocketMap {
  private map: { [userId: string]: string } = {};

  public set(userId: string, socketId: string): void {
    this.map[userId] = socketId;
  }

  public get(userId: string): string | undefined {
    return this.map[userId];
  }

  public delete(userId: string): void {
    delete this.map[userId];
  }

  public getAll(): { [userId: string]: string } {
    return this.map;
  }
}
