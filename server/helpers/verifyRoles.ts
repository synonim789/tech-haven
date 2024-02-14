import { NextFunction, Request, Response } from "express";

interface IVerifyRolesRequest extends Request {
  role?: string;
}

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: IVerifyRolesRequest, res: Response, next: NextFunction) => {
    if (!req?.role) return res.status(401).json({ message: "No Role" });
    const rolesArray = [...allowedRoles];
    const result = rolesArray.includes(req.role);
    if (!result) return res.status(401).json({ message: "No Authorization" });
    next();
  };
};

export default verifyRoles;
