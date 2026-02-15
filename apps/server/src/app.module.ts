import { Controller, Get, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./chat/chat.module";
import { LocationModule } from "./location/location.module";
import { PlaceModule } from "./place/place.module";
import { RoomModule } from "./room/room.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { Public } from "./auth/decorators/public.decorator";

@Controller()
class HealthController {
  @Public()
  @Get()
  health() {
    return { status: "ok", service: "meet-point-server" };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    ChatModule,
    LocationModule,
    PlaceModule,
    RoomModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
