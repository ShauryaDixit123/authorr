import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
import { MessageError, ServerError } from 'src/common/exceptions/error';

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
    let user = await this.userService.findUserByEmail(body.email);
    if (user) {
      throw new MessageError(`User with ${body.email} already exists.`);
    }
    const roleId = await this.userService.findRoleIdByName(
      body.is_author ? AUTHOR_ROLE : READER_ROLE,
    );
    body.role_id = roleId;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    if (body.is_author) {
      user = await this.userService.createAuthor({ ...body });
    } else {
      user = await this.userService.createUser({ ...body });
    }
    return user;
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
      googleId: req.user.providerId,
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
    console.log(body);
    let user: User;
    let token;
    try {
      user = await this.createUser(body);
      token = await this.authService.generateToken({
        sub: user.id,
        email: user.email,
      });
    } catch (e) {
      new ServerError(e);
    }
    return {
      token,
      id: user.id,
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
    // console.log(bcrypt.)
    const isMatch = await bcrypt.compare(body.password, userDetails.password);
    if (!isMatch) {
      new ServerError(WRONG_CREDENTIALS);
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
