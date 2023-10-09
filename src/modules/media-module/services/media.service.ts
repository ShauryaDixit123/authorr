import { Injectable } from '@nestjs/common';
import { S3Service } from './s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Media, UserMedia } from '../entites/media.entity';
import { Repository } from 'typeorm';
import { MEDIA_IMAGE_TYPE } from '../constants/media.constants';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    @InjectRepository(UserMedia)
    private readonly userMediaRepo: Repository<UserMedia>,
  ) {}
  async uploadImage(params: {
    fileName: string;
    uploadedBy: string;
    s3path: string;
  }): Promise<Media> {
    const { fileName, uploadedBy, s3path } = params;
    const media = await this.mediaRepo.save({
      name: fileName,
      type: MEDIA_IMAGE_TYPE,
      slug: '',
      s3path: s3path,
      uploadedby: uploadedBy,
    });

    return media;
  }
  async uploadUserImage(params: {
    title: string;
    userId: string;
    mediaId: number;
    s3path: string;
  }): Promise<UserMedia> {
    return await this.userMediaRepo.save({
      ...params,
    });
  }
  async getUploadedImage(params: { userId; title: string }) {
    return await this.userMediaRepo.findOne({
      where: {
        uploaded_by: params.userId,
        title: params.title,
      },
    });
  }
}
