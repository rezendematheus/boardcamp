import { Router } from "express";
import { getCustomers, getCustomerById, insertCustomer, updateCustomer } from "../controllers/customers.controller.js";
import validateSchema from "../middlewares/schemaValidation.js";
import customerSchema from "../schema/customerSchema.js";

const customerRoutes = Router()

customerRoutes.get('/customers', getCustomers)
customerRoutes.get('/customers/:id', getCustomerById)
customerRoutes.post('/customers', validateSchema(customerSchema), insertCustomer)
customerRoutes.put('/customers/:id', validateSchema(customerSchema), updateCustomer)

export default customerRoutes