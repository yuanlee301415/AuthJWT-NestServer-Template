import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "../constants";
import {UsersService} from "../../users/users.service";
import {AuthUser} from "../../common/interfaces/AuthUser";
import {AuthPayload} from "../../common/interfaces/AuthPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthPayload): Promise<AuthUser> {
    console.log("JwtStrategy>validate>payload:", payload);
    const user = await this.usersService.findById(payload.sub);
    console.log("JwtStrategy>validate>user:", user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      _id: payload.sub,
      username: payload.username,
    };
  }
}
