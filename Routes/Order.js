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
        path: '/order/placeOrder',
        config: {
            description: 'placeOrder',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER_CAPTAIN]
            },
            tags: ['api', 'order'],
            handler: (request, reply) => {
                return Controller.Order.PlaceOrder(request.payload, request.auth.credentials)
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
                    stock: Joi.array().items(
                        Joi.object().keys({
                            _id: Joi.string().required(),
                            categoryId: Joi.string().required(),
                            quantity: Joi.number().required(),
                            price: Joi.number().required(),
                            type: Joi.string().required().valid(
                                Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.FOOD,
                                Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE
                            )
                        })).required().description("_id , price,  qualtity"),
                    mixture: Joi.array().items(
                        Joi.object().keys({
                            _id: Joi.string().required(),
                            quantity: Joi.number().required(),
                            price: Joi.number().required()
                        })).description("_id , price, qualtity"),
                    totalAmount: Joi.number().required(),
                    cashbackUsed: Joi.number(),
                    tableNo: Joi.string().required(),
                    branchId: Joi.string().required(),
                    discount: Joi.object().keys({
                        amount: Joi.number(),
                        type: Joi.number().valid(0, 1, 2).description("Which type of offer to load=> 0 for discount, 1 for cashback and 2 for scratch")
                    }),
                    long: Joi.number(),
                    lat: Joi.number(),
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/order/getOrder',
        config: {
            description: 'getOrder',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER_CAPTAIN]
            },
            tags: ['api', 'order'],
            handler: (request, reply) => {
                return Controller.Order.GetOrder(request.query, request.auth.credentials)
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

                    status: Joi.string().valid(
                        'All',
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.PENDING
                    )
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
        path: '/order/orderAction',
        config: {
            description: 'Update order status=> Accept/Reject',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.CAPTAIN]
            },
            tags: ['api', 'order'],
            handler: (request, reply) => {
                return Controller.Order.OrderAction(request.payload, request.auth.credentials)
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
                    _id: Joi.string().required().trim(),
                    status: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.REJECT,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.CONFIRMED,
                    ).required()
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
        path: '/order/botContent',
        config: {
            description: 'botContent start',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'order'],
            handler: (request, reply) => {
                return Controller.Order.BotContent(request.query, request.auth.credentials)
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
                    payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/order/placeOrderCheck',
        config: {
            description: 'placeOrderCheck',
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'order'],
            handler: (request, reply) => {
                return Controller.Order.PlaceOrderCheck(request.query, request.auth.credentials)
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
                    payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/order/ratings',
        config: {
            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },

            tags: ['api'],
            handler: (request, reply) => {

                return Controller.Order.userrating(request.payload, request.auth.credentials)

                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("error", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                payload: Joi.object({
                    _id:Joi.string(),
                   
                    rating: Joi.object().keys({ 
                        srevice: Joi.number(),
                        quality: Joi.number ()
                    }).required()
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    // payloadType: 'form'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/order/overallrating',
        config: {

            auth: {
                strategies: [Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'order'],
            handler: (request, reply) => {
                return Controller.Order.getrating(request.query)
                    .then(response => {

                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);

                    })
            },
                validate: {
                    query: Joi.object({
                     
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
