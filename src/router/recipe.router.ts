import express from "express";
import { RecipeController } from "../controller/recipe.controller";

const router = express.Router();

router.get("/:recipe_name", RecipeController.getRecipeByName);
router.get("/", RecipeController.getAllRecipe);
router.post("/", RecipeController.createRecipe);

export default router;
