import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { S3Service } from '../services/s3.service';
import { MediaService } from '../services/media.service';
import {
  USER_PROFILE_IMAGE,
  USER_PROFILE_IMAGE_PATH,
} from '../constants/media.constants';
import { ServerError } from 'src/common/exceptions/error';
import { JWTActivateGuard } from 'src/modules/user-module/services/auth/auth.gaurd';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly s3Service: S3Service,
  ) {}
  @Post('/user/profile-image')
  async uploadUserProfileImage(
    fileName: string,
    file: ArrayBuffer,
    userId: string,
  ) {
    const s3Path = `${USER_PROFILE_IMAGE_PATH}/${userId}/${fileName}}`;
    try {
      await this.s3Service.uploadObjectToS3(s3Path, file);
      const media = await this.mediaService.uploadImage({
        fileName,
        uploadedBy: userId,
        s3path: s3Path,
      });
      await this.mediaService.uploadUserImage({
        title: USER_PROFILE_IMAGE,
        userId,
        mediaId: media.id,
        s3path: s3Path,
      });
    } catch (er) {
      throw new ServerError(er.message);
    }
    return s3Path;
  }
}
