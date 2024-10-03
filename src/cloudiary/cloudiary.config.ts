import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dtoe4qtxl',
      api_key: '738262777419421',
      api_secret: 'UqSAz1kpWyhDmjdWgi67_7v8qDs',
    });
  },
};
