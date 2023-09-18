import { Role, User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

export const userRepoProviders = TypeOrmModule.forFeature([User, Role]);
