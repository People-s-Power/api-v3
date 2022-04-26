"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const sgMail = require("@sendgrid/mail");
const config_1 = require("./config");
sgMail.setApiKey(config_1.default.SENDGRID_API_KEY || '');
async function sendMail(email, subject, html) {
    const mailOptions = {
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
    }
    catch (error) {
        throw error;
    }
}
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map