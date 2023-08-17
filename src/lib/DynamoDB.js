import { 
  BatchWriteItemCommand,
  CreateTableCommand, 
  DeleteTableCommand, 
  DescribeTableCommand, 
  DynamoDBClient, 
  GetItemCommand, 
  ListTablesCommand, 
  QueryCommand, 
  ScanCommand, 
  UpdateTableCommand,
} from "@aws-sdk/client-dynamodb";
import { 
  DeleteCommand, 
  DynamoDBDocumentClient, 
  PutCommand, 
  UpdateCommand, 
} from '@aws-sdk/lib-dynamodb';
  
const DYNAMO_DB_AWS_ACCESS_KEY =
    process.env.KS_DYNAMO_DB_AWS_ACCESS_KEY_ID ??
    process.env.KS_AWS_ACCESS_KEY_ID ??
    '';
const DYNAMO_DB_AWS_SECRET_ACCESS_KEY =
    process.env.KS_DYNAMO_DB_AWS_SECRET_ACCESS_KEY ??
    process.env.KS_AWS_SECRET_ACCESS_KEY ??
    '';
const DYNAMO_DB_AWS_REGION =
    process.env.KS_DYNAMO_DB_AWS_REGION ??
    process.env.KS_AWS_REGION ??
    'us-east-1';
  
const defaultMarshallOptions = {
    convertEmptyValues: false, // Whether to automatically convert empty strings, blobs, and sets to `null`. false, by default. 
    removeUndefinedValues: true, // Whether to remove undefined values while marshalling. false, by default.
    convertClassInstanceToMap: false, // Whether to convert typeof object to map attribute. false, by default.
};
      
const defaultUnmarshallOptions = {
    wrapNumbers: false, // Whether to return numbers as a string instead of converting them to native JavaScript numbers. false, by default.
};
  
class DynamoDB {
    constructor({ marshallOptions, unmarshallOptions } = {}) {
      const DDBConfig = {
        region: DYNAMO_DB_AWS_REGION,
        credentials: {
          accessKeyId: DYNAMO_DB_AWS_ACCESS_KEY,
          secretAccessKey: DYNAMO_DB_AWS_SECRET_ACCESS_KEY,
        }
      }
    
      const DDBDocConfig = {
        marshallOptions: {...defaultMarshallOptions, ...marshallOptions},
        unmarshallOptions: {...defaultUnmarshallOptions, ...unmarshallOptions},
      }
    
      this.ddbClient = new DynamoDBClient(DDBConfig);
      this. ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient, DDBDocConfig);
    }

    // Create a table
    async createTable(parameters) {
      const command = new CreateTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }

    // Update a table
    async updateTable(parameters) {
      const command = new UpdateTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }

    // Delete a table
    async deleteTable(parameters) {
      const command = new DeleteTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
    
    // List all tables 
    async listTables(parameters){
      const command = new ListTablesCommand(parameters);
      return await this.ddbDocClient.send(command);
    }

    // Describe tables 
    async describeTables(parameters) {
      const command = new DescribeTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Insert an item
    async insertItem(parameters) {
      const command = new PutCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Get an Item 
    // Must pass the correct keys
    async readItem(parameters) {
      const command = new GetItemCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Gets all items 
    async readAllItems(parameters) {
      const command = new ScanCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Updates an item
    async updateItem(parameters) {
      const command = new UpdateCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Deletes an item
    async deleteItem(parameters) {
      const command = new DeleteCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Insert multiple items
    // Delete multiple items
    async batchWrite(parameters) {
      const command = new BatchWriteItemCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Custom Query
    async query(parameters) {
      const command = new QueryCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  }
  
  export default DynamoDB;