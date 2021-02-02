const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;
const winston = require('winston');

module.exports = [

    {
        method: 'GET',
        path: '/mixtures/getMixtures',
        config: {
            description: 'getMixtures',
            auth: {
                strategies:[
                    Config.APP_CONSTANTS.SCOPE.BRANCH_USERS_ADMIN_CAPTAIN
                ]
            },
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.GetMixture(request.query, request.auth.credentials)
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
                    branchId: Joi.string()
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
        path: '/mixtures/createMixtures',
        config: {
            description: 'createMixtures',
            auth: {
                strategies:[
                    Config.APP_CONSTANTS.SCOPE.BRANCH
                ]
            },
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.CreateMixture(request.payload, request.auth.credentials)
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
                    name: Joi.string().trim().required(),
                    KIItemCode: Joi.string().trim().allow(''),
                    price: Joi.number(),

                    isDeleted: Joi.boolean(),
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
        method: 'POST',
        path: '/stock/createStock',
        config: {
            description: 'createStock',
            auth: {
                strategies:[
                    Config.APP_CONSTANTS.SCOPE.BRANCH
                ]
            },
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.CreateStock(request.payload, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                payload:
                Joi.alternatives().try( Joi.object({
                    name: Joi.string().trim().required(),
                    KIItemCode: Joi.string().trim().required(),
                    isBlocked: Joi.boolean(),
                    categoryId: Joi.string().trim().required(),
                    isBottle: Joi.string().trim().required(),
                    itemType: Joi.string().trim().required(),
                    currentPrice: Joi.number().required(),
                    basePrice: Joi.number().required(),
                    maxPrice: Joi.number().required(),
                    priceIncrement: Joi.number().required(),
                    priceIncrementUnit: Joi.number().required(),
                    maxIncrementUnit: Joi.number().required(),
                    maxIncrementPrice: Joi.number().required(),
                    landingCost: Joi.number().required(),
                    maxPrice: Joi.number().required(),
                    itemOffer:Joi.string().trim(),
                    suggestMixture: Joi.boolean().required(),
                    autoOffer: Joi.boolean().required(),
                    priceVariable: Joi.boolean().required(),
                    priority: Joi.number(),
                    _id:Joi.string().trim()
                }),
                Joi.object({
                    name: Joi.string().trim().required(),
                    KIItemCode: Joi.string().trim().required(),
                    itemType: Joi.string().trim().required(),
                    isBlocked: Joi.boolean(),
                    categoryId: Joi.string().trim().required(),                    
                    currentPrice: Joi.number().required(),
                    suggestMixture: Joi.boolean(),
                    autoOffer: Joi.boolean().required(),
                    itemOffer:Joi.string().trim(),
                    priority: Joi.number(),
                    _id:Joi.string().trim()
                })),
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
        path: '/stock/getStocks',
        config: {
            description: 'getStocks',
            auth: {
                strategies:[
                    Config.APP_CONSTANTS.SCOPE.BRANCH_USERS_ADMIN_CAPTAIN
                ]
            },
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.GetStock(request.query, request.auth.credentials)
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
                    branchId: Joi.string(),
                    type: Joi.string(),

                    stockType: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.FOOD
                    ),

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
        path: '/stock/deleteStock',
        config: {
            description: 'DeleteStocks',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.BRANCH]
            },
            tags: ['api', 'stock'],
            handler: (request, reply)=> {
                return Controller.Stock.DeleteStocks(request.payload, request.auth.credentials)
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
                    isBlocked: Joi.boolean(),
                    isDeleted:Joi.boolean()

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
        path: '/stock/getTable',
        config: {
            description: 'getTable',
            auth: {
                strategies:[
                    Config.APP_CONSTANTS.SCOPE.USER
                ]
            },
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.GetTable(request.query, request.auth.credentials)
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
                    branchId: Joi.string().required()
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
        path: '/stock/crashMarket',
        config: {
            description: 'crashMarket',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.BRANCH]
            },
            tags: ['api', 'stock'],
            handler: (request, reply)=> {
                return Controller.Stock.CrashMarket(request.payload, request.auth.credentials)
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
                    _id: Joi.array().required(),
                    percentage: Joi.number().required(),
                    time: Joi.number().required(),
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
        path: '/stock/getStockByCategory',
        config: {
            description: 'getStockByCategory',
            auth: {
                strategies:[
                    Config.APP_CONSTANTS.SCOPE.BRANCH_USERS_ADMIN_CAPTAIN
                ]
            },
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.GetStockByCategory(request.query, request.auth.credentials)
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
                    categoryId: Joi.string(),
                    stockType: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.FOOD
                    ),

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
        path: '/stock/getStockWebScreen',
        config: {
            description: 'getStocks',
            auth: false,
            tags: ['api', 'Stock'],
            handler: (request, reply)=> {
                return Controller.Stock.GetStockWebScreen(request.query, request.auth.credentials)
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
                    branchId: Joi.string(),
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
    
];
