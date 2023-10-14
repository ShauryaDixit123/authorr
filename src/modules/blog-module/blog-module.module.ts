import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { blogRepoProviders } from './entites/blg.provider';
import { UserModule } from '../user-module/user-module.module';

@Module({
  imports: [blogRepoProviders, UserModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
