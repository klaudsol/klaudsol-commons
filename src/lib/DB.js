//TODO: update to aws sdk v3.0
import AWS from 'aws-sdk';
import {promisify} from 'es6-promisify';
import { sha256 as sha256Crypto } from "../lib/Crypto";

//Deprecated: all environment variabes without the KS_ prefix.
//We remove this on v2.0.0
const AURORA_AWS_ACCESS_KEY_ID = process.env.AURORA_AWS_ACCESS_KEY_ID ?? process.env.KS_AURORA_AWS_ACCESS_KEY_ID ?? process.env.KS_AWS_ACCESS_KEY_ID;
const AURORA_AWS_SECRET_ACCESS_KEY = process.env.AURORA_AWS_SECRET_ACCESS_KEY ?? process.env.KS_AURORA_AWS_SECRET_ACCESS_KEY ?? process.env.KS_AWS_SECRET_ACCESS_KEY;
const AURORA_RESOURCE_ARN = process.env.AURORA_RESOURCE_ARN ?? process.env.KS_AURORA_RESOURCE_ARN;
const AURORA_SECRET_ARN = process.env.AURORA_SECRET_ARN ?? process.env.KS_AURORA_SECRET_ARN;
const AURORA_DATABASE = process.env.AURORA_DATABASE ?? process.env.KS_AURORA_DATABASE;
const AURORA_AWS_REGION = process.env.AURORA_AWS_REGION ?? process.env.KS_AURORA_AWS_REGION ?? process.env.KS_AURORA_REGION ?? process.env.KS_AWS_REGION ?? 'us-east-1';


class DB {
  
  constructor({ database, secretArn, resourceArn, region } = {}) {
    
    const rdsConfig =  {
      region: region ?? AURORA_AWS_REGION,
      credentials: new AWS.Credentials({
        accessKeyId: AURORA_AWS_ACCESS_KEY_ID,
        secretAccessKey: AURORA_AWS_SECRET_ACCESS_KEY,
      }),
    };

    const RDS = new AWS.RDSDataService(rdsConfig);
    
    const statementConfig = {
      resourceArn: resourceArn ?? AURORA_RESOURCE_ARN,
      secretArn: secretArn ?? AURORA_SECRET_ARN,
      database: database ?? AURORA_DATABASE
    } ;   
    
    this.executeStatement = async (sql, parameters=[]) => {  
      const exec = promisify(RDS.executeStatement.bind(RDS));
      return await exec({...statementConfig, sql, parameters});  
    }
    
    this.batchExecuteStatement = async(sql, parameterSets=[]) => {
      const exec = promisify(RDS.batchExecuteStatement.bind(RDS));
      return await exec({...statementConfig, sql, parameterSets});  
    }
  }
  
  //DEPRECATE on v2.0.0 
  async exectuteStatement(sql, parameters=[]) {
    console.error("Migrate to exectuteStatement to executeStatement ASAP!");
    return this.executeStatement(sql, parameters);  
  }
  
}

export default DB;

//DEPRECATE on v2.0.0
export const sha256 = (text, encoding='base64') => {
  console.log('DB.sha256 is deprecated. Please use sha256 from @klaudsol/commons/lib/Crypto instead.');
  return sha256Crypto(text, encoding);
}; 

//DEPRECATE on v2.0.0
export const fieldsForSelect = (table, fieldsHash) => Object.entries(fieldsHash).map(([name]) => `${table}.${name}`).join(',');

//DEPRECATE on v2.0.0
const allowedFieldsOnCreate = (fieldsHash) => Object.entries(fieldsHash).filter(([name, {allowOnCreate} ]) => allowOnCreate );

//DEPRECATE on v2.0.0
export const fieldsForInsert = (fieldsHash) =>  allowedFieldsOnCreate(fieldsHash).map(([name]) => `${name}`).join(',');

//DEPRECATE on v2.0.0
export const fieldParametersForInsert = (fieldsHash) => allowedFieldsOnCreate(fieldsHash).map(([name]) => `:${name}`).join(',');

//DEPRECATE on v2.0.0
export const executeStatementParamsForInsert = (fieldsHash, model, transform) =>  allowedFieldsOnCreate(fieldsHash)
  .map(([name, {auroraType}]) => {
    //for flexibiity, we can pass a transformer function to manipulate our data
    const value = transform ? transform(name, model[name]) : model[name];
    return {
      name: name, value: {[`${auroraType}Value`]: value }
    }
  });
  
//DEPRECATE on v2.0.0
const allowedFieldsOnUpdate = (fieldsHash) => Object.entries(fieldsHash).filter(([name, {allowOnUpdate} ]) => allowOnUpdate );

//DEPRECATE on v2.0.0
export const fieldsForUpdate = (fieldsHash) => allowedFieldsOnUpdate(fieldsHash).map(([name]) => `${name} = :${name}`).join(',');

//DEPRECATE on v2.0.0
export const executeStatementParamsForUpdate = (fieldsHash, model, transform) => allowedFieldsOnUpdate(fieldsHash)
  .map(([name, {auroraType}]) => {
    const value = transform ? transform(name, model[name]) : model[name];
    return {
      name: name, value: {[`${auroraType}Value`]: value }
    }
  });


//DEPRECATE on v2.0.0
//Allowed datatypes in Aurora Data API
export const AURORA_TYPE = {
  LONG: 'long',
  STRING: 'string',
  BOOLEAN: 'boolean'
};

/*
A single Aurora record looks something like this:
  [
    {
    "longValue": 1
    },
    {
    "stringValue": "System"
    },
    {
    "stringValue": "Administrator"
    },
    {
    "stringValue": "System Administrator"
    },
    {
    "booleanValue": true
    },
    {
    "stringValue": "admin@klaudsol.com"
    },
    {
    "stringValue": "2021-09-22 04:47:09"
    },
    {
    "longValue": 1
    }
  ]
  
  It is rather unwieldy, and has reliance on the order of the fields in the query, so we need a layer that shields the app from this 
  format, and just return a sane key-value Object.
*/

//DEPRECATE on v2.0.0
export const fromAurora = (record, fields) =>  Object.fromEntries(Object.entries(fields).map(([key, {auroraType}], index) => [key, record[index][`${auroraType}Value`]]));

//DEPRECATE on v2.0.0
export const sanitizeData = (rawData, fields) => {
    const allowedFields = Object.entries(fields).map(([name]) => name);  
    return Object.fromEntries(Object.entries(rawData).filter(([key]) => allowedFields.includes(key)));
};

/*the result of an insert field in Aurora API is:

{ generatedFields: [ { longValue: 26 } ],
  numberOfRecordsUpdated: 1 }

*/

//DEPRECATE on v2.0.0
export const fromInsertAurora = (record) => ({id: record.generatedFields[0].longValue});

//DEPRECATE on v2.0.0
export const fromDeleteAurora = (record) => record.numberOfRecordsUpdated > 0;
  
