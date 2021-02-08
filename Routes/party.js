const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');

module.exports = [
    {
    method: 'POST',
    path: '/party/createEvent',
    config: {
        description: 'createEvent',
        auth: false,
        tags: ['api', 'user'],
        handler: (request, reply)=> {
            return Controller.party.createEvent(request.payload)
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
                price: Joi.number().required(),
                venue:Joi.string().required(),
                startTime:Joi.date(),
                endingTime:Joi.date(),
                description:Joi.string().required(),
                guestLimit:Joi.number().required(),
                category:Joi.string().required(),
                eventhostType:Joi.string().required(),
                imageUrl:Joi.string().required(),
            
             }),
                   },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        }
    }
}
]