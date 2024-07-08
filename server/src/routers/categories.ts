import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController";
import { asyncWrapper } from "../utils/asyncWrapper";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";

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
