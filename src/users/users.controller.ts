import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Req,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { TransformIntQuery } from "../common/transform/query.transform";
import { Resp } from "../common/interfaces/Resp";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<Resp<User>> {
    console.log(
      "user.controller>register>user>createUserDto:\n",
      createUserDto
    );
    return {
      code: 0,
      data: await this.userService.register(createUserDto),
    };
  }

  @Get()
  async findAll(@Query(new TransformIntQuery()) query): Promise<Resp<User[]>> {
    console.log("user.controller>findAll>query:\n", query);
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
    console.log("user.controller>findById>id:\n", id);
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
