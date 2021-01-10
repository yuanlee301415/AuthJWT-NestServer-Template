import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BadRequestException } from "@nestjs/common";
import { Document } from "mongoose";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { AuthUser } from "../../common/interfaces/AuthUser";

@Schema()
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  postId: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Number,
    default: 0,
  })
  vote: number;

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

  constructor(comment: CreateCommentDto) {
    if (comment.content.trim().length === 0) {
      throw new BadRequestException(`[Comment.content failed]:: 非空`);
    }

    this.content = comment.content;
  }
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
