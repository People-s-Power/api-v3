"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCampMail = exports.viewCampMail = exports.endorsedCampMail = exports.testMessage = void 0;
const mailjet = require("node-mailjet");
const config_1 = require("./config");
mailjet.connect(config_1.default.mailjet_api_key, config_1.default.mailjet_secret);
const testMessage = async (email, name, productName, link) => {
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
exports.testMessage = testMessage;
const endorsedCampMail = async (title, endorsementsCount, email, name) => {
    const link = 'here';
    try {
        const { body } = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
                {
                    "From": {
                        "Email": "kingifean@out.com",
                        "Name": "Endorsements"
                    },
                    "To": [
                        {
                            "Email": `${email}`,
                            "Name": `${name}`
                        }
                    ],
                    "Subject": `${title} was Endorsed`,
                    "TextPart": `${title} got another Endorsements`,
                    "HTMLPart": `Here's the link to Campiange ${link}`,
                    "CustomID": "Endorsements"
                }
            ]
        });
        console.log(body);
    }
    catch (error) {
        console.log(error);
    }
};
exports.endorsedCampMail = endorsedCampMail;
const viewCampMail = async (title, userName, email, name) => {
    const link = 'here';
    try {
        const { body } = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
                {
                    "From": {
                        "Email": "kingifean@out.com",
                        "Name": "View"
                    },
                    "To": [
                        {
                            "Email": `${email}`,
                            "Name": `${name}`
                        }
                    ],
                    "Subject": `${userName} Viewed your Campiange`,
                    "TextPart": `${title} got another View!!!`,
                    "HTMLPart": `Here's the link to Campiange ${link}`,
                    "CustomID": "Views"
                }
            ]
        });
        console.log(body);
    }
    catch (error) {
        console.log(error);
    }
};
exports.viewCampMail = viewCampMail;
const updateCampMail = async (title, email, name) => {
    const link = 'here';
    try {
        const { body } = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
                {
                    "From": {
                        "Email": "kingifean@out.com",
                        "Name": "Campiange Edit"
                    },
                    "To": [
                        {
                            "Email": `${email}`,
                            "Name": `${name}`
                        }
                    ],
                    "Subject": `${title} was Edited`,
                    "TextPart": `${title} was edited!!!`,
                    "HTMLPart": `Here's the link to Campiange ${link}`,
                    "CustomID": "CampiangeUpdate"
                }
            ]
        });
        console.log(body);
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateCampMail = updateCampMail;
//# sourceMappingURL=sendMaijet.js.map