import Joi from "joi";

const gameSchema = Joi.object({
    name: Joi.string().min(3).required(),
    image: Joi.string().min(5).required(),
    stockTotal: Joi.number().greater(0).required(),
    pricePerDay: Joi.number().greater(0).required()
})

export default gameSchema