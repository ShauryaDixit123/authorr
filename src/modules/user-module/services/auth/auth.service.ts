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
  async validateUser(email: string, userPassword: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.password === userPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
  async validateToken(token: string) {
    const val = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    return val;
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
