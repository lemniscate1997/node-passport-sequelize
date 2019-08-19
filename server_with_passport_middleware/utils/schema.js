const Joi = require('joi');

const idSchema = {
    params: {
        id: Joi.number().default(10).required()
    }
};

module.exports = {
    idSchema
};