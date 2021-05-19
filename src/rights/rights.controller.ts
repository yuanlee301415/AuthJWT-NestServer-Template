import {Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {Resp} from "../common/interfaces/Resp";
import {Token} from "../common/interfaces/Token";
import {RightsService} from "./rights.service";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AuthUser} from "../common/interfaces/AuthUser";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "../user/schemas/user.schema";
import RoleEnum from "../user/role.enum";

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
    const data = await this.rightsService.register({ ...createUserDto, roles: [RoleEnum.Web]/*只能注册前台角色的用户*/ })
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
  async login(@Req() req, @Body() body: {username: string, password: string, type: string}): Promise<Resp<Token>> {
    console.log("RightsController>login>req.user:", req.user);
    console.log("RightsController>login>body:", body);
    if (!req.user.roles || !req.user.roles.includes(body.type)) throw new UnauthorizedException(); // 无权限

    return {
      code: 0,
      data: {
        access_token: await this.authService.login(req.user)
      },
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
