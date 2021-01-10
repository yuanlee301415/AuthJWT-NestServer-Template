import {
  Controller,
  Post,
  Get,
  Req,
  Param,
  Body,
  UseGuards,
  Query,
  Delete,
} from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TransformIntQuery } from "../common/transform/query.transform";
import { Resp } from "../common/interfaces/Resp";
import { Comment } from "./schemas/comment.schema";
import { Post as POST } from "../post/schemas/post.schema";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":postId")
  async createComment(
    @Req() req,
    @Param("postId") postId: string,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<Resp<Comment>> {
    const createdPost = await this.commentService.create(
      postId,
      createCommentDto,
      req.user
    );
    return {
      code: 0,
      data: createdPost,
    };
  }

  @Get(":postId")
  async getCommentsByPostId(
    @Query(new TransformIntQuery()) query,
    @Param("postId") postId: string
  ): Promise<Resp<Comment[]>> {
    const [comments, count] = await this.commentService.getCommentsByPostId(
      query,
      postId
    );
    return {
      code: 0,
      data: comments,
      page: query.page,
      size: query.size,
      total: count,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteOne(@Req() req, @Param("id") id: string): Promise<Resp<Comment>> {
    const deletedComment = await this.commentService.deleteOne(id);
    return {
      code: 0,
      data: deletedComment,
    };
  }
}
