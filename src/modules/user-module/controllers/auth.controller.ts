import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthGaurd } from '../services/auth/auth.gaurd';
import { AuthService } from '../services/auth/auth.service';
import { Response } from 'express';
import { User as UserDTO } from '../dtos/user.type';
import {
  AUTHOR_ROLE,
  READER_ROLE,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
} from '../constants/user.constant';
import { UserModuleService } from '../services/users.service';
import { User } from '../entities/users.entity';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserModuleService,
    private readonly authService: AuthService,
  ) {}

  async createUser(body: UserDTO) {
    let userDetails: User;
    const user = await this.userService.findUserByEmail(body.email);
    if (!user) {
      if (body.is_author) {
        body.role = AUTHOR_ROLE;
      } else {
        body.role = READER_ROLE;
      }
      const roleId = await this.userService.findRoleIdByName(
        body.role || READER_ROLE,
      );
      const hashedPassword = await bcrypt.hash(body.password, 10);
      userDetails = await this.userService.createUser({
        ...body,
        book_url: '',
        password: hashedPassword,
        role_id: roleId || 1,
      });
    }
    return userDetails;
  }

  @Post('/google')
  async googleAuth(@Body('token') token: string): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload());
  }

  @Get('/google-login')
  @UseGuards(GoogleAuthGaurd)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginByGoogle() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGaurd)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    // const token = this.authService.signIn(req.user);
    const userDetails = await this.createUser({
      ...req.user,
      googleId: req.providerId,
      password: 'authorr-default-password',
      mobile: 'authorr-default-mobile',
    });
    const token = await this.authService.generateToken({
      sub: userDetails.id,
      email: userDetails.email,
    });
    res.cookie('ACCESS_TOKEN', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    return res.status(200);
  }
  @Post('/signup')
  async signup(@Body() body: UserDTO) {
    const userDetails = await this.createUser(body);
    const token = await this.authService.generateToken({
      sub: userDetails.id,
      email: userDetails.email,
    });
    return {
      token,
    };
  }
  @Post('/signin')
  async signin(@Body() body: { email: string; password: string }) {
    const userDetails = await this.userService.findUserByEmail(body.email);
    if (!userDetails) {
      return {
        message: USER_NOT_FOUND,
      };
    }
    const isMatch = await bcrypt.compare(body.password, userDetails.password);
    if (!isMatch) {
      return {
        message: WRONG_CREDENTIALS,
      };
    }
    const token = await this.authService.generateToken({
      sub: userDetails.id,
      email: userDetails.email,
    });
    return {
      token,
    };
  }
}
