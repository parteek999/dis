const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [
    {
        method: 'POST',
        path: '/news/createNews',
        config: {
            description: 'createNews',
             auth:   {
                     strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
                },
            tags: ['api', 'createNews'],
            handler: (request, reply) => {
                console.log(request.payload)
                return Controller.news.createNews(request.payload, request.auth.credentials)

                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 200000000 * 1000 * 1000
            },
            validate: {

                 payload: Joi.object({
                    file: Joi.any().meta({ swaggerType: 'file' }).optional(),
                    title:Joi.string(),
                    description:Joi.string()

                }),
                 headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/news/getNews',
        config: {
            description: "getNews",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN_USER] },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.news.getNews(request.query,request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/news/getUserNews',
        config: {
            description: "getUserNews",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.news.getUserNews(request.query,request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/news/singleNews',
        config: {
            description: "singleNews",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN_USER] },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.news.singleNews(request.query,request.auth.credentials)
                    
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                query: Joi.object({
                    id:Joi.string(),
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },

    {
        method: 'POST',
        path: '/news/deleteNews',
        config: {
            description: "deleteNews",
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.news.deleteNews(request.payload,request.auth.credentials)
                    
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
                    id:Joi.string(),
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    }
]
