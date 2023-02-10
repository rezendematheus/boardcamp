import Joi from "joi";

export default gameSchema = Joi.object({
    name: Joi.string().min(3).alphanum(),
    image: Joi.string().min(5).alphanum(),
    stockTotal: Joi.number().greater(0),
    pricePerDay: Joi.number().greater(0)
})