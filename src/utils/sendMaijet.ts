/* eslint-disable prettier/prettier */
import * as mailjet from 'node-mailjet'
import config from './config'

mailjet.connect(config.mailjet_api_key, config.mailjet_secret)

export const testMessage = async (email, name, productName, link) => {
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

export const endorsedCampMail = async (title, endorsementsCount, email, name) => {
  // campaigns/plitical-maters
  const link = 'here'
  try {
    const { body } = await mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
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
    })
    console.log(body)
  } catch (error) {
    console.log(error)
  }
}

export const viewCampMail = async (title, userName, email, name) => {
  // campaigns/plitical-maters
  const link = 'here'
  try {
    const { body } = await mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
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
    })
    console.log(body)
  } catch (error) {
    console.log(error)
  }
}

export const updateCampMail = async (title, email, name) => {
  // campaigns/plitical-maters
  const link = 'here'
  try {
    const { body } = await mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
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
    })
    console.log(body)
  } catch (error) {
    console.log(error)
  }
}

