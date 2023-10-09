import { TypeOrmModule } from '@nestjs/typeorm';
import { Media, UserMedia } from '../entites/media.entity';

export const mediaRepoProviders = TypeOrmModule.forFeature([Media, UserMedia]);
