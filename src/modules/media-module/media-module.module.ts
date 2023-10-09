import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';
import { S3Service } from './services/s3.service';
import { ConfigModule } from '@nestjs/config';
import { mediaRepoProviders } from './services/media.provider';

@Module({
  imports: [ConfigModule, mediaRepoProviders],
  controllers: [MediaController],
  providers: [MediaService, S3Service],
  exports: [MediaService, S3Service],
})
export class MediaModule {}
