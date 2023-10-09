import { TypeOrmModule } from '@nestjs/typeorm';
import { Media, UserMedia } from './media.entity';

export const mediaRepoProviders = TypeOrmModule.forFeature([UserMedia, Media]);
