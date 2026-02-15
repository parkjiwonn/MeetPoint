import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.["refresh_token"];

    if (!token) {
      throw new UnauthorizedException("Refresh token not found");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      });
      request["user"] = { ...payload, refreshToken: token };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return true;
  }
}
