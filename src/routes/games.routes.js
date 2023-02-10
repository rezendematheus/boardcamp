import { Router } from "express";
import { getGames, insertGame } from "../controllers/games.controller.js";
import gameSchema from "../schema/gameSchema.js";
import validateSchema from "../middlewares/schemaValidation.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateSchema(gameSchema), insertGame);

const gamesRoutes = router;

export default gamesRoutes;