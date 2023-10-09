import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Blog,
  BlogComment,
  BlogContent,
  BlogLike,
  BlogTag,
  ContentType,
} from './blog.entity';
import { Style, StyleContent } from './style.entity';

export const blogRepoProviders = TypeOrmModule.forFeature([
  Blog,
  ContentType,
  BlogContent,
  BlogLike,
  BlogComment,
  BlogTag,
  Style,
  StyleContent,
]);
