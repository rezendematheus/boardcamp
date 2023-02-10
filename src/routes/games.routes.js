import { Router } from "express";
import { getGames, insertGame } from "../controllers/games.controller.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", insertGame);

const gamesRoutes = router;

export default gamesRoutes;