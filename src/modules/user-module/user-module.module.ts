import { Module, Global } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';
import { MediaModule } from '../media-module/media-module.module';
import { AuthorCanActivateGuard } from './services/auth/auth.gaurd';

const registerJWTModule = JwtModule.register({
  global: true,
  secret: mapEnvVariables().jwt.secret,
  signOptions: { expiresIn: '60s' },
});

const registerPassportModule = PassportModule.register({
  defaultStrategy: 'google',
});
@Module({
  controllers: [UserController, AuthController],
  providers: [UserModuleService, AuthService],
  imports: [
    PassportModule,
    MediaModule,
    userRepoProviders,
    registerJWTModule,
    registerPassportModule,
  ],
  exports: [PassportModule, AuthService, UserModuleService],
})
@Global()
@Module({
  imports: [AuthService],
  exports: [AuthService, UserModule],
})
export class UserModule {}
