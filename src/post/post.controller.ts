import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Post as POST} from "./schemas/post.schema";
import {TransformIntQuery} from "../common/transform/query.transform";
import {Resp} from "../common/interfaces/Resp";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createPostDto: CreatePostDto
  ): Promise<Resp<POST>> {
    // console.log("PostController>create>post>req.user:\n", req.user);
    // console.log("PostController>create>post>createPostDto:\n", createPostDto);
    const createdPost = await this.postService.create(req.user, createPostDto);
    return {
      code: 0,
      data: createdPost,
    };
  }

  @Get()
  async findAll(@Query(new TransformIntQuery()) query): Promise<Resp<POST[]>> {
    // console.log("PostController>findAll>query:\n", query);
    const [posts, count] = await this.postService.findAll(query);
    return {
      code: 0,
      data: posts,
      total: count,
      page: query.page,
      size: query.size,
    };
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Resp<POST>> {
    const post = await this.postService.findById(id);
    return {
      code: 0,
      data: post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(
    @Req() req,
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Resp<POST>> {
    console.log("PostController>updateOne>updatePostDto:\n", updatePostDto);
    const updatedPost = await this.postService.updateOne(
      req.user,
      id,
      updatePostDto
    );
    return {
      code: 0,
      data: updatedPost,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/star")
  async star(@Req() req, @Param("id") id: string): Promise<Resp<POST>> {
    const updatedPost = await this.postService.star(req.user, id);
    return {
      code: 0,
      data: updatedPost,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/unstar")
  async unstar(@Req() req, @Param("id") id: string): Promise<Resp<POST>> {
    const updatedPost = await this.postService.unstar(req.user, id);
    return {
      code: 0,
      data: updatedPost,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteOne(@Req() req, @Param("id") id: string): Promise<Resp<POST>> {
    const deletedPost = await this.postService.deleteOne(id);
    return {
      code: 0,
      data: deletedPost,
    };
  }

  @Get("user/:userId")
  async findByUserId(
    @Param("userId") userId: string,
    @Query(new TransformIntQuery()) query
  ): Promise<Resp<POST[]>> {
    console.log("PostController>findByUserId>query:\n", query);
    const [posts, count] = await this.postService.findByUserId(userId, query);
    return {
      code: 0,
      data: posts,
      total: count,
      page: query.page,
      size: query.size,
    };
  }
}
