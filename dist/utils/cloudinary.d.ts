import * as Cloudinary from 'cloudinary';
export declare const cloudinary: typeof Cloudinary.v2;
export declare const cloudinaryUpload: (image: string) => Promise<string>;
