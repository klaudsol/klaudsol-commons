import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';

export const createSendEmailCommand = ( 
  mailSender, 
  inquiryReceivers, 
  replyToAddresses, 
  subjectData, 
  bodyData, 
  htmlData 
) => {
  const params = {
    FromEmailAddress: mailSender,
    Destination: { ToAddresses: inquiryReceivers },
    ReplyToAddresses: replyToAddresses,
    Content: {
      Simple: {
        Subject: {
          Charset: 'UTF-8',
          Data: subjectData,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: bodyData,
          },
          Html: {
            Charset: 'UTF-8',
            Data: htmlData,
          }
        },
      }
    },
  };
  return new SendEmailCommand(params);
}

export const createConfigObject = (region, accesKeyId, secretAccessKey) => {
  return {
    region: region,
    credentials: {
      accessKeyId: accesKeyId ?? process.env.KS_SES_ACCESS_KEY_ID ??process.env.KS_AWS_ACCESS_KEY_ID,
      secretAccessKey: secretAccessKey ?? process.env.KS_SES_SECRET_ACCESS_KEY ??process.env.KS_AWS_SECRET_ACCESS_KEY,
    },
  }
}

export const sendEmail = async (configObject, sendEmailCommand) => {
  try {
    const sesClient = new SESv2Client(configObject);
    await sesClient.send(sendEmailCommand);
  } catch (err) {
    throw new Error(err);
  }
}