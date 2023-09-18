import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserModuleService } from '../services/users.service';
import { User } from '../dtos/user.type';
import { READER_ROLE } from '../constants/user.constant';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserModuleService) {}
  @Post('/create')
  async signup(@Body() body: User) {
    const roleId = await this.userService.findRoleIdByName(
      body.role || READER_ROLE,
    );
    return await this.userService.createUser({
      ...body,
      role_id: roleId || 1,
    });
  }
}
