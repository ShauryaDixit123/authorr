import {
  Media,
  UserMedia,
} from 'src/modules/media-module/entites/media.entity';
import {
  AuthorDetail,
  AuthorDetailsBook,
  Book,
  Role,
  User,
} from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

export const userRepoProviders = TypeOrmModule.forFeature([
  User,
  Role,
  AuthorDetail,
  Book,
  AuthorDetailsBook,
  UserMedia,
  Media,
]);
