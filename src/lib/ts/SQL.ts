import { RDSData } from '@aws-sdk/client-rds-data';
import { Kysely } from 'kysely';
import { DataApiDialect } from 'kysely-data-api';

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

const dialect = new DataApiDialect({
    mode: 'mysql',
    driver: {
        client: new RDSData({
            region: AURORA_AWS_REGION,
            credentials: {
                accessKeyId: AURORA_AWS_ACCESS_KEY_ID,
                secretAccessKey: AURORA_AWS_SECRET_ACCESS_KEY
            }
        }),
        database: AURORA_DATABASE,
        secretArn: AURORA_SECRET_ARN,
        resourceArn: AURORA_RESOURCE_ARN
    }
});

export const initializeKysely = <T>() => {
    return new Kysely<T>({
        dialect
    });
}

