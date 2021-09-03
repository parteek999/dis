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
                console.log("sdsdsdsdsdsd",request.payload)
                return Controller.directory.directory(request.payload, request.auth.credentials)

                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            payload : {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 200000000 * 1000 * 1000
            },
            validate: {
                payload: Joi.object({
                    file: Joi.any().meta({ swaggerType: 'file' }).required(),
                    directoryType:Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.GOVERNMENT ,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.NGO ,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.SERVICEANDSUPPORT ,
                    ).required(),
                    directoryName: Joi.string().required(),
                    aboutDirectory: Joi.string().allow(""),
                    phoneNO: Joi.number().required(),
                    address: Joi.string().required(),
                    website: Joi.string().allow(""),
                    startTime: Joi.string().required(),
                    endTime: Joi.string().required(),
                    facebookLInk: Joi.string().allow(""),
                    instagramLInk: Joi.string().allow(""),
                    twitterLink: Joi.string().allow(""),
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
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER], mode: 'optional' },
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
                    directoryType:Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT. DIRECTORY_TYPE.GOVERNMENT,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT. DIRECTORY_TYPE.NGO,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT. DIRECTORY_TYPE.SERVICEANDSUPPORT,
                    ),
                    search:Joi.string().allow("")
                }),
                // headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },






    // {
    //     method: 'GET',
    //     path: '/directory/getSearchUserDirectory',
    //     config: {
    //         description: "getUserDirectory",
    //         auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER], mode: 'optional' },
    //         tags: ['api', "getUserDirectory"],
    //         handler: (request, reply) => {
    //             return Controller.directory.getSearchUserDirectory(request.query, request.auth.credentials)
    //                 .then(response => {
    //                     return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
    //                 })
    //                 .catch(error => {
    //                     winston.error("=====error=============", error);
    //                     return UniversalFunctions.sendError("en", error, reply);
    //                 });
    //         },
    //         validate: {
    //             query: Joi.object({
    //                 directoryType:Joi.string().valid(
    //                     Config.APP_CONSTANTS.DATABASE_CONSTANT. DIRECTORY_TYPE.GOVERNMENT,
    //                     Config.APP_CONSTANTS.DATABASE_CONSTANT. DIRECTORY_TYPE.NGO,
    //                     Config.APP_CONSTANTS.DATABASE_CONSTANT. DIRECTORY_TYPE.SERVICEANDSUPPORT,
    //                 ),
    //                 search:Joi.string().allow("")
    //             }),
    //             // headers: UniversalFunctions.authorizationHeaderObj,
    //             failAction: UniversalFunctions.failActionFunction
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 payloadType: 'form',
    //             }
    //         }
    //     }
    // },












    {
        method: 'GET',
        path: '/directory/singleDirectory',
        config: {
            description: "singleDirectory",
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
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
                console.log("qwertty",request.payload)
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

    {
        method: 'POST',
        path: '/directory/editDirectory',
        config: {
            description: 'editDirectory',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'directory'],
            handler: (request, reply) => {
                return Controller.directory.editDirectory(request.payload, request.auth.credentials)

                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            payload : {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 200000000 * 1000 * 1000
            },
            validate: {
                payload: Joi.object({
                    id:Joi.string(),
                    file: Joi.any().meta({ swaggerType: 'file' }).optional(),
                    directoryType:Joi.string()
                    .valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.GOVERNMENT,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.NGO,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.SERVICEANDSUPPORT,
                        ).allow('')
                    ,
                    directoryName: Joi.string().allow(''),
                    aboutDirectory: Joi.string().allow(''),
                    phoneNO: Joi.number().allow(''),
                    address: Joi.string().allow(''),
                    website: Joi.string().allow(''),
                    startTime: Joi.string().allow(''),
                    endTime: Joi.string().allow(''),
                    facebookLInk: Joi.string().allow(''),
                    instagramLInk: Joi.string().allow(''),
                    twitterLink: Joi.string().allow(''),
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
    }
]

