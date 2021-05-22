import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {User} from "../../user/schemas/user.schema";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    // console.log("LocalStrategy:", {username, password});
    const user = await this.authService.validateUser(username, password);
    // console.log("LocalStrategy>user:", user);
    return user;
  }
}
