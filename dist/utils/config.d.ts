export declare const CLIENT_URL: string;
declare const config: {
    MONGO_URI: string;
    V2_MONGO_URI: string;
    SENDGRID_API_KEY: string;
    SECRET: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_SECRET: string;
    TOKEN_NAME: string;
    REDIS_URI: string;
    PAYSTACK_SK: string;
    DOMAIN_NAME: string;
    mailInfo: {
        from: {
            email: string;
            name: string;
        };
    };
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_PROJECT_ID: string;
    ORIGINS: string[];
    mailjet_api_key: string;
    mailjet_secret: string;
};
export declare const mongooseOption: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    useCreateIndex: boolean;
    useFindAndModify: boolean;
};
export default config;
