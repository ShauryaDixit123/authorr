import { Module } from '@nestjs/common';
import { UserController } from './controllers/users.controller';
import { UserModuleService } from './services/users.service';
import { MediaController } from '../media-module/controllers/media.controller';
import { MediaService } from '../media-module/services/media.service';
import { userRepoProviders } from './entities/user.provider';

@Module({
  controllers: [UserController, MediaController],
  providers: [UserModuleService, MediaService],
  imports: [userRepoProviders],
})
export class UserModule {}
