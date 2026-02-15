import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { DATABASE, Database } from "../database/database.module";
import { users } from "../database/schema";
import type { JwtPayload, AuthResponse } from "@meet-point/shared";

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE) private readonly db: Database,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResponse> {
    const existing = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      throw new ConflictException("이미 등록된 이메일입니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await this.db
      .insert(users)
      .values({ email, name, hashedPassword })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      });

    return { user: { ...user, createdAt: user.createdAt.toISOString() } };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 올바르지 않습니다");
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 올바르지 않습니다");
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
      },
    };
  }

  async generateTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
        expiresIn: this.configService.get("JWT_ACCESS_EXPIRATION") ?? "15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
        expiresIn: this.configService.get("JWT_REFRESH_EXPIRATION") ?? "7d",
      }),
    ]);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.db
      .update(users)
      .set({ hashedRefreshToken })
      .where(eq(users.id, userId));

    return { accessToken, refreshToken };
  }

  async logout(userId: string): Promise<void> {
    await this.db
      .update(users)
      .set({ hashedRefreshToken: null })
      .where(eq(users.id, userId));
  }

  async refreshTokens(
    userId: string,
    email: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [user] = await this.db
      .select({ hashedRefreshToken: users.hashedRefreshToken })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user?.hashedRefreshToken) {
      throw new ForbiddenException("Access denied");
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Access denied");
    }

    return this.generateTokens(userId, email);
  }

  async getMe(userId: string): Promise<AuthResponse> {
    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return { user: { ...user, createdAt: user.createdAt.toISOString() } };
  }
}
