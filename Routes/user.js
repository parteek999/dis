const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');

module.exports = [
    {
        method: 'POST',
        path: '/user/signUp',
        config: {
            description: 'SignUp',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.signup(request.payload)
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
                    fullName: Joi.string().trim().required(),
                    countrycode: Joi.string().required(),
                    phoneNo: Joi.string().trim().required(),
                    password: Joi.string().required(),
                    profilepic:Joi.string(),
                    imgurl:  Joi.array().items(Joi.string()),
                    // xyz:Joi.array().items(Joi.object({
                    //     full: Joi.string().trim().required(),
                    //     code: Joi.string().required(),
                    // }))
                    

                }),
                headers: UniversalFunctions.authorizationHeaderObjOptional,
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
        path: '/user/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.login(request.query, request.auth.credentials)
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
                    email: Joi.string().email().lowercase().trim().required(),
                    password: Joi.string().trim().required()
                }),
                headers: UniversalFunctions.authorizationHeaderObjOptional,
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
        path: '/user/changePassword',
        config: {
            description: 'changePassword',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.changePassword(request.payload, request.auth.credentials)
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
                    newPassword: Joi.string(),

                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction,
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
        path: '/user/forgetPassword',
        config: {
            description: 'forgetPassword',
            auth: false,
            
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.forgetPassword(request.payload, request.auth.credentials)
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
                    email: Joi.string(),
                }),
                failAction: UniversalFunctions.failActionFunction,
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
        path: '/user/editProfile',
        config: {
            description: 'editProfile',
            auth: false,
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.editProfile(request.payload, request.auth.credentials)
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
                    fullName: Joi.string().trim().required(),
                    countrycode: Joi.string().required(),
                    phoneNo: Joi.string().trim().required(),
                    profilepic:Joi.string(),
                
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },
]