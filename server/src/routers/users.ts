import { Router } from "express";
import {
  addUser,
  changeUserRole,
  deleteUser,
  getAllUser,
  getUser,
  getUserOrder,
  loginUser,
  signUpUser,
  updateUser,
  userForgotPassword,
} from "../controllers/userController";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";
const router = Router();

router.get("/", verifyJWT, verifyRoles("admin"), getAllUser);
router.get(
  "/orders/:id",
  verifyJWT,
  verifyRoles("user", "admin"),
  getUserOrder,
);
router.post("/", addUser);
router.get("/:id", verifyJWT, verifyRoles("admin", "user"), getUser);
router.post("/login", loginUser);
router.post("/sign-up", signUpUser);
router.delete("/:id", verifyJWT, verifyRoles("user", "admin"), deleteUser);
router.post("/forgot-password", userForgotPassword);
router.put("/:id", verifyJWT, verifyRoles("user", "admin"), updateUser);
router.put("/change-role/:id", verifyJWT, verifyRoles("admin"), changeUserRole);

export default router;
