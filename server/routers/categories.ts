import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.post("/", verifyJWT, verifyRoles("admin"), addCategory);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateCategory);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deleteCategory);

export default router;
