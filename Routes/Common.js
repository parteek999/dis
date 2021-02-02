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
        path: '/common/uploadFile',
        config: {
            description: 'uploadFile',
            auth : 
            {
                strategies:[Config.APP_CONSTANTS.SCOPE.BRANCH_USERS_ADMIN]
            },
            tags: ['api', 'common'],
            handler: (request, reply)=> {
                return Controller.Common.UploadFile(request.payload, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en",SUCCESS.DEFAULT,response, reply);
                    })
                    .catch(error => {
                        return UniversalFunctions.sendError("en",error, reply);
                    });
            },
            // handler: (request, reply)=> {
            //     return Controller.Branch.UpdateBranch(request.payload, request.auth.credentials)
            //         .then(response => {
            //             return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
            //         })
            //         .catch(error => {
            //             return UniversalFunctions.sendError("en", error, reply);
            //         });
            // },
            payload: {
                output:'stream',
                allow:'multipart/form-data',
                parse:true,
                maxBytes:"52428800",
                timeout:false
            },
            validate: {
                payload: Joi.object({
                    image: Joi.any()
                        .meta({ swaggerType: 'file' })
                        .description('Enter image')
                        .required()
                }),
                failAction: UniversalFunctions.failActionFunction,
                headers: UniversalFunctions.authorizationHeaderObj,

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
        path: '/common/forgetPassword',
        config: {
            description: 'forgetPassword',
            auth: false,
            tags: ['api', 'common'],
            handler: (request, reply)=> {
                return Controller.Common.ForgetPassword(request.payload, request.auth.credentials)
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
                    email: Joi.string().required(),
                    type: Joi.string().required().valid('ADMIN', 'USER', 'CAPTAIN')
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    }
];
