import { insertRental, getRentals, finishRental, deleteRental} from "../controllers/rental.controller.js";
import { Router } from "express";
import rentalSchema from "../schema/rentalSchema.js";
import validateSchema from "../middlewares/schemaValidation.js";
import idSchema from "../schema/idSchema.js";
import validateParams from "../middlewares/paramsValidations.js";

const rentalRoutes = Router();

rentalRoutes.get('/rentals', getRentals)
rentalRoutes.post('/rentals', validateSchema(rentalSchema) ,insertRental)
rentalRoutes.post('/rentals/:id/return', validateParams(idSchema) ,finishRental)
rentalRoutes.delete('/rentals/:id',validateParams(idSchema) ,deleteRental)

export default rentalRoutes