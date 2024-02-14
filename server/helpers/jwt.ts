import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface IVerifyJWTRequest extends Request {
  userId?: string;
  role?: string;
}

export const verifyJWT = (
  req: IVerifyJWTRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!process.env.secret) {
    throw new Error("Environmental Variable secret not found");
  }
  jwt.verify(token, process.env.secret, (err: any, decoded: any) => {
    if (err) return res.status(403);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

export default verifyJWT;
