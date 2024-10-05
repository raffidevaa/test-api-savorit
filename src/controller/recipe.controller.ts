import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError, CustomResponse } from "../middleware";
import { RecipeService } from "../services/recipe.service";

export const RecipeController = {
  async getRecipeByName(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { recipeName } = request.params;
      const fetching = await RecipeService.getRecipeByName(recipeName);
      // console.log(fetching)

      // const data = { fetching };

      const serializeData = JSON.parse(
        JSON.stringify(fetching, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

      const result = new CustomResponse(
        StatusCodes.OK,
        "Recipe has been found",
        serializeData
      );

      return response.status(StatusCodes.OK).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async getAllRecipe(request: Request, response: Response, next: NextFunction) {
    try {
      //   const userId = request.auth?.id;
      //   if (!userId) {
      //     throw new CustomError(StatusCodes.UNAUTHORIZED, 'You are not logged in');
      //   }

      const recipes = await RecipeService.getAllRecipe();

      const data = { recipes };

      const result = new CustomResponse(
        StatusCodes.OK,
        "Recipes fetched successfully",
        data
      );

      return response.status(StatusCodes.OK).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async createRecipe(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        recipe_name,
        calories,
        picture,
        ingredients,
        instructions,
        prep_time,
        cook_time,
      } = request.body;

      // const account_id = request.auth?.id; // Assume authentication middleware provides the user ID
      // if (!account_id) {
      //   throw new CustomError(
      //     StatusCodes.UNAUTHORIZED,
      //     "You are not logged in"
      //   );
      // }

      const newRecipe = await RecipeService.createRecipe({
        recipe_name,
        calories,
        picture,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        // account_id,
      });

      const result = new CustomResponse(
        StatusCodes.CREATED,
        "Recipe created successfully",
        newRecipe
      );

      return response.status(StatusCodes.CREATED).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },
};
