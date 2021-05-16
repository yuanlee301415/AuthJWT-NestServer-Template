import {Module} from '@nestjs/common';
import {RightsController} from './rights.controller';
import {RightsService} from './rights.service';
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [RightsController],
  imports: [
    AuthModule,
    UsersModule
  ],
  providers: [RightsService]
})
export class RightsModule {
}
