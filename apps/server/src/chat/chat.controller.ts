import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import type { ChatMessage } from "@meet-point/shared";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":roomId")
  getMessages(@Param("roomId") roomId: string): ChatMessage[] {
    return this.chatService.getMessages(roomId);
  }
}
