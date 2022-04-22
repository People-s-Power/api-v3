import * as Cloudinary from 'cloudinary';
import config from './config';

export const cloudinary = Cloudinary.v2;

const options: Cloudinary.ConfigOptions = {
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
};

cloudinary.config(options);

export const cloudinaryUpload = async (image: string) => {
  try {
    const res = await cloudinary.uploader.upload(image, {
      fetch_format: 'auto',
      crop: 'scale',
      quality: 'auto',
    });
    return res.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
