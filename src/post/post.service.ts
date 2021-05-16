import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Post, PostDocument} from "./schemas/post.schema";
import {PageQuery} from "../common/interfaces/PageQuery";
import {AuthUser} from "../common/interfaces/AuthUser";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>
  ) {
  }

  async create(
    authUser: AuthUser,
    createPostDto: CreatePostDto
  ): Promise<Post> {
    const createdPost = new this.postModel({
      ...new Post(createPostDto),
      createdUser: authUser,
      createdAt: new Date(),
    });
    console.log("PostService>createdPost:", createdPost);
    return await createdPost.save();
  }

  async findAll({page, size}: PageQuery): Promise<[Post[], number]> {
    // console.log('PostService>findAll>query:', arguments);
    const posts = await this.postModel
      .find()
      .sort({createdAt: -1})
      .skip((page - 1) * size)
      .limit(size);
    const count = await this.postModel.countDocuments();
    console.log("PostService>findAll>count:", count);
    return [posts, count];
  }

  async findByUserId(
    userId: string,
    {page, size}: PageQuery
  ): Promise<[Post[], number]> {
    console.log("PostService>findByUserId>userId:", userId);
    const ret = await this.postModel
      .find({"createdUser._id": userId})
      .sort({createdAt: -1})
      .skip((page - 1) * size)
      .limit(size);
    const count = await this.postModel.countDocuments({
      "createdUser._id": userId,
    });
    console.log("PostService>findAll>count:", count);
    return [ret, count];
  }

  async findById(id: string): Promise<Post> {
    console.log("PostService>findById>id:\n", id);
    const post = await this.postModel.findById(id);
    console.log("PostService>findById>post:", post);
    return post;
  }

  async updateOne(
    authUser: AuthUser,
    id: string,
    updatePostDto: UpdatePostDto
  ): Promise<Post> {
    console.log("PostService>authUser:", authUser);

    const newPost = new Post(updatePostDto);
    console.log("PostService>>update>newPost:", newPost);
    const ret = await this.postModel.findByIdAndUpdate(
      id,
      {...newPost, updatedUser: authUser, updatedAt: new Date()},
      {new: true, useFindAndModify: false}
    );
    console.log("PostService>update>ret:", ret);
    return ret;
  }

  async star(authUser: AuthUser, id: string): Promise<Post> {
    const post = await this.findById(id);
    console.log("PostService>>start>post:", post);
    if (!post) return;

    const vote = post.vote + 1;
    console.log("PostService>>start>vote:", vote);

    const ret = await this.postModel.findByIdAndUpdate(
      id,
      {vote, updatedUser: authUser, updatedAt: new Date()},
      {new: true, useFindAndModify: false}
    );
    return ret;
  }

  async unstar(authUser: AuthUser, id: string): Promise<Post> {
    const post = await this.findById(id);
    console.log("PostService>>unstar>post:", post);
    if (!post) return;

    const vote = post.vote - 1;
    console.log("PostService>>unstar>vote:", vote);

    if (vote < 0) return;

    const ret = await this.postModel.findByIdAndUpdate(
      id,
      {vote, updatedUser: authUser, updatedAt: new Date()},
      {new: true, useFindAndModify: false}
    );
    return ret;
  }

  async deleteOne(id: string): Promise<Post> {
    const ret = await this.postModel.findByIdAndRemove(id);
    console.log("PostService>deleteOne>ret:", ret);
    return ret;
  }
}
