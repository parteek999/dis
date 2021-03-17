const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [
    {
        method: 'POST',
        path: '/news/createArticle',
        config: {
            description: "createArticle",
            // auth:false,
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.news.news(request.payload,request.auth.credentials)
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
                article:Joi.string(),
               
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
