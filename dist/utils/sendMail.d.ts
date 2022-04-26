import * as sgMail from '@sendgrid/mail';
export declare function sendMail(email: string, subject: string, html: string): Promise<[sgMail.ClientResponse, {}]>;
