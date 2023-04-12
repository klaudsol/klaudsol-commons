import { SendEmailCommand } from '@aws-sdk/client-sesv2';

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