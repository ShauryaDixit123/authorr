import { Body, Controller, Post } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  @Post('/google')
  async googleAuth(@Body('token') token: string): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload());
  }
}
