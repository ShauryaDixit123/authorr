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
    let userDetails: User;
    try {
      userDetails = await this.userRepo.save({ ...user, role: user.role_id });
    } catch (e) {
      console.log(e);
    }
    return userDetails;
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
  async findUserRole(id: string) {
    return await this.userRepo
      .createQueryBuilder('user')
      .select('user.role_id')
      .where('user.id = :id', { id: id })
      .andWhere('role.id = user.role_id')
      .innerJoin(Role, 'role')
      .getOne();
  }
}

// {
//     "first_name":"Shaurya",
//     "last_name":  "Dixit",
//     "email" : "shaurd224@gmail.com",
//     "mobile": "87870000",
//     "password": "shauryad224",
//     "is_author": false
// }
