import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user-module/user-module.module';
import { MediaModule } from './modules/media-module/media-module.module';
import { BlogModule } from './modules/blog-module/blog-module.module';
import { InitializePgdbConnection } from 'configs/local';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './modules/user-module/services/auth/local.strategy';

const InitializeEnv = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    InitializeEnv,
    InitializePgdbConnection,
    UserModule,
    MediaModule,
    BlogModule,
  ],
  providers: [GoogleStrategy],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
