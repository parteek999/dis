const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [

    //...................ADD RIGHTS.........................//
    {
        method: 'POST',
        path: '/rights/addRights',
        config: {
            description: 'addRights',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.rights.addRights(request.payload, request.auth.credentials)
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
                    title:Joi.string(),
                    description:Joi.string()
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/rights/getRights',
        config: {
            description: "getRights",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN_USER] },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.rights.getRights(request.query,request.auth.credentials)
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
        path: '/rights/singleRight',
        config: {
            description: "singleRight",
            // auth:false,
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN_USER] },
            tags: ['api'],

            handler: (request, reply) => {
                //  console.log("1111111111111",request)
                 console.log("222222222222",request.query)

                return Controller.rights.singleRights(request.query,request.auth.credentials)
                    
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
        path: '/rights/deleteRights',
        config: {
            description: "deleteRights",
            // auth:false,
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],

            handler: (request, reply) => {
                //  console.log("1111111111111",request)
                 console.log("222222222222",request.payload)

                return Controller.rights.deleteRights(request.payload,request.auth.credentials)
                    
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