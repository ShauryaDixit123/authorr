import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { UserModuleService } from '../services/users.service';
import { BookDTO, User as UserDTO } from '../dtos/user.type';
import {
  AUTHOR_ROLE,
  READER_ROLE,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
} from '../constants/user.constant';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/auth/auth.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthorCanActivateGuard,
  JWTActivateGuard,
} from '../services/auth/auth.gaurd';
import { ServerError } from 'src/common/exceptions/error';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorDetail, User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/modules/media-module/services/s3.service';
import { MediaService } from 'src/modules/media-module/services/media.service';
import { USER_PROFILE_IMAGE } from 'src/modules/media-module/constants/media.constants';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserModuleService,
    @InjectRepository(AuthorDetail)
    private readonly authorDetailRepo: Repository<AuthorDetail>,
    @Inject(AuthService) private client: ClientProxy,
    private readonly s3Service: S3Service,
    private readonly mediaService: MediaService,
  ) {}
  @Post('/create')
  async signup(@Body() body: UserDTO) {
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
      role: roleId.name,
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
  @Get('/author/get/:id')
  @UseGuards(JWTActivateGuard)
  async getUserDetails(@Param() params: { id: string }) {
    console.log(params.id);
    let userDetails: AuthorDetail;
    try {
      const userRole = await this.userService.findUserRole(params.id);
      if (userRole[0].role !== AUTHOR_ROLE) {
        throw new ServerError(WRONG_CREDENTIALS);
      }
      userDetails = await this.userService.findUserDetails(params.id);
      if (!userDetails) {
        throw new ServerError(USER_NOT_FOUND);
      }
      userDetails.author.password = '';
    } catch (e) {
      throw new ServerError(e.message);
    }
    return userDetails;
  }
  @Post('author/add/book')
  @UseGuards(AuthorCanActivateGuard)
  async verifyAuthorAddBook(@Body() body: BookDTO) {
    let book = await this.userService.findBookByISBN(body.isbn);
    if (!book) {
      book = await this.userService.createBook(body);
    }
    await this.userService.createAuthorDetailsBook({
      book_id: body.id,
      author_id: body.author_id,
    });
  }
  @Get('/user/profile-image/:userId')
  @UseGuards(JWTActivateGuard)
  async getUserProfileImage(@Param() param: { userId: string }) {
    const userMedia = await this.mediaService.getUploadedImage({
      userId: param.userId,
      title: USER_PROFILE_IMAGE,
    });
    const imgS3Url = await this.s3Service.getSignedUrlByPath(userMedia.s3path);
    return { ...userMedia, profile_signed_url: imgS3Url };
  }
  // @Get('author/')
}
