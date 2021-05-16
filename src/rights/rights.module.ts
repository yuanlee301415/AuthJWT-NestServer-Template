import { Module } from '@nestjs/common';
import { RightsController } from './rights.controller';
import { RightsService } from './rights.service';
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [RightsController],
  imports: [
    AuthModule
  ],
  providers: [RightsService]
})
export class RightsModule {}
