const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require('winston');

module.exports = [
    {
    method: 'POST',
    path: '/user/signUp',
    config: {
        description: 'SignUp',
        auth: false,
        tags: ['api', 'user'],
        handler: (request, reply)=> {
            return Controller.user.signup(request.payload, request.auth.credentials)
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
                fullName: Joi.string().trim().required(),
                phoneNo:Joi.string().trim().required(),
                password:Joi.string().required(),
                // verifypassword:Joi.string().required(),
                gender:Joi.any().valid("male","female","other").error(() => 'Gender should be Male (or) Female (or) other'),
                dob:Joi.string(),
                imgUrl:Joi.array().items(Joi.string().allow(null).allow('')),
                otp:Joi.string(),
            
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
    path: '/user/login',
    config: {
        description: 'login',
        auth: false,
        tags: ['api', 'user'],
        
        handler: (request, reply)=> {
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
                password: Joi.string().trim().required()
             }),
         },
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        }
    }
},
// {
//     method: 'POST',
//     path: '/user/otp',
//     config: {
//         description: 'otp',
//         auth: false,
//         tags: ['api', 'user'],
//         handler: (request, reply)=> {
//             return Controller.user.otp(request.payload, request.auth.credentials)
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
//               otp:Joi.string(),
//             }),
//                    },
//         plugins: {
//             'hapi-swagger': {
//                 payloadType: 'form'
//             }
//         }
//     }
// },
]