import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {Resp} from "../common/interfaces/Resp";
import {Token} from "../common/interfaces/Token";
import {RightsService} from "./rights.service";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AuthUser} from "../common/interfaces/AuthUser";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "../user/schemas/user.schema";


@Controller('rights')
export class RightsController {
  constructor(
    private readonly authService: AuthService,
    private readonly rightsService: RightsService
  ) {
  }

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<Resp<User>> {
    console.log(
      "RightsController>register>user>createUserDto:\n",
      createUserDto
    );
    const data = await this.rightsService.register(createUserDto)
    console.log(
      "RightsController>register>data:\n",
      data
    );

    return {
      code: 0,
      data
    };
  }

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
