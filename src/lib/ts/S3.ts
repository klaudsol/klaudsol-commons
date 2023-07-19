import { generateRandVals } from '@/lib/Math';
import {
    PutObjectCommand,
    PutObjectCommandInputType,
    S3Client,
    S3ClientConfigType
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3_ACCESS_KEY_ID =
    process.env.KS_S3_ACCESS_KEY_ID ?? process.env.KS_AWS_ACCESS_KEY_ID ?? '';
const S3_SECRET_ACCESS_KEY =
    process.env.KS_S3_SECRET_ACCESS_KEY ??
    process.env.KS_AWS_SECRET_ACCESS_KEY ??
    '';
const REGION =
    process.env.KS_S3_REGION ?? process.env.KS_AWS_REGION ?? 'us-east-1';
const S3_BUCKET = process.env.KS_S3_BUCKET ?? '';

const config: S3ClientConfigType = {
    region: REGION,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY
    }
};

const client = new S3Client(config);

export const convertNameToS3Key = async (name: string) => {
    return (await generateRandVals()) + '_' + name;
};

export const batchConvertNameToS3Key = async (names: string[]) => {
    return Promise.all(
        names.map(async (name) => await convertNameToS3Key(name))
    );
};

export const generatePresignedUrl = async ({
    key,
    type
}: GeneratePresignedUrlParams) => {
    const input: PutObjectCommandInputType = {
        Bucket: S3_BUCKET,
        ContentType: type,
        Key: key
    };
    const command = new PutObjectCommand(input);

    return await getSignedUrl(client, command, { expiresIn: 3600 });
};

export const batchGeneratePresignedUrl = async (
    files: BatchGeneratePresignedUrlParams[]
) => {
    return await Promise.all(
        files.map(async ({ id, key, type }) => ({
            id,
            url: await generatePresignedUrl({ key, type })
        }))
    );
};

interface GeneratePresignedUrlParams {
    key: string;
    type: string;
}

interface BatchGeneratePresignedUrlParams extends GeneratePresignedUrlParams {
    id: number;
}
