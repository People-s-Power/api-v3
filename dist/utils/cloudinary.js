"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.cloudinary = void 0;
const Cloudinary = require("cloudinary");
const config_1 = require("./config");
exports.cloudinary = Cloudinary.v2;
const options = {
    cloud_name: config_1.default.CLOUDINARY_NAME,
    api_key: config_1.default.CLOUDINARY_KEY,
    api_secret: config_1.default.CLOUDINARY_SECRET,
};
exports.cloudinary.config(options);
const cloudinaryUpload = async (image) => {
    try {
        const res = await exports.cloudinary.uploader.upload(image, {
            fetch_format: 'auto',
            crop: 'scale',
            quality: 'auto',
        });
        return res.secure_url;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
exports.cloudinaryUpload = cloudinaryUpload;
//# sourceMappingURL=cloudinary.js.map