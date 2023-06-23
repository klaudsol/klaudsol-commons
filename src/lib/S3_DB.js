// All functions that uses S3 as DB

import AWS from 'aws-sdk';
import { sendEmail } from './SES2';


// Initializes the s3 bucket that will be used as database
// I've created a separate policy on AWS that can only 
// write, update and read contents on a specific bucket
export const initializeS3dbBucket = (region, accessKeyId, secretAccessKey) => {
  const s3 = new AWS.S3({
    region: region ?? process.env.KS_S3_DB_REGION,
    accessKeyId: accessKeyId ?? process.env.KS_S3_DB_ACCESS_KEY_ID,
    secretAccessKey: secretAccessKey ?? process.env.KS_S3_DB_SECRET_ACCESS_KEY,
  });

  return s3;
}

// Returns the required Bucket Parameters for the Rate Limiter
// You can change the query (Depending on what query you want to run)
// The default query is SELECT * FROM s3object s'
// This selects all entries from the JSON file found on the bucket
// Other query samples: SELECT s.sent_at FROM s3object s ORDER BY s.sent_at DESC LIMIT 1
export const initializeS3dbBucketParams = (s3Query, s3BucketName, s3ObjectKey) => {

  const query = s3Query ?? 'SELECT * FROM s3object s'; 
  const bucketName = s3BucketName ?? process.env.KS_S3_DB_BUCKET;
  const key = s3ObjectKey ?? process.env.KS_S3_DB_OBJECT_KEY;
  
  const params = {
    Bucket: bucketName,
    Key: key,
    InputSerialization: {
      JSON: {
        Type: 'DOCUMENT',
      },
    },
    OutputSerialization: {
      JSON: {},
    },
    ExpressionType: 'SQL',
    Expression: query,
  };

  return params;
}

// Function that updates the existing JSON File
// Data is the content to put in the file
export const writeToJsonFile = (data, key, bucketName, s3) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: jsonContent,
  };
  
  s3.putObject(params, function (err, data) {
    if (err) {
      throw new Error(err);
    }
  });
}

// Formats the sent_at date to 
// "2023-06-06T14:28:27.636"
export const formatCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hour = String(currentDate.getHours()).padStart(2, '0');
  const minute = String(currentDate.getMinutes()).padStart(2, '0');
  const second = String(currentDate.getSeconds()).padStart(2, '0');
  const millisecond = String(currentDate.getMilliseconds()).padStart(3, '0');
  const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`;

  return formattedDateTime;
}

// Function to trigger rate limiter 
export const triggerRateLimiter = async (s3, params, res, data, subject, confirmationMessage) => {
  try {
    let records = []; // gets all records
    let latestEntry = null; // gets most recent entry
    let message = ''; // message to be returned
    let status = 200; // status
  
    // Create the file if it doesn't exist
    const fileCreated = await createFileIfNotExists(s3, params.Bucket, params.Key, [ {sent_at: formatCurrentDate()} ]);
    
    // If the file already exists
    // It will read the content 
    // after checking the current content of last_send.json,
    // it will compare the current time vs the last sent time
    // if the interval is more than 1 min, it will send the email
    // if the interval is less than 1 min, it will not send the email
    // and it will notifiy the user to wait for a few minutes.

    if(!fileCreated) {
      const response = await s3.selectObjectContent(params).promise();

      // This is the part that reads the data
      // Converts the records into string
      // Then parses it to JSON
      // latestEntry is the most recent entry inserted in the file
      response.Payload.on('data', function (event) {
        if (event.Records) {
          if (event.Records.Payload) {
            const recordString = event.Records.Payload.toString();
            const record = JSON.parse(recordString)._1;
            latestEntry = record[record.length - 1];
            records = record;
          }
        }
      });

      // After reading the content of the file
      // This is where you can add conditions / logic 
      // On how you will use the data from the json file

      response.Payload.on('end', async function () {
        if (latestEntry) {
          const currentTime = new Date();
          const sentAt = new Date(latestEntry.sent_at);
          const timeDifference = currentTime.getTime() - sentAt.getTime();
          
          if (timeDifference < 60000) { // Less than 1 minute (60,000 milliseconds)
            message = confirmationMessage.pending; // Pending message (If the user tried to send multiple times)
            status = 500; // Status code
          } else {
            const dataToWrite = [
              // ...records // You can add this if you want to append the data
              { sent_at: formatCurrentDate() },
            ];

            // Calls the function to update the content of JSON
            writeToJsonFile(dataToWrite, params.Key, params.Bucket, s3);

            // sends the email if the time interval is more than 1 minute
            try {
              await sendEmail(subject, data.html, data.email);
              message = confirmationMessage.success; // Success message (If the user tried to send multiple times)
            } catch (error) {
              message = confirmationMessage.error; // Error message (If the user tried to send multiple times)
              status = 500;
            }
          }
        }   
        res.status(status).json({ message });
      });
    } else {
      res.status(status).json({ message: confirmationMessage.success });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: confirmationMessage.error });
  }
};

const createFileIfNotExists = async (s3, bucketName, key, content) => {
  try {
    // Checks if the file already exists
    const headParams = {
      Bucket: bucketName,
      Key: key,
    };
    await s3.headObject(headParams).promise();
    return false; // File already exists
  } catch (error) {
    // Creates the file if it doesn't exist
    if (error.code === 'NotFound') {
      const putParams = {
        Bucket: bucketName,
        Key: key,
        Body: JSON.stringify(content),
      };

      await s3.putObject(putParams).promise();
      return true; // File didn't exist in the first place, and it is now successfully created
    } else {
      throw error; // Rethrow the error if it's not a "NotFound" error
    }
  }
};