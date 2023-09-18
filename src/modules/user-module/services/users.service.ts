import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role, User } from '../entities/users.entity';
import { User as UserDTO } from '../dtos/user.type';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async createUser(user: UserDTO): Promise<User> {
    return await this.userRepo.save(user);
  }

  async findUserBy(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async createRole(role: string): Promise<Role> {
    return await this.roleRepo.save({
      name: role,
    });
  }

  async findRoleIdByName(role: string): Promise<number | null> {
    return this.roleRepo
      .findOne({
        where: {
          name: role,
        },
      })
      .then((res) => (res ? res.id : null));
  }

  async findRoleById(id: number) {
    return await this.roleRepo.findOne({
      where: {
        id: id,
      },
    });
  }
}
