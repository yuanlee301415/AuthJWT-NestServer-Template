import {Controller, Post, Req, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {Resp} from "../common/interfaces/Resp";
import {Token} from "../common/interfaces/Token";
import {AuthService} from "../auth/auth.service";


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
}
