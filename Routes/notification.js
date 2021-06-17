const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [

    {
        method: 'GET',
        path: '/notification/getUserNotification',
        config: {
            description: "getUserNotification",
            
                auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
                
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.notification.getUserNotification(request.query,request.auth.credentials)
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
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },

   
]
