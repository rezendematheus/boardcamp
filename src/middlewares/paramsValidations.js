export default function validateParams(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.params, {abortEarly: false})
        if(error){
            return res
                .status(400)
                .send(error.details.map(detail => detail.message))
        }
        next();
    }
}