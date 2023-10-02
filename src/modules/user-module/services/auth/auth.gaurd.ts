import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoogleAuthGaurd extends AuthGuard('google') {}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JWTAuthGaurd extends AuthGuard('jwt') {}
