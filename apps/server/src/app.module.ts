import { Controller, Get, Module } from "@nestjs/common";
import { ChatModule } from "./chat/chat.module";
import { LocationModule } from "./location/location.module";
import { PlaceModule } from "./place/place.module";
import { RoomModule } from "./room/room.module";

@Controller()
class HealthController {
  @Get()
  health() {
    return { status: "ok", service: "meet-point-server" };
  }
}

@Module({
  imports: [ChatModule, LocationModule, PlaceModule, RoomModule],
  controllers: [HealthController],
})
export class AppModule {}
