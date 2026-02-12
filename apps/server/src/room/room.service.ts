import { Injectable } from "@nestjs/common";
import type { Room } from "@meet-point/shared";

@Injectable()
export class RoomService {
  private rooms: Room[] = [];

  create(name: string): Room {
    const room: Room = {
      id: crypto.randomUUID(),
      name,
      participants: [],
      createdAt: new Date(),
    };
    this.rooms.push(room);
    return room;
  }

  findOne(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }
}
