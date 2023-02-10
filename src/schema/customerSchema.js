import JoiDate from '@joi/date';
import joi from 'joi';

const Joi = joi.extend(JoiDate)

const dateFormat = 'YYYY-MM-DD';

const customerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    cpf: Joi.string().regex(/^\d+$/).min(11).max(11).required(),
    phone: Joi.string().regex(/^\d+$/).min(10).max(11).required(),
    birthday: Joi.date().required()
})

export default customerSchema