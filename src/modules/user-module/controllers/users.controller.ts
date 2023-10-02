import { Body, Controller, Get, Param, Post, Inject } from '@nestjs/common';
import { UserModuleService } from '../services/users.service';
import { User } from '../dtos/user.type';
import {
  ADD_TOKEN,
  AUTHOR_ROLE,
  READER_ROLE,
  USER_ALREADY_EXISTS,
} from '../constants/user.constant';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/auth/auth.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserModuleService,
    @Inject(AuthService) private client: ClientProxy,
  ) {}
  @Post('/create')
  async signup(@Body() body: User) {
    if (body.is_author) {
      body.role = AUTHOR_ROLE;
    } else {
      body.role = READER_ROLE;
    }
    const roleId = await this.userService.findRoleIdByName(
      body.role || READER_ROLE,
    );
    const user = await this.userService.findUserByEmail(body.email);
    if (user) {
      return {
        message: USER_ALREADY_EXISTS,
      };
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userDetails = await this.userService.createUser({
      ...body,
      book_url: '',
      password: hashedPassword,
      role_id: roleId || 1,
    });
    // const res = await this.client.emit(ADD_TOKEN, { ...body });
    // console.log('res', res);
    return userDetails;
  }

  @Post('/create-role')
  async createRole(@Body() body: { role: string; createdBy: string }) {
    return await this.userService.createRole(body.role);
  }
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findUserRole(id);
  }
}
