import { Module } from '@nestjs/common';
import { UserController } from './controllers/users.controller';
import { UserModuleService } from './services/users.service';
import { MediaController } from '../media-module/controllers/media.controller';
import { MediaService } from '../media-module/services/media.service';
import { userRepoProviders } from './entities/user.provider';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [UserController, MediaController, AuthController],
  providers: [UserModuleService, MediaService, AuthService],
  imports: [userRepoProviders],
})
export class UserModule {}
