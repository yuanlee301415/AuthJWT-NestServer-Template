import {BadRequestException} from "@nestjs/common";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {CreatePostDto} from "../dto/create-post.dto";
import {UpdatePostDto} from "../dto/update-post.dto";
import {AuthUser} from "../../common/interfaces/AuthUser";

@Schema()
export class Post {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  desc: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  vote: number;

  @Prop({
    type: [String],
    required: true,
  })
  keywords: string[];

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

  constructor(post: CreatePostDto | UpdatePostDto) {
    if (post.title.trim().length === 0) {
      throw new BadRequestException(`[Post.title failed]:: 非空`);
    }

    if (post.desc.trim().length === 0) {
      throw new BadRequestException(`[Post.desc failed]:: 非空`);
    }

    if (post.content.trim().length === 0) {
      throw new BadRequestException(`[Post.content failed]:: 非空`);
    }

    this.title = post.title.trim();
    this.desc = post.desc;
    this.content = post.content;
    if (post.keywords) this.keywords = post.keywords;
  }
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
// console.log(PostSchema)
