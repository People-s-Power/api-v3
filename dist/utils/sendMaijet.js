"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailjet = require("node-mailjet");
const config_1 = require("./config");
mailjet.connect(config_1.default.mailjet_api_key, config_1.default.mailjet_secret);
const sendPaymentlinkToRecipientEmail = async (email, name, productName, link) => {
    try {
        const { body } = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
                {
                    "From": {
                        "Email": "kingifean@gmail.com",
                        "Name": "Transaction link"
                    },
                    "To": [
                        {
                            "Email": `${email}`,
                            "Name": `${name}`
                        }
                    ],
                    "Subject": `${productName}`,
                    "TextPart": `Payment for ${productName}`,
                    "HTMLPart": `Here's the link to pay for the product ${link}`,
                    "CustomID": "Transaction payment"
                }
            ]
        });
        console.log(body);
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = { sendPaymentlinkToRecipientEmail };
//# sourceMappingURL=sendMaijet.js.map