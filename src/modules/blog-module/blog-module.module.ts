import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { blogRepoProviders } from './entites/blg.provider';

@Module({
  imports: [blogRepoProviders],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
