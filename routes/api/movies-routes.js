const express = require("express");

const moviesController = require('../../controllers/movies-controller');

const schemas = require("../../schemas/movies");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");


const router = express.Router();

// маршрут  get "/"
router.get("/", moviesController.getAllMovies);

// // Шукаємо
router.get("/:id",isValidId, moviesController.getMovieById);

// Додаємо 
router.post("/", validateBody(schemas.movieAddSchema), moviesController.addMovie);
// router.post("/",moviesController.addMovie);

// Змінюємо
router.put(
  "/:id", isValidId, validateBody(schemas.movieAddSchema), moviesController.updateMovieById
);

//Змінюємо конкретні поля
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.movieUpdateFavoritesSchema),
  moviesController.updateFavorite
);
 
// Видаляємо
router.delete("/:id", isValidId, moviesController.deleteMovieById);

module.exports = router;





