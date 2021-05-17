// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {UserService} from "./user/user.service";
import {PostService} from "./post/post.service";
import {CryptoUtil} from "./common/utils/crypto.util";
import RoleEnum from "./user/role.enum";

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    console.log(
      `\n\n---------------------------------------AppService/onModuleInit::start---------------------------------------`
    );
    let admin = await this.userService.findByUsername("admin");
    if (!admin) {
      admin = await this.userService.create({
        username: "admin",
        password: "123456",
        roles: [RoleEnum.Web, RoleEnum.Admin]
      });
      console.warn(
        "AppService>onModuleInit>preset>admin user:\n",
        JSON.stringify(admin, null, 2)
      );
    }

    let webUser = await this.userService.findByUsername("webUser");
    if (!webUser) {
      webUser = await this.userService.create({
        username: "webUser",
        password: "123456",
        roles: [RoleEnum.Web]
      });
      console.warn(
        "AppService>onModuleInit>preset>web user:\n",
        JSON.stringify(webUser, null, 2)
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
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {
  }

  getHello(): string {
    return `Hello [${pkg.name}]! - ${new Date()}`;
  }
}
