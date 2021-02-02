const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [
    {
        method: 'POST',
        path: '/new/newuser',
        config: {
            description:'newuser',
            auth: false,

            tags: ['api', 'new'],
            handler: (request, reply) => {
                return Controller.signupnew.part(request.payload)
                    .then(response => {
                     return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);

                    })
            },
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    gender: Joi.string(),
                    dob: Joi.string(),
                                   }),
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },
]