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
} from "../controllers/userController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import verifyJWT from "../utils/jwt.js";
import verifyRoles from "../utils/verifyRoles.js";
const router = Router();

router.get("/", verifyJWT, verifyRoles("admin"), asyncWrapper(getAllUser));
router.get(
  "/orders/:id",
  verifyJWT,
  verifyRoles("user", "admin"),
  asyncWrapper(getUserOrder),
);
router.post("/", asyncWrapper(addUser));
router.get(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  asyncWrapper(getUser),
);
router.post("/login", asyncWrapper(loginUser));
router.post("/sign-up", asyncWrapper(signUpUser));
router.delete(
  "/:id",
  verifyJWT,
  verifyRoles("user", "admin"),
  asyncWrapper(deleteUser),
);
router.post("/forgot-password", asyncWrapper(userForgotPassword));
router.put(
  "/:id",
  verifyJWT,
  verifyRoles("user", "admin"),
  asyncWrapper(updateUser),
);
router.put(
  "/change-role/:id",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(changeUserRole),
);

export default router;
