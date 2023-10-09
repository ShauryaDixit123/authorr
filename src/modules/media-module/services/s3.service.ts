import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { configService } from 'src/configs/config.service';

@Injectable()
export class S3Service {
  s3: AWS.S3;
  bucket: string;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: configService.getValue('AWS_ACCESS_KEY'),
      secretAccessKey: configService.getValue('AWS_ACCESS_SECRET_KEY'),
    });
    this.bucket = configService.getValue('AWS_S3_BUCKET_NAME');
  }
  async uploadObjectToS3(s3path: string, file: ArrayBuffer) {
    const params = {
      ACL: 'public-read',
      Bucket: this.bucket,
      Key: s3path,
      Body: file,
    };
    return await this.s3.upload(params);
  }
  async getSignedUrlByPath(s3path: string) {
    const params = {
      ACL: 'public-read',
      Bucket: this.bucket,
      Key: s3path,
    };
    return await this.s3.getSignedUrlPromise('get-object', params);
  }
}
