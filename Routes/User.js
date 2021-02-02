/**
 * Created by Shumi on 17/3/20.
 */



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
        path: '/user/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                return Controller.User.Login(request.payload, request.auth.credentials)
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
        path: '/user/signUp',
        config: {
            description: 'SignUp',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                return Controller.User.SignUp(request.payload, request.auth.credentials)
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
                    // profilePic: Joi.any()
                    //     .meta({swaggerType: 'file'})
                    //     .required()
                    //     .description('image file'),
                    email: Joi.string().email().lowercase().trim().required(),
                    firstName: Joi.string().trim().required(),
                    lastName: Joi.string().trim().required(),
                    password: Joi.string().required(),
                    gender: Joi.string(),
                    dob: Joi.string(),
                    profilePicURL: Joi.string(),
                 }),
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
        path: '/user/socialLogin',
        config: {
            description: 'socialLogin',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                return Controller.User.SocialLogin(request.payload, request.auth.credentials)
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
                    socialId:Joi.string().trim().required(),
                    loginType: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.GMAIL,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.FACEBOOK,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.APPLE_ID
                    ),
                    email: Joi.string().email().lowercase().trim(),
                    firstName: Joi.string().trim().required(),
                    lastName: Joi.string().trim().required(),
                    gender: Joi.string(),
                    profilePicURL: Joi.string(),

                    dob: Joi.string(),
                 }),
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
        path: '/user/updateUser',
        config: {
            description: 'UpdateUser',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                return Controller.User.UpdateUser(request.payload, request.auth.credentials)
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
                    firstName: Joi.string().trim(),
                    lastName: Joi.string().trim(),
                    password: Joi.string(),
                    gender: Joi.string(),
                    dob: Joi.string(),
                    deviceType:Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken:Joi.string()
                    // _id: Joi.string()
                   
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
        path: '/user/getuser',
        config: {
            description: 'GetUser',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                return Controller.User.GetUser(request.query, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                query: Joi.object({}),
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
        path: '/user/sendNotification',
        config: {
            description: 'sendNotification',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                return Controller.User.SendNotification(request.payload, request.auth.credentials)
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
                    message: Joi.string().required().trim(),
                   
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
   
];
