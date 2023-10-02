import { Injectable } from '@nestjs/common';
import { UserModuleService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { User as UserDTO } from '../../dtos/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserModuleService,
  ) {}
  async validateUser(
    email: string,
    mobile: string,
    userPassword: string,
  ): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.mobile === mobile) {
      if (userPassword !== user.password) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(data: UserDTO) {
    const userDetails = await this.userService.findUserByEmail(data.email);
    if (!userDetails) {
      return null;
    }
    return this.generateToken({
      sub: userDetails.id,
      email: userDetails.email,
    });
  }
}
