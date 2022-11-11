import AWS from "aws-sdk";
import { env } from "../../env";

export const GetSignedUrl = async (
  key: string,
  ContentType: string
): Promise<{ key: string; url: string }> => {
  AWS.config.update({
    accessKeyId: env.aws.accessKey,
    secretAccessKey: env.aws.secretAccessKey,
  });

  const s3 = new AWS.S3({
    signatureVersion: "v4",
    region: env.aws.region,
  });

  const url = await s3.getSignedUrl("putObject", {
    Bucket: env.aws.bucket,
    Key: key,
    Expires: Number(1000),
    ContentType: ContentType,
    ACL: "public-read",
  });

  return {
    key: ` https://${env.aws.bucket}.s3.${env.aws.region}.amazonaws.com/${key}`,
    url: url,
  };
};
