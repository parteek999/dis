const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');


module.exports = [
    {
        method: 'POST',
        path: '/ratings/create',
        config: {

            auth: false,

            tags: ['api', 'crud'],
            handler: (request, reply) => {
                return Controller.crud.ratings(request.payload)
                    .then(response => {

                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);

                    })
            },
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    rating: Joi.number().min(1).max(5).required(),
                }),
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
        path: '/ratings/getratings',
        config: {
            auth:false,
            tags: ['api', 'crud'],
            handler: (request, reply)=> {
                return Controller.crud.Getratings(request.query)
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
                    name: Joi.string()
                }),
              
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
        path: '/ratings/updateratings',
        config: {
           auth:false,
            
            tags: ['api', 'crud'],
            handler: (request, reply)=> {
                return Controller.crud.Updaterating(request.payload)
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
                    name: Joi.string().required(),
                    newrating: Joi.number().min(1).max(5).required(),
                 }),
                },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },
];
