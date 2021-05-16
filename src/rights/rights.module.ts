import {Module} from '@nestjs/common';
import {RightsController} from './rights.controller';
import {RightsService} from './rights.service';
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [RightsController],
  imports: [
    AuthModule,
    UserModule
  ],
  providers: [RightsService]
})
export class RightsModule {
}
