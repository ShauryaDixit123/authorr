import { Module } from '@nestjs/common';
import { UserController } from './controllers/users.controller';
import { UserModuleService } from './services/users.service';
import { MediaController } from '../media-module/controllers/media.controller';
import { MediaService } from '../media-module/services/media.service';
import { userRepoProviders } from './entities/user.provider';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { mapEnvVariables } from 'configs/local';

const registerJWTModule = JwtModule.register({
  global: true,
  secret: mapEnvVariables().jwt.secret,
  signOptions: { expiresIn: '60s' },
});

const registerPassportModule = PassportModule.register({
  defaultStrategy: 'google',
});
@Module({
  controllers: [UserController, MediaController, AuthController],
  providers: [UserModuleService, MediaService, AuthService],
  imports: [
    PassportModule,
    userRepoProviders,
    registerJWTModule,
    registerPassportModule,
  ],
  exports: [PassportModule],
})
export class UserModule {}
