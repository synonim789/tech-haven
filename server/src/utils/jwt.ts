import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import env from "../utils/validateEnv";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, env.SECRET, (err: unknown, decoded: any) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

export default verifyJWT;
