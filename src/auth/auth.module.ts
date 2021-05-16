import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {LocalStrategy} from "./strategies/local.strategy";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: "3600s"},
    }),
    CommonModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
