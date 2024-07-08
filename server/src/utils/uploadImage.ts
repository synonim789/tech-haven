import { bucket } from "../config/googleStorage";
import env from "../utils/validateEnv";

export const uploadImage = async (file: Express.Multer.File) => {
  const bucketName = env.GOOGLE_BUCKET_NAME;
  const fileName = `${Date.now()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => {
      reject(err);
    });
    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(publicUrl);
    });
    stream.end(file.buffer);
  });
};
