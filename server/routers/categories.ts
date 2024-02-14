import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController";
import verifyJWT from "../helpers/jwt";
import verifyRoles from "../helpers/verifyRoles";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.post("/", verifyJWT, verifyRoles("admin"), addCategory);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateCategory);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deleteCategory);

export default router;
