import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {PageQuery} from "../common/interfaces/PageQuery";
import {AuthUser} from "../common/interfaces/AuthUser";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>
  ) {
  }

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
    authUser: AuthUser
  ) {
    const comment = new this.commentModel({
      postId,
      ...new Comment(createCommentDto),
      createdUser: authUser,
      createdAt: new Date(),
    });
    // console.log('CommentService>>created>comment:', comment)
    return await comment.save();
  }

  async getCommentsByPostId(
    {page, size}: PageQuery,
    postId: string
  ): Promise<[Comment[], number]> {
    const comments = await this.commentModel
      .find({postId})
      .sort({createdAt: -1})
      .skip((page - 1) * size)
      .limit(size);
    // console.log('getCommentsByPostId>comments:', comments)
    const count = await this.commentModel.countDocuments({postId});
    // console.log('getCommentsByPostId>count:', count)
    return [comments, count];
  }

  async deleteOne(id: string): Promise<Comment> {
    const ret = await this.commentModel.findByIdAndRemove(id);
    console.log("CommentService>deleteOne>ret:", ret);
    return ret;
  }
}
