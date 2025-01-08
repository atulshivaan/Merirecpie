import express from "express";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getRecipe,
} from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const recipeRouter = express.Router();

recipeRouter.post("/createrecipe", authMiddleware, createRecipe);
recipeRouter.get("/", getRecipe);
recipeRouter.get("/:id", getRecipe);

recipeRouter.put("/edit/:id", editRecipe);

recipeRouter.delete("/delete/:id", deleteRecipe);

export default recipeRouter;
