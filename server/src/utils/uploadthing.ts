import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileCount: 10,
      maxFileSize: "2MB",
    },
  }).onUploadComplete((_data) => {
    console.log("upload completed");
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
