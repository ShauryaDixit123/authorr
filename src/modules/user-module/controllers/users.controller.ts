import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserModuleService } from '../services/users.service';
import { User } from '../dtos/user.type';
import { AUTHOR_ROLE, READER_ROLE } from '../constants/user.constant';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserModuleService) {}
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
    const userDetails = await this.userService.createUser({
      ...body,
      book_url: '',
      role_id: roleId || 1,
    });
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
