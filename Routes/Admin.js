const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [


    //................LOGIN......................//
    {
        method: 'POST',
        path: '/admin/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                console.log(request.payload)
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

    //.............CHANGEPASSWORD................//
    {
        method: 'POST',
        path: '/admin/changePassword',
        config: {
            description: 'changePassword',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'user'],
            handler: (request, reply) => {
                console.log("12121212", request.payload)
                return Controller.Admin.changePassword(request.payload, request.auth.credentials)
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
                    oldPasword: Joi.string().required(),
                    newPassword: Joi.string().required(),


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
        method: 'GET',
        path: '/admin/getUser',
        config: {
            description: 'GetUser',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.Admin.getUser(request.query, request.auth.credentials)
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
        method: 'GET',
        path: '/admin/userCount',
        config: {
            description: 'userCount',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.Admin.userCount(request.query, request.auth.credentials)
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
        path: '/admin/paginateUser',
        config: {
            description: 'paginateUser',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                console.log(request.payload)
                return Controller.Admin.paginateUser(request.payload, request.auth.credentials)
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
                    limit: Joi.number().required(),
                    pageNo: Joi.number().required(),
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
        path: '/admin/blockunblockUser',
        config: {
            description: 'blockunblockuser',
            auth: false,
            // {
            //     strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            // },
            tags: ['api'],
            handler: (request, reply) => {

                console.log("request.query")
                return Controller.Admin.blockunblockUser(request.query, request.auth.credentials)
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
                    id: Joi.string().required()
                }),



                // headers: UniversalFunctions.authorizationHeaderObj,
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
        path: '/admin/singleUser',
        config: {
            description: 'singleUser',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.Admin.singleUser(request.query, request.auth.credentials)
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
                    id: Joi.string().required(),
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
    // {
    //     method: 'POST',
    //     path: '/admin/uploadImage',
    //     config: {
    //         description: 'uploadImage',
    //         auth: {
    //             strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN]
    //         },
    //         tags: ['api', 'uploadImage'],
    //         handler: (request, reply) => {
    //             console.log(request.payload)
    //             return Controller.Admin.uploadImages(request.payload, request.auth.credentials)

    //                 .then(response => {
    //                     return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
    //                 })
    //                 .catch(error => {
    //                     winston.error("=====error=============", error);
    //                     return UniversalFunctions.sendError("en", error, reply);
    //                 });
    //         },

    //         payload: {
    //             output: "stream",
    //             parse: true,
    //             allow: "multipart/form-data",
    //             maxBytes: 200000000 * 1000 * 1000
    //         },

    //         validate: {

    //             payload: Joi.object({
    //                 file: Joi.any().meta({ swaggerType: 'file' }).optional(),
    //                 title: Joi.string(),
    //                 description: Joi.string()

    //             }),
    //             headers: UniversalFunctions.authorizationHeaderObj,
    //             failAction: UniversalFunctions.failActionFunction

    //         },


    //         plugins: {
    //             'hapi-swagger': {
    //                 payloadType: 'form'
    //             }
    //         }
    //     }
    // },







]