import { StatusCodes } from "http-status-codes";
import { Recipes } from "../repositories/recipe.repository";
import { CustomError } from "../middleware";
import { type CreateRecipe } from "../models/recipe";

export const RecipeService = {
  async getRecipeByName(recipe_name: string) {
    const fetching = await Recipes.findRecipeByName(recipe_name);
    // console.log(fetching)

    if (!fetching) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "Recipe not found");
    }

    return fetching;
  },

  async getAllRecipe() {
    const recipes = await Recipes.getAllRecipes();

    if (!recipes || recipes.length === 0) {
      throw new CustomError(StatusCodes.NOT_FOUND, "No Recipes");
    }

    return recipes.map((recipe: any) => ({
      recipe_id: recipe.recipe_id.toString(),
      recipe_name: recipe.recipe_name,
      calories: recipe.calories,
      picture: recipe.picture,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      account_id: recipe.account_id,
    }));
  },

  async createRecipe(request: CreateRecipe) {
    const newRecipe = await Recipes.createRecipe(
      request.recipe_name,
      request.calories,
      request.picture,
      request.ingredients,
      request.instructions,
      request.prep_time,
      request.cook_time
      //   account_id
    );

    if (!newRecipe) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "Failed to create recipe");
    }

    return {
      recipe_id: newRecipe.recipe_id.toString(),
      recipe_name: newRecipe.recipe_name,
      calories: newRecipe.calories,
      picture: newRecipe.picture,
      ingredients: newRecipe.ingredients,
      instructions: newRecipe.instructions,
      prep_time: newRecipe.prep_time,
      cook_time: newRecipe.cook_time,
      //   account_id: newRecipe.account_id,
    };
  },
};
