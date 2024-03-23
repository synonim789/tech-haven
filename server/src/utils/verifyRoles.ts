import { NextFunction, Request, Response } from "express";

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.role) return res.status(401).json({ message: "No Role" });
    const rolesArray = [...allowedRoles];
    const result = rolesArray.includes(req.role);
    if (!result) return res.status(401).json({ message: "No Authorization" });
    next();
  };
};

export default verifyRoles;
