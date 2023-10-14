import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Blog,
  BlogComment,
  BlogContent,
  BlogHeirarchy,
  BlogLike,
  BlogMedia,
  BlogTag,
  ContentType,
} from './blog.entity';
import { Style, StyleBlogContent } from './style.entity';

export const blogRepoProviders = TypeOrmModule.forFeature([
  Blog,
  ContentType,
  BlogContent,
  BlogLike,
  BlogComment,
  BlogTag,
  Style,
  StyleBlogContent,
  BlogMedia,
  BlogHeirarchy,
]);
