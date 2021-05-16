// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {UsersService} from "./users/users.service";
import {PostService} from "./post/post.service";
import {CryptoUtil} from "./common/utils/crypto.util";

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    console.log(
      `\n\n---------------------------------------AppService/onModuleInit::start---------------------------------------`
    );
    let admin = await this.usersService.findByUsername("admin");
    if (!admin) {
      admin = await this.usersService.create({
        username: "admin",
        password: "123456",
      });
      console.warn(
        "AppService>onModuleInit>preset>admin:\n",
        JSON.stringify(admin, null, 2)
      );
    }

    const [, count] = await this.postService.findAll({page: 1, size: 1});
    if (!count) {
      const post = await this.postService.create(
        {_id: admin._id, username: admin.username},
        {
          title: "Preset-post-title",
          desc: "Preset-post-desc",
          content: "Preset-post-content",
          keywords: ["Preset post"],
        }
      );
      console.warn(
        "AppService>onModuleInit>preset>post:\n",
        JSON.stringify(post, null, 2)
      );
    }

    console.log(
      `---------------------------------------AppService/onModuleInit::end---------------------------------------\n\n`
    );
  }

  constructor(
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    private readonly usersService: UsersService,
    private readonly postService: PostService
  ) {
  }

  getHello(): string {
    return `Hello [${pkg.name}]! - ${new Date()}`;
  }
}
