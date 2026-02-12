import { Injectable } from "@nestjs/common";
import type { ChatMessage } from "@meet-point/shared";

@Injectable()
export class ChatService {
  getMessages(roomId: string): ChatMessage[] {
    return [];
  }
}
