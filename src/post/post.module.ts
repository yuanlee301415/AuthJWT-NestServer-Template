import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {PostController} from "./post.controller";
import {PostService} from "./post.service";
import {Post, PostSchema} from "./schemas/post.schema";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
    UsersModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {
}
