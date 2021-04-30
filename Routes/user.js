const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [

    //...................SIGNUP.........................//
    {
        method: 'POST',
        path: '/user/signUp',
        config: {
            description: 'SignUp',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.signUp(request.payload)
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
                    name: Joi.string().trim().required(),
                    countryCode: Joi.string().required(),
                    phoneNo: Joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required(),
                    password: Joi.string().min(6).message("Password length atleast 6 digits").required(),
                    // profilepic:Joi.array().items(Joi.string()),
                    deviceType:Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken:Joi.string()

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
    //...................LOGIN..........................//
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
                    password: Joi.string().trim().required(),
                    deviceType:Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken:Joi.string()
                }),
                headers: UniversalFunctions.authorizationHeaderObjOptional,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },
    //..................SOCIALLOGIN...................//    
    {
        method: 'POST',
        path: '/user/socialLogin',
        config: 
        {
            description: 'socialLogin',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.socialLogin(request.payload, request.auth.credentials)
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
                    socialId: Joi.string().trim().required(),
                    email: Joi.string().email().lowercase().trim().required(),
                    name: Joi.string().trim().required(),
                    countryCode: Joi.string().required(),
                    phoneNo: Joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required(),
                    password: Joi.string().min(6).message("Password length atleast 6 digits").required(),
                    deviceType:Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken:Joi.string()
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
    //...................RESETPASSWORD....................//    
    {
        method: 'POST',
        path: '/user/resetPassword',
        config: {
            description: 'resetPassword',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.resetPassword(request,request.auth.credentials)
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

                    newPassword: Joi.string().required(),
                    oldPassword: Joi.string().required()

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
    //..................FORGOTPASSWORD...................//    
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
    //..................EDITPROFILE...................//    
    {
        method: 'POST',
        path: '/user/editProfile',
        config: {
            description: 'editProfile',
            // auth: false,
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
                    email: Joi.string().email().lowercase().trim().required().allow(null).allow('').optional(),
                    fullName: Joi.string().trim().required().allow(null).allow('').optional(),
                    countrycode: Joi.string().required().allow(null).allow('').optional(),
                    phoneNo: Joi.string().trim().required().allow(null).allow('').optional(),
                    profilePic: Joi.string().allow(null).allow('').optional(),
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




    //..................CHANGEPASSWORD...................//        
    {
        method: 'POST',
        path: '/user/changePassword',
        config: {
            description: 'changePassword',
            auth:
            {
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
                    newpassword: Joi.string(),
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
    //..................SENDNOTIFICATION...................//        
    {
        method: 'POST',
        path: '/user/sendNotification',
        config: {
            description: 'sendNotification',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'user'],
            handler: (request, reply) => {
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
    //..................CERATE...................//    
    {
        method: 'GET',
        path: '/create',
        config: {
            description: 'create',
            auth: false,

            tags: ['api', 'create'],
            handler: (request, reply) => {

                return Controller.user.create(request, reply)
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },
    //..................HELLO...................//    
    {
        method: 'GET',
        path: '/hello',
        config: {
            description: 'hello',
            auth: false,

            tags: ['api', 'hello'],
            handler: (request, reply) => {
                return Controller.user.hello(request, reply)

            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },




    //..................BOOKMARKED...................//    
    {
        method: 'POST',
        path: '/user/bookmarked',
        config: {
            description: 'bookmarked',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.user.bookMarked(request.payload, request.auth.credentials)
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
                    article_Id: Joi.string(),
                    mark: Joi.number(),
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
    //..................BOOKMARKEDID...................//    
    {
        method: 'POST',
        path: '/user/bokmarkedId',
        config: {
            description: 'bookmarkedId',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.user.bookmarkedId(request.payload, request.auth.credentials)
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
                    article_Id: Joi.array().required(),

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
    //..................FORMSUBMIT...................//    
    {
        method: 'POST',
        path: '/user/formSubmit',
        config: {
            description: 'formSubmit',
            auth: false,

            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.formSubmit(request.payload, request.auth.credentials)
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
                    fname: Joi.string(),
                    email: Joi.string(),
                    phoneNumber: Joi.string(),
                    about: Joi.string(),
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

]




