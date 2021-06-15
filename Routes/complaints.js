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
    path: '/complaint/complaint',
    config: {
        description: 'complaint',
        auth: false,
        tags: ['api', 'user'],
        handler: (request, reply) => {
            return Controller.Complaint.complaint(request.payload)
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
                address:Joi.string().required(),
                telephone:Joi.number().required(),
                age:Joi.string().required(),
                occupation:Joi.string().required(),
                countryCode: Joi.string().required(),
                phoneNo: Joi.number().required(),
                work:Joi.number().required(),
                recipientName:Joi.string().required(),
                recipientAddress:Joi.string().required(),
                recipientTelephone:Joi.number().required(),
                description1:Joi.string(),
                description2:Joi.string(),
                description3:Joi.string(),
                description4:Joi.string(),
                description5:Joi.string(),
                // description6:Joi.string(),
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
    path: '/complaint/getComplaint',
    config: {
        description: 'getComplaint',
        // auth:false,
        auth: {
            strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
        },
        tags: ['api','admin'],
        handler: (request, reply)=> {
            return Controller.Complaint.getComplaint(request.query, request.auth.credentials)
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
    path: '/complaint/singleComlaint',
    config: {
        description: 'singleComlaint',
        auth:false,
        //  {
        //     strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
        // },
        tags: ['api'],
        handler: (request, reply)=> {
            return Controller.Complaint.singleComlaint(request.query, request.auth.credentials)
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
                id:Joi.string().required(),
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
    method: 'POST',
    path: '/complaint/editStatus',
    config: {
        description: "editStatus",
        auth: {
            strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
        },
        tags: ['api'],

        handler: (request, reply) => {
            console.log(request.payload)
            return Controller.Complaint.editStatus(request.payload,request.auth.credentials)
                
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
                id:Joi.string(),
                status:Joi.string(),
            }),
            headers: UniversalFunctions.authorizationHeaderObj,
            failAction: UniversalFunctions.failActionFunction },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
            }
        }
    }
}
]