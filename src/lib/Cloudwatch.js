
import AWS from "aws-sdk";
import {promisify} from 'es6-promisify';
 
 
export async function cloudwatchLog(message) {  
  
  try {
  
    const accessKeyId = process.env.KS_AWS_ACCESS_KEY_ID ?? process.env.AURORA_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.KS_AWS_SECRET_ACCESS_KEY ?? process.env.AURORA_AWS_SECRET_ACCESS_KEY;
    const region = process.env.KS_AWS_REGION ?? process.env.CLOUDWATCH_AWS_DEFAULT_REGION ?? 'us-east-1';
    const logGroupName = process.env.CLOUDWATCH_AWS_LOG_GROUP_NAME;
    const logStreamName = process.env.CLOUDWATCH_AWS_LOG_STREAM_NAME;

    //Hard exit if it isn't configured
    if (!logGroupName && !logStreamName) return;


    
    const config = {};
    
    
    //if accessKeyId and secretAccessKey is not provided, rely on AWS roles
    //for the access.
     config.credentials = new AWS.Credentials({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
     });

     config.region = region;
   
    const cwl = new AWS.CloudWatchLogs(config);
    const timestamp = (new Date()).getTime();
    
    //convert error-first callbacks into functions that return Promises 
    cwl.describeLogStreams = promisify(cwl.describeLogStreams).bind(cwl);
    cwl.putLogEvents = promisify(cwl.putLogEvents).bind(cwl);
  
    let data = await cwl.describeLogStreams({logGroupName: logGroupName});
    let nextSequenceToken = data.logStreams[0].uploadSequenceToken; 
    await cwl.putLogEvents({
      logEvents: [ { message: message, timestamp: timestamp }],
      logGroupName: logGroupName, 
      logStreamName: logStreamName,
      sequenceToken: nextSequenceToken
    });
    
  } catch(error) {
    
    console.error(error.stack);  
    throw(error);
    
  }
}