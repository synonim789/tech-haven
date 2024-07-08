import { Storage } from "@google-cloud/storage";
import env from "../utils/validateEnv";

const projectId = env.GOOGLE_PROJECT_ID;
const clientEmail = env.GOOGLE_CLIENT_EMAIL;
const privateKey = env.GOOGLE_PRIVATE_KEY;
const bucketName = env.GOOGLE_BUCKET_NAME;

const storage = new Storage({
  projectId: projectId,
  credentials: {
    private_key: privateKey,
    client_email: clientEmail,
  },
});

export const bucket = storage.bucket(bucketName);
