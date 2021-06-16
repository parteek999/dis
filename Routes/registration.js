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
        path: '/Registration/register',
        config: {
            description: 'register',
            auth: false,
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.registeration.register(request.payload, request.auth.credentials)
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
                    sectionA:
                        Joi.object().keys({
                            completingForm: Joi.number().required().valid(1, 2),  //...1=yes,2=no....//                                
                            fName: Joi.string(),
                            lName: Joi.string(),
                            phoneNo: Joi.string(),
                            email: Joi.string().email().lowercase().trim(),
                        }).required(),

                    sectionB:                      
                        Joi.object().keys({
                            fName: Joi.string().required(),
                            mName: Joi.string().required(),
                            lName: Joi.string().required(),
                            sex: Joi.number().required().valid(1, 2), //...1=male,2=female....//
                            insuranceNumber: Joi.string().required(),
                            DOB: Joi.date().iso(),
                            nationality: Joi.string().required(),
                            placeOfBirth: Joi.string().required(),
                            maritialStatus: Joi.string().required().valid("Single", "Married", "Divorced", "Widowed", "Seperated"),
                            address: Joi.string().required(),
                            city: Joi.string().required(),
                            postalZipCode: Joi.string().required(),
                            country: Joi.string().required(),
                            homePhone: Joi.string(),
                            workPhone: Joi.string(),
                            cellPhone: Joi.string(),
                            email: Joi.string().email().lowercase().trim().required(),
                            prefferedContact: Joi.string().required().valid("Landline", "Cell", "Email", "SMSText"),

                            EmergencyContact:  Joi.string().required(),
                            reloaceteNeed:Joi.string().required().valid("Yes", "No"),
                            medicalAttention: Joi.string().required().valid("Yes", "No"),
                            description1: Joi.string(),
                            serviceAnimal:Joi.string().required().valid("Yes", "No"),
                            description2: Joi.string(),
                        }),
                        sectionC:
                            Joi.object().keys({
                            diability:Joi.array().items(Joi.string()),
                            detail: Joi.string(),
                        }).required(),
                        sectionD:
                        Joi.object().keys({
                            Iattended:Joi.array().items(Joi.string()),
                            Iattend: Joi.array().items(Joi.string()),
                            schoolName: Joi.string().required(),
                            highestGrade:Joi.string().required(),
                            completedEducation:Joi.string().required().valid("Completed/Finished School", "Graduated from School", "Never Attended School"), 
                            tertiaryEducation:Joi.string(),
                        }).required(),
                        sectionE:
                        Joi.object().keys({
                            currentlyEmployed:Joi.string().required().valid("Yes", "No", "N/A"),
                            occupationDescription:Joi.string().required(),
                            seeingEmployement: Joi.string().required().valid("Yes", "No"),
                            skills:Joi.string().required(),
                        }).required(),
                        sectionF:
                        Joi.object().keys({
                            topConcerns:Joi.array().items(Joi.string()),
                            additionalConcerns:Joi.string().required()
                        }).required()
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    //   payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/Registration/getRegistration',
        config: {
            description: "getRegistration",
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api',"Registration"],
            handler: (request, reply) => {
                return Controller.registeration.getRegistration(request.query,request.auth.credentials)
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

    {
        method: 'GET',
        path: '/Registration/singleRegistration',
        config: {
            description: "singleRegistration",
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.registeration.singleRegistration(request.query,request.auth.credentials)
                    
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
                    id:Joi.string(),
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
];
