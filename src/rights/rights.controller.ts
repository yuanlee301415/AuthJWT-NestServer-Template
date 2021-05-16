import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {Resp} from "../common/interfaces/Resp";
import {Token} from "../common/interfaces/Token";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AuthUser} from "../common/interfaces/AuthUser";


@Controller('rights')
export class RightsController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req): Promise<Resp<Token>> {
    console.log("RightsController>login>req.user:", req.user);
    return {
      code: 0,
      data: await this.authService.login(req.user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("authUser")
  getAuthUser(@Req() req): Resp<AuthUser> {
    console.log("RightsController>getAuthUser>req.user:", req.user);
    return {
      code: 0,
      data: req.user,
    };
  }
}
