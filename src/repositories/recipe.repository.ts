import { when } from "joi";
import prisma from "../config/prisma";

export const Recipes = {
  async findRecipeByName(recipe_name: string) {
    return await prisma.recipes.findFirst({
      where: {
        recipe_name,
      },
    });
  },

  async getAllRecipes() {
    return await prisma.recipes.findMany();
  },

  async createRecipe(
    recipe_name: string,
    calories: string,
    picture: string,
    ingredients: string,
    instructions: string,
    prep_time: string,
    cook_time: string
    // account_id: string
  ) {
    return await prisma.recipes.create({
      data: {
        recipe_name,
        calories,
        picture,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        // account_id,
      },
    });
  },
};
