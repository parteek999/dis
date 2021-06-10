const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;


const winston = require('winston');



module.exports = [

    {
        method: 'POST',
        path: '/directory/addDirectory',
        config: {
            description: 'directory',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'directory'],
            handler: (request, reply) => {
                return Controller.directory.directory(request.payload, request.auth.credentials)

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
                    directoryType:Joi.string(),
                    directoryName: Joi.string(),
                    aboutDirectory: Joi.string(),
                    phoneNO: Joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number"),
                    address: Joi.string(),
                    website: Joi.string(),
                    startTime: Joi.string().regex(/(0[1-9]:[0-5][0-9]((\ ){0,1})((AM)|(PM)|(am)|(pm)))|([1-9]:[0-5][0-9]((\ ){0,1})((AM)|(PM)|(am)|(pm)))|(1[0-2]:[0-5][0-9]((\ ){0,1})((AM)|(PM)|(am)|(pm)))/),
                    endTime: Joi.string().regex(/(0[1-9]:[0-5][0-9]((\ ){0,1})((AM)|(PM)|(am)|(pm)))|([1-9]:[0-5][0-9]((\ ){0,1})((AM)|(PM)|(am)|(pm)))|(1[0-2]:[0-5][0-9]((\ ){0,1})((AM)|(PM)|(am)|(pm)))/),
                    facebookLInk: Joi.string(),
                    instagramLInk: Joi.string(),
                    twitterLink: Joi.string(),

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
        path: '/directory/getDirectory',
        config: {
            description: "getDirectory",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
            tags: ['api', "getDirectory"],
            handler: (request, reply) => {
                return Controller.directory.getDirectory(request.query, request.auth.credentials)
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
        path: '/directory/getUserDirectory',
        config: {
            description: "getUserDirectory",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', "getUserDirectory"],
            handler: (request, reply) => {
                return Controller.directory.getUserDirectory(request.query, request.auth.credentials)
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
                    directoryType:Joi.string()
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
        path: '/directory/singleDirectory',
        config: {
            description: "singleDirectory",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', "singleDirectory"],
            handler: (request, reply) => {
                return Controller.directory.singleDirectory(request.query, request.auth.credentials)
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
        method: 'POST',
        path: '/directory/deleteDirectory',
        config: {
            description: 'deleteDirectory',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'directory'],
            handler: (request, reply) => {
                return Controller.directory.deleteDirectory(request.payload, request.auth.credentials)

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
                    id: Joi.string().required()
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
]

