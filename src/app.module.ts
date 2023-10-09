import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user-module/user-module.module';
import { MediaModule } from './modules/media-module/media-module.module';
import { BlogModule } from './modules/blog-module/blog-module.module';
import {
  InitializePgdbConnection,
  InitializeLocalMediaConfig,
} from 'configs/local';
import { GoogleStrategy } from './modules/user-module/services/auth/local.strategy';
import { AuthService } from './modules/user-module/services/auth/auth.service';

const InitializeEnv = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    InitializeEnv,
    InitializePgdbConnection,
    InitializeLocalMediaConfig,
    UserModule,
    MediaModule,
    BlogModule,
  ],
  providers: [GoogleStrategy],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
