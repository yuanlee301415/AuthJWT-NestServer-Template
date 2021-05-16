import {Injectable, Inject} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {User} from "../user/schemas/user.schema";
import {Token} from "../common/interfaces/Token";
import {CryptoUtil} from "../common/utils/crypto.util";
import {AuthPayload} from "../common/interfaces/AuthPayload";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CryptoUtil) readonly cryptoUtil: CryptoUtil
  ) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    console.log(
      "AuthService>validateUser>username/password:",
      username,
      password
    );
    const user = await this.userService.findByUsername(username);
    console.log("AuthService>validateUser>user:", user);
    if (user && this.cryptoUtil.checkPassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<Token> {
    console.log("AuthService>login>user:", user);
    const payload: AuthPayload = {
      username: user.username,
      sub: String(user._id),
    };
    console.log("AuthService>login>payload:", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
