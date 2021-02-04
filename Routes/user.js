const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;
const winston = require('winston');

module.exports = [{
    method: 'POST',
    path: '/user/signUp',
    config: {
        description: 'SignUp',
        auth: false,
        tags: ['api', 'user'],
        handler: (request, reply)=> {
            return Controller.user.signup(request.payload, request.auth.credentials)
                .then(response => {
                    return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                })
                .catch(error => {
                    winston.error("=====error=============", error);
                    return UniversalFunctions.sendError("en", error, reply);
                });
        },
        validate: {
            payload: Joi.object({
                email: Joi.string().email().lowercase().trim().required(),
                fullname: Joi.string().trim().required(),
                phoneno:Joi.string().trim().required(),
                password: Joi.string().required(),
                verifypassword:Joi.string().required(),
                gender: Joi.string(),
                dob: Joi.string(),
                addPhotosURL: Joi.string(),
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