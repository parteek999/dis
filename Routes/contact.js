const Controller = require("../Controller");
const UniversalFunctions = require("../Utils/UniversalFunctions");
const Joi = require("@hapi/joi");
const Config = require("../Config");
const SUCCESS = Config.responseMessages.SUCCESS;
const winston = require("winston");

module.exports = [
  {
    method: "POST",
    path: "/contact/addContact",
    config: {
      description: "addContact",
      auth: {
        strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN],
      },
      tags: ["api"],
      handler: (request, reply) => {
        console.log(request.payload);
        return Controller.Contact.addContact(
          request.payload,
          request.auth.credentials
        )

          .then((response) => {
            return UniversalFunctions.sendSuccess(
              "en",
              SUCCESS.DEFAULT,
              response,
              reply
            );
          })
          .catch((error) => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        maxBytes: 200000000 * 1000 * 1000,
      },
      validate: {
        payload: Joi.object({
          file: Joi.any().meta({ swaggerType: "file" }).optional(),
          title: Joi.string(),
          number: Joi.number().required(),
        }),
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
    },
  },

  {
    method: "GET",
    path: "/contact/getContact",
    config: {
      description: "getContact",
      auth: {
        strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN_USER],
        mode: "optional",
      },
      tags: ["api"],

      handler: (request, reply) => {
        return Controller.Contact.getContact(
          request.query,
          request.auth.credentials
        )
          .then((response) => {
            return UniversalFunctions.sendSuccess(
              "en",
              SUCCESS.DEFAULT,
              response,
              reply
            );
          })
          .catch((error) => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        query: Joi.object({}),
        // headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
    },
  },

  {
    method: "POST",
    path: "/contact/deleteContact",
    config: {
      description: "deleteContact",
      auth: {
        strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN],
      },
      tags: ["api", "contact"],
      handler: (request, reply) => {
        return Controller.Contact.deleteContact(
          request.payload,
          request.auth.credentials
        )

          .then((response) => {
            return UniversalFunctions.sendSuccess(
              "en",
              SUCCESS.DEFAULT,
              response,
              reply
            );
          })
          .catch((error) => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },

      validate: {
        payload: Joi.object({
          id: Joi.string().required(),
        }),
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },

      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
    },
  },
];
