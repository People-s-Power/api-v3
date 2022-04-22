import * as sgMail from '@sendgrid/mail';
import config from './config';

sgMail.setApiKey(config.SENDGRID_API_KEY || '');

export async function sendMail(email: string, subject: string, html: string) {
  const mailOptions: sgMail.MailDataRequired = {
    from: {
      email: 'support@edfhr.org',
      name: 'ED Forum',
    },
    to: email,
    subject: subject,

    html,
  };
  try {
    return await sgMail.send(mailOptions);
  } catch (error) {
    throw error;
  }
}
