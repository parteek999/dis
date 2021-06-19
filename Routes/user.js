const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');
const Models = require('../Models');
const Bcrypt = require('bcryptjs');
const DAO = require('../DAOManager').queries;


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
                    phoneNo: Joi.number().required(),
                    password: Joi.string().required(),
                    // profilepic:Joi.array().items(Joi.string()),
                    deviceType: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken: Joi.string()

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
        method: 'POST',
        path: '/user/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.login(request.payload, request.auth.credentials)
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
                    password: Joi.string().trim().required(),
                   
                    deviceType: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken: Joi.string()
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
                    deviceType: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
                    ),
                    deviceToken: Joi.string()
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

    //...................changePassword....................//  
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
                return Controller.user.changePassword(request, request.auth.credentials)
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
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 200000000 * 1000 * 1000
            },
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().lowercase().trim().required().allow(null).allow('').optional(),
                    fullName: Joi.string().trim().required().allow(null).allow('').optional(),
                    countrycode: Joi.string().required().allow(null).allow('').optional(),
                    phoneNo: Joi.string().trim().required().allow(null).allow('').optional(),
                    // profilePic: Joi.string().allow(null).allow('').optional(),
                    file: Joi.any().meta({ swaggerType: 'file' }).optional(),
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
    // {
    //     method: 'POST',
    //     path: '/user/bokmarkedId',
    //     config: {
    //         description: 'bookmarkedId',
    //         auth: {
    //             strategies: [Config.APP_CONSTANTS.SCOPE.USER]
    //         },
    //         tags: ['api'],
    //         handler: (request, reply) => {
    //             return Controller.user.bookmarkedId(request.payload, request.auth.credentials)
    //                 .then(response => {
    //                     return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
    //                 })
    //                 .catch(error => {
    //                     winston.error("=====error=============", error);
    //                     return UniversalFunctions.sendError("en", error, reply);
    //                 });
    //         },

    //         validate: {
    //             payload: Joi.object({
    //                 article_Id: Joi.array().required(),

    //             }),
    //             headers: UniversalFunctions.authorizationHeaderObj,
    //             failAction: UniversalFunctions.failActionFunction
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 payloadType: 'form',
    //             }
    //         }
    //     }
    // },
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
                    email: Joi.string().email(),
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

    //forget password api
    {
        method: 'POST',
        path: '/user/forgetPassword',
        config: {
            description: 'forgetPassword',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.forgetPassword(request.payload)
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
                    email: Joi.string().email().required(),

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
        path: '/user/resetPassword',
        config: {
            description: 'resetPassword',
            auth: false,
            validate: {
                payload: Joi.object({
                    password: Joi.string().required(),
                    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'Password does not match' })
                }),
            },
            // { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', 'user'],
            handler: async (request, h) => {
                let { password } = request.payload
                let query = { _id: request.query.id }
                // console.log(userId.id)
                password = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
                const result = await DAO.findAndUpdate(Models.Users, query, { password: password })
                // console.log("hi")
                return h.redirect("/user/renderConfirmPage")
                //          Controller.User.resetPassword(request.payload, request.query, h)
                //             .then(response => {
                //                 return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, h);
                //             })
                //             .catch(error => {
                //                 winston.error("=====error=============", error);
                //                 return UniversalFunctions.sendError("en", error, h);
                //             });
                //     },
                   
                //     plugins: {
                //         'hapi-swagger': {
                //             payloadType: 'form'
                //         }
            }
        }
    },

    {
        method: 'Get',
        path: '/user/forgotPasswordPageRender',
        config: {
            description: 'forgotPasswordPageRender',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.forgotPasswordPageRender(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'Get',
        path: '/user/renderConfirmPage',
        config: {
            description: 'forgotPasswordPageRender',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.renderConfirmPage(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    //    payloadType: 'form'
                }
            }
        }
    },


    {
        method: 'Get',
        path: '/user/termsAndConditionPage',
        config: {
            description: 'termsAndConditionPage',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.termsAndConditionPage(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    //    payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'Get',
        path: '/user/faqPage',
        config: {
            description: 'faqPage',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.faqPage(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    //    payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'Get',
        path: '/user/aboutCommission',
        config: {
            description: 'aboutCommission',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.aboutCommission(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    //    payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'Get',
        path: '/user/yourRights',
        config: {
            description: 'yourRights',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.yourRights(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    //    payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'Get',
        path: '/user/disabilityAct',
        config: {
            description: 'disabilityAct',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.disabilityAct(request.query, reply)
            },
            plugins: {
                'hapi-swagger': {
                    //    payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/user/getHtml',
        config: {
            description: 'getHtml',
            auth:false, 
            // {
            //     strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            // },
            tags: ['api', 'user'],
            handler: (request, reply) => {
                return Controller.user.getHtml( request.query)
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
                    type:Joi.string(),
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },


]




