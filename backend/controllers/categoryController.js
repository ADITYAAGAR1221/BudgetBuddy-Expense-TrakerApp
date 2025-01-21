import { pool } from "../libs/database.js";


// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "Category name is required!",
      });
    }

    const categoryExist = await pool.query({
      text: "SELECT EXISTS (SELECT 1 FROM categories WHERE name = $1)",
      values: [name],
    });

    if (categoryExist.rows[0].exists) {
      return res.status(409).json({
        status: "failed",
        message: "Category already exists. Please use a different name.",
      });
    }

    const newCategory = await pool.query({
      text: "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      values: [name, description],
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully.",
      category: newCategory.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query({
      text: "SELECT * FROM categories ORDER BY created_at DESC",
    });

    res.status(200).json({
      status: "success",
      categories: categories.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "Category name is required!",
      });
    }

    const category = await pool.query({
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    });

    if (category.rowCount === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Category not found.",
      });
    }

    const updatedCategory = await pool.query({
      text: "UPDATE categories SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
      values: [name, description, id],
    });

    res.status(200).json({
      status: "success",
      message: "Category updated successfully.",
      category: updatedCategory.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await pool.query({
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    });

    if (category.rowCount === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Category not found.",
      });
    }

    await pool.query({
      text: "DELETE FROM categories WHERE id = $1",
      values: [id],
    });

    res.status(200).json({
      status: "success",
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};
