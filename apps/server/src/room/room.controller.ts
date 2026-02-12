import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { RoomService } from "./room.service";
import type { Room } from "@meet-point/shared";

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() body: { name: string }): Room {
    return this.roomService.create(body.name);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Room | undefined {
    return this.roomService.findOne(id);
  }
}
