import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import verifyJWT from "../utils/jwt.js";
import verifyRoles from "../utils/verifyRoles.js";

const router = Router();

router.get("/", asyncWrapper(getAllCategories));
router.get("/:id", asyncWrapper(getSingleCategory));
router.post("/", verifyJWT, verifyRoles("admin"), asyncWrapper(addCategory));
router.put(
  "/:id",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(updateCategory),
);
router.delete(
  "/:id",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(deleteCategory),
);

export default router;
