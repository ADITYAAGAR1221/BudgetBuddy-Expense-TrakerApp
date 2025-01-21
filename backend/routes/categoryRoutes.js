import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Route to create a new category
router.post("/create", createCategory);

// Route to get all categories
router.get("/", getAllCategories);

// Route to update a category
router.put("/:id", updateCategory);

// Route to delete a category
router.delete("/:id", deleteCategory);

export default router;
