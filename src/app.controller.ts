import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { Resp } from "./common/interfaces/Resp";
import { Token } from "./common/interfaces/Token";
import { AuthUser } from "./common/interfaces/AuthUser";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
