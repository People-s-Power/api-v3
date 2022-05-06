/* eslint-disable prettier/prettier */
import * as mailjet from 'node-mailjet'
import config from './config'

mailjet.connect(config.mailjet_api_key, config.mailjet_secret)

const sendPaymentlinkToRecipientEmail = async (email, name, productName, link) => {
  try {
    const { body } = await mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
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
    })
    console.log(body)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sendPaymentlinkToRecipientEmail }
