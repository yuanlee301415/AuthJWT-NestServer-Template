import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  UseGuards,
  Delete,
} from "@nestjs/common";

import {UserService} from "./user.service";
import {User} from "./schemas/user.schema";
import {TransformIntQuery} from "../common/transform/query.transform";
import {Resp} from "../common/interfaces/Resp";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll(@Query(new TransformIntQuery()) query): Promise<Resp<User[]>> {
    console.log("UserController>findAll>query:\n", query);
    const [users, count] = await this.userService.findAll(query);
    return {
      code: 0,
      data: users,
      total: count,
      page: query.page,
      size: query.size,
    };
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Resp<User>> {
    console.log("UserController>findById>id:\n", id);
    return {
      code: 0,
      data: await this.userService.findById(id),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteOne(@Req() req, @Param("id") id: string): Promise<Resp<User>> {
    const deletedUser = await this.userService.deleteOne(id);
    return {
      code: 0,
      data: deletedUser,
    };
  }
}
