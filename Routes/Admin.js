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
        path: '/admin/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.Login(request.payload, request.auth.credentials)
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
        path: '/admin/createBranch',
        config: {
            description: 'createBranch',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.CreateBranch(request.payload, request.auth.credentials)
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
                    image:  Joi.string().required().trim(),
                    name: Joi.string().required().trim(),
                    location: Joi.array().required(),
                    city: Joi.string().required().trim(),
                    managerName: Joi.string().required().trim(),
                    email: Joi.string().email().required().trim(),
                    phoneNo: Joi.string().required(),
                    _id: Joi.string(),
                    // crashMarket:Joi.boolean().required(),
                   
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
        path: '/admin/updateBranch',
        config: {
            description: 'UpdateBranch',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.UpdateBranch(request.payload, request.auth.credentials)
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
                    name: Joi.string().trim(),
                    location: Joi.array(),
                    city: Joi.string().trim(),
                    managerName: Joi.string().trim(),
                    // email: Joi.string().email().trim(),
                    phoneNo: Joi.string(),
                    crashMarket:Joi.boolean(),
                    _id: Joi.string().required()
                   
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
        path: '/admin/getBranch',
        config: {
            description: 'GetBranch',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.BRANCH_USERS_ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.GetBranch(request.query, request.auth.credentials)
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
        method: 'DELETE',
        path: '/admin/deleteBranch',
        config: {
            description: 'DeleteBranch',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.DeleteBranch(request.payload, request.auth.credentials)
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
                    _id: Joi.string().required(),
                    isBlocked: Joi.boolean().required(),

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
        method: 'DELETE',
        path: '/admin/deleteCategory',
        config: {
            description: 'DeleteCategory',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN_BRANCH]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.DeleteCategory(request.payload, request.auth.credentials)
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
                    _id: Joi.string().required(),
                    isBlocked: Joi.boolean().required(),

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
        path: '/admin/createCategory',
        config: {
            description: 'createCategory',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN_BRANCH]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.CreateCategory(request.payload, request.auth.credentials)
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
                    image: Joi.string().required().trim(),
                    name: Joi.string().required().trim(),
                    priority: Joi.number().required(),
                    type: Joi.string().required(),
                    isBlocked: Joi.boolean(),
                    _id: Joi.string().trim()
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
        path: '/admin/getCategory',
        config: {
            description: 'GetCategory',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN_BRANCH]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.GetCategory(request.query, request.auth.credentials)
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
                    type:Joi.string()
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
        path: '/admin/createCity',
        config: {
            description: 'createCity',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.CreateCity(request.payload, request.auth.credentials)
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
                    name: Joi.string().required().trim(),
                   
                    isBlocked: Joi.boolean(),
                    _id: Joi.string().trim()
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
        path: '/admin/getCity',
        config: {
            description: 'GetCity',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN_BRANCH]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.GetCity(request.query, request.auth.credentials)
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
        method: 'DELETE',
        path: '/admin/deleteCity',
        config: {
            description: 'DeleteCity',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.DeleteCity(request.payload, request.auth.credentials)
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
                    _id: Joi.string().required(),
                    isBlocked: Joi.boolean().required(),

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
        path: '/admin/createBotContent',
        config: {
            description: 'CreateBotContent',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.CreateBotContent(request.payload, request.auth.credentials)
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
                    image:  Joi.string().required().trim(),
                    type: Joi.string().required().trim(),
                    text: Joi.string().required(),                   
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
        path: '/admin/getBotContent',
        config: {
            description: 'GetBotContent',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN_BRANCH]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.GetBotContent(request.query, request.auth.credentials)
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
        method: 'DELETE',
        path: '/admin/deleteBotContent',
        config: {
            description: 'DeleteBotContent',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.DeleteBotContent(request.payload, request.auth.credentials)
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
                    _id: Joi.string().required(),
                    isBlocked: Joi.boolean().required(),

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
        path: '/admin/dashboard',
        config: {
            description: 'Dashboard',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply)=> {
                return Controller.Admin.Dashboard(request.query, request.auth.credentials)
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
   
];
