const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');

module.exports = [
    {
        method: 'POST',
        path: '/party/createEvent',
        config: {
            description: 'createEvent',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.party.createEvent(request.payload,request.auth.credentials)
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
                    name: Joi.string().trim().required(),
                    price: Joi.number().required(),
                    venue: Joi.string().required(),
                    startTime: Joi.date(),
                    endingTime: Joi.date(),
                    description: Joi.string().required(),
                    guestLimit: Joi.number().required(),
                    category: Joi.string().required(),
                    eventhostType: Joi.string().required(),
                    imageUrl: Joi.string().required(),
                    // _id:Joi.string().required(),

                    loc: Joi.object({
                        type: Joi.string(),
                        coordinates: Joi.array().items(Joi.number())
                    })
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/party/searchEvent',
        config: {
            description: 'searchEvent',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.party.searchEvent(request.payload)
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
                    latitude: Joi.string(),
                    longitude: Joi.string(),

                })
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },
    {
        method: "POST",
        path: "/images",
        config: {
            tags: ['api'],
            auth: false,
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 2 * 1000 * 1000,

            },

            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                },

            },
            handler: (request, reply) => {
                return Controller.party.imageUpload(request.payload)
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
                    file: Joi.array().items(Joi.any()
                        .meta({ swaggerType: 'file' }).required()
                        .description('file')
                    ),
                }),
                headers: UniversalFunctions.authorizationHeaderObjOptional,
                failAction: UniversalFunctions.failActionFunction
            }
        },
    }
]