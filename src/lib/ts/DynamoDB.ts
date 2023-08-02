import { 
    BatchWriteItemCommand,
    BatchWriteItemCommandInput, 
    BatchWriteItemCommandOutput, 
    CreateTableCommand, 
    CreateTableCommandInput, 
    CreateTableCommandOutput, 
    DeleteTableCommand, 
    DeleteTableCommandInput, 
    DeleteTableCommandOutput, 
    DescribeTableCommand, 
    DescribeTableCommandInput, 
    DescribeTableCommandOutput, 
    DynamoDBClient, 
    DynamoDBClientConfig, 
    GetItemCommand, 
    GetItemCommandInput, 
    GetItemCommandOutput, 
    ListTablesCommand, 
    ListTablesCommandInput, 
    ListTablesCommandOutput, 
    QueryCommand, 
    QueryCommandInput, 
    QueryCommandOutput, 
    ScanCommand, 
    ScanCommandInput, 
    ScanCommandOutput,
    UpdateTableCommand,
    UpdateTableCommandInput,
    UpdateTableCommandOutput
  } from "@aws-sdk/client-dynamodb";
  import { 
    DeleteCommand, 
    DeleteCommandInput, 
    DeleteCommandOutput, 
    DynamoDBDocumentClient, 
    PutCommand, 
    PutCommandInput, 
    PutCommandOutput, 
    UpdateCommand, 
    UpdateCommandInput, 
    UpdateCommandOutput 
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
  
  const marshallOptions = {
      convertEmptyValues: false, // Whether to automatically convert empty strings, blobs, and sets to `null`. false, by default. 
      removeUndefinedValues: true, // Whether to remove undefined values while marshalling. false, by default.
      convertClassInstanceToMap: false, // Whether to convert typeof object to map attribute. false, by default.
    };
      
  const unmarshallOptions = {
      wrapNumbers: false, // Whether to return numbers as a string instead of converting them to native JavaScript numbers. false, by default.
  };
  
  class DB {
    private DDBConfig: DynamoDBClientConfig = {
      region: DYNAMO_DB_AWS_REGION,
      credentials: {
        accessKeyId: DYNAMO_DB_AWS_ACCESS_KEY,
        secretAccessKey: DYNAMO_DB_AWS_SECRET_ACCESS_KEY,
      }
    }
  
    private DDBDocConfig: DDBDocConfigParams = {
      marshallOptions,
      unmarshallOptions,
    }
  
    private ddbClient = new DynamoDBClient(this.DDBConfig);
    private ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient, this.DDBDocConfig);
  
    public set setDDBConfig(ddbConfig: DDBConfigParams) {
      this.ddbClient = new DynamoDBClient({
          ...this.DDBConfig,
          ...ddbConfig
      });
    }
  
    public set setDDBDocConfig(ddbDocConfig: DDBDocConfigParams) {
      this.ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient,{
          ...this.DDBDocConfig,
          ...ddbDocConfig
      });
    }
  
    constructor() {}
  
    // Create a table
    public async createTable(parameters: CreateTableCommandInput): Promise<CreateTableCommandOutput> {
      const command = new CreateTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }

    // Update a table
    public async updateTable(parameters: UpdateTableCommandInput): Promise<UpdateTableCommandOutput> {
      const command = new UpdateTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }

    // Delete a table
    public async deleteTable(parameters: DeleteTableCommandInput): Promise<DeleteTableCommandOutput> {
      const command = new DeleteTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
    
    // List all tables 
    public async listTables(parameters: ListTablesCommandInput): Promise<ListTablesCommandOutput> {
      const command = new ListTablesCommand(parameters);
      return await this.ddbDocClient.send(command);
    }

    // Describe tables 
    public async describeTables(parameters: DescribeTableCommandInput): Promise<DescribeTableCommandOutput> {
      const command = new DescribeTableCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Insert an item
    public async insertItem(parameters: PutCommandInput): Promise<PutCommandOutput> {
      const command = new PutCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Get an Item 
    // Must pass the correct keys
    public async readItem(parameters: GetItemCommandInput): Promise<GetItemCommandOutput> {
      const command = new GetItemCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Gets all items 
    public async readAllItems(parameters: ScanCommandInput): Promise<ScanCommandOutput> {
      const command = new ScanCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Updates an item
    public async updateItem(parameters: UpdateCommandInput): Promise<UpdateCommandOutput> {
      const command = new UpdateCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Deletes an item
    public async deleteItem(parameters: DeleteCommandInput): Promise<DeleteCommandOutput> {
      const command = new DeleteCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Insert multiple items
    // Delete multiple items
    public async batchWrite(parameters: BatchWriteItemCommandInput): Promise<BatchWriteItemCommandOutput> {
      const command = new BatchWriteItemCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  
    // Custom Query
    public async query(parameters: QueryCommandInput): Promise<QueryCommandOutput> {
      const command = new QueryCommand(parameters);
      return await this.ddbDocClient.send(command);
    }
  }
  
  export default DB;
  
  type MarshallOptions = {
    convertEmptyValues: boolean;
    removeUndefinedValues: boolean;
    convertClassInstanceToMap: boolean;
  }
  
  type UnMarshallOptions = {
    wrapNumbers: boolean;
  }
  
  interface DDBConfigParams {
    region?: string;
  }
  
  interface DDBDocConfigParams {
    marshallOptions: MarshallOptions;
    unmarshallOptions: UnMarshallOptions;
  }
  