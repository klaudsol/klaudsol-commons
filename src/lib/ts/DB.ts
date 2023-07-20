import {
    RDSDataClient,
    ExecuteStatementCommand,
    BatchExecuteStatementCommand,
    SqlParameter,
    ExecuteStatementCommandOutput,
    RDSDataClientConfig
} from '@aws-sdk/client-rds-data';

const AURORA_AWS_ACCESS_KEY_ID =
    process.env.KS_AURORA_ACCESS_KEY_ID ??
    process.env.KS_AURORA_AWS_ACCESS_KEY_ID ??
    process.env.KS_AWS_ACCESS_KEY_ID ??
    '';
const AURORA_AWS_SECRET_ACCESS_KEY =
    process.env.KS_AURORA_ACCESS_KEY_ID ??
    process.env.KS_AURORA_AWS_SECRET_ACCESS_KEY ??
    process.env.KS_AWS_SECRET_ACCESS_KEY ??
    '';
const AURORA_AWS_REGION =
    process.env.KS_AURORA_AWS_REGION ??
    process.env.KS_AURORA_REGION ??
    process.env.KS_AWS_REGION ??
    'us-east-1';
const AURORA_RESOURCE_ARN = process.env.KS_AURORA_RESOURCE_ARN ?? '';
const AURORA_SECRET_ARN = process.env.KS_AURORA_SECRET_ARN ?? '';
const AURORA_DATABASE = process.env.KS_AURORA_DATABASE ?? '';

class DB {
    private statementConfig: StatementConfig = {
        resourceArn: AURORA_RESOURCE_ARN,
        secretArn: AURORA_SECRET_ARN,
        database: AURORA_DATABASE
    };

    private RDSConfig: RDSDataClientConfig = {
        region: AURORA_AWS_REGION,
        credentials: {
            accessKeyId: AURORA_AWS_ACCESS_KEY_ID,
            secretAccessKey: AURORA_AWS_SECRET_ACCESS_KEY
        }
    };
  
    private client = new RDSDataClient(this.RDSConfig);

    constructor() {}

    public set setStatementConfig(statementConfig: StatementConfigParams) {
        this.statementConfig = {
            ...this.statementConfig,
            ...statementConfig
        };
    }

    public set setRDSConfig(rdsConfig: RDSConfigParams) {
        this.client = new RDSDataClient({
            ...this.RDSConfig,
            ...rdsConfig
        });
    }

    public async executeStatement(
        sql: string,
        parameters: SqlParameter[] = []
    ): Promise<ExecuteStatementCommandOutput> {
        const command = new ExecuteStatementCommand({
            ...this.statementConfig,
            sql,
            parameters
        });

        return await this.client.send(command);
    }

    public async batchExecuteStatement(
        sql: string,
        parameterSets: SqlParameter[][] = []
    ): Promise<ExecuteStatementCommandOutput> {
        const command = new BatchExecuteStatementCommand({
            ...this.statementConfig,
            sql,
            parameterSets
        });

        return await this.client.send(command);
    }
}

export default DB;

interface RDSConfigParams {
    region?: string;
}

interface StatementConfig {
    resourceArn: string;
    secretArn: string;
    database: string;
}

interface StatementConfigParams extends Partial<StatementConfig> {}

