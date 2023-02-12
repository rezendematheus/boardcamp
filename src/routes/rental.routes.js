import { insertRental, getRentals, finishRental, deleteRental} from "../controllers/rental.controller.js";
import { Router } from "express";
import rentalSchema from "../schema/rentalSchema.js";
import validateSchema from "../middlewares/schemaValidation.js";

const rentalRoutes = Router();

rentalRoutes.get('/rentals', getRentals)
rentalRoutes.post('/rentals', validateSchema(rentalSchema) ,insertRental)
rentalRoutes.post('/rentals/:id/return', finishRental)
rentalRoutes.delete('/rentals', deleteRental)

export default rentalRoutes