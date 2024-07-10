import { cleanEnv, str, url } from "envalid";

export default cleanEnv(process.env, {
  API_URL: str(),
  SECRET: str(),
  MONGODB_CONNECTION_STRING: str(),
  STRIPE_KEY: str(),
  CLIENT_URL: url(),
  STRIPE_ENDPOINT_SECRET: str(),
  GOOGLE_BUCKET_NAME: str(),
});
