import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { CurrentUser } from "./decorators/current-user.decorator";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import type {
  LoginRequest,
  SignupRequest,
  JwtPayload,
} from "@meet-point/shared";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // true in production
  sameSite: "lax" as const,
  path: "/",
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  async signup(
    @Body() body: SignupRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signup(
      body.email,
      body.password,
      body.name,
    );
    const tokens = await this.authService.generateTokens(
      result.user.id,
      result.user.email,
    );
    this.setTokenCookies(res, tokens);
    return result;
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body.email, body.password);
    const tokens = await this.authService.generateTokens(
      result.user.id,
      result.user.email,
    );
    this.setTokenCookies(res, tokens);
    return result;
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.sub);
    res.clearCookie("access_token", COOKIE_OPTIONS);
    res.clearCookie("refresh_token", COOKIE_OPTIONS);
    return { message: "로그아웃 되었습니다" };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @CurrentUser() user: JwtPayload & { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(
      user.sub,
      user.email,
      user.refreshToken,
    );
    this.setTokenCookies(res, tokens);
    return { message: "토큰이 갱신되었습니다" };
  }

  @Get("me")
  async getMe(@CurrentUser() user: JwtPayload) {
    return this.authService.getMe(user.sub);
  }

  private setTokenCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    res.cookie("access_token", tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refresh_token", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
