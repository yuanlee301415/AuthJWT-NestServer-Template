import {BadRequestException} from "@nestjs/common";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {CreateUserDto} from "../dto/create-user.dto";
import {AuthUser} from "../../common/interfaces/AuthUser";

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Array,
    required: true,
  })
  roles: string[];

  @Prop({
    type: Object,
  })
  createdUser?: AuthUser;

  @Prop({
    type: Date,
  })
  createdAt?: Date;

  @Prop({
    type: Object,
  })
  updatedUser?: AuthUser;

  @Prop({
    type: Date,
  })
  updatedAt?: Date;

  _id?: string;

  constructor(user: CreateUserDto) {
    const RE = /^[a-z][a-z0-9_\-]{4,10}$/i;
    if (!RE.test(user.username)) {
      throw new BadRequestException(
        `[User.username failed]:: 用户名只支持: 字母开头，5-10字母、数字，不区分大小写`
      );
    }

    this.username = user.username;
    this.password = user.password;
    this.roles = Array.prototype.concat(user.roles);
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
