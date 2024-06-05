import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { createReadStream } from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    isPoster: boolean,
  ): Promise<CloudinaryResponse> {
    if (!file) {
      throw new BadRequestException('No image file sent');
    }

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: isPoster
            ? { width: 600, height: 900, crop: 'fill' }
            : {},
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  deleteImage(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  getPublicId = (imageUrl: string) => {
    const pathParts = imageUrl.split('/');
    const fileNameParts = pathParts.pop().split('.');
    return fileNameParts[0];
  };
}
