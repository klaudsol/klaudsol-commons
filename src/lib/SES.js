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
      accessKeyId: accesKeyId,
      secretAccessKey: secretAccessKey,
    },
  }
}

export const sendEmail = async (region, accesKeyId, secretAccessKey, sendEmailCommand) => {
  try {
    const configObject = createConfigObject(region, accesKeyId, secretAccessKey)
    const sesClient = new SESv2Client(configObject);
    await sesClient.send(sendEmailCommand);
  } catch (err) {
    console.error(err);
  }
}