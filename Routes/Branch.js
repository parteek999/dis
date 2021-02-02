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
        path: '/branch/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'branch'],
            handler: (request, reply)=> {
                return Controller.Branch.Login(request.payload, request.auth.credentials)
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
        path: '/branch/updateBranch',
        config: {
            description: 'UpdateBranch',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.BRANCH]
            },
            tags: ['api', 'branch'],
            handler: (request, reply)=> {
                return Controller.Branch.UpdateBranch(request.payload, request.auth.credentials)
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
                    image:  Joi.string().trim()
                   
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
        path: '/branch/getbranch',
        config: {
            description: 'GetBranch',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.BRANCH_USERS_ADMIN]
            },
            tags: ['api', 'branch'],
            handler: (request, reply)=> {
                return Controller.Branch.GetBranch(request.query, request.auth.credentials)
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
                    lat: Joi.number().required(),
                    long: Joi.number().required()

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
