const Joi = require('joi');

const idSchema = {
    params: {
        id: Joi.string().required()
    }
};

module.exports = {
    idSchema
};
