import { Storage } from "@google-cloud/storage";
import env from '../utils/validateEnv'

const base64EncodedServiceAccount = process.env
  .GOOGLE_CREDENTAILS_BASE_64 as string;
const decodeServiceAccount = Buffer.from(
  base64EncodedServiceAccount,
  "base64",
).toString();
const credentials = JSON.parse(decodeServiceAccount);

const bucketName = env.GOOGLE_BUCKET_NAME

const storage = new Storage({
  credentials,
});

export const bucket = storage.bucket(bucketName);
