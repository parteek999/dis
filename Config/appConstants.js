var SERVER = {
    APP_NAME: 'Dis',
    SECRET:"#DubaIIeOkCfGdHahSHHSh",
    SALT:11,
    JWT_SECRET_KEY_ADMIN:   "vdfeg%%$$##r#FEF$#@#&^^&(#",
    JWT_SECRET_KEY_USER:    "%#%$FDFGVRG%HRTB%^TG^$G",
    
   };

var swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];

var SCOPE = {
        ADMIN: 'ADMIN',
        USER: 'USER',

};


var MODELS = {
    Admins:"Admins",
    User:"User",
};

var DATABASE_CONSTANT ={

    GENDER:{
        MALE:"male",
        FEMALE:"female",
        OTHER:"other"
    },
    
    DEVICE_TYPES: {
        "IOS": "IOS",
        "ANDROID": "ANDROID",
        "WEB": "WEB"
    },
    SOCIAL: {
        FACEBOOK: "Facebook",
        GOOGLE: "Google"
    },

    ACCOUNT_TYPE : {
        GMAIL:'gmail',
        FACEBOOK: 'facebook',
        EMAIL: 'email',
        APPLE_ID:'apple'
    },

    VERIFICATION_TYPE: {
        AADHAR_CARD:'aadhar_card',
        DRIVING_LISCENCE: 'driving_liscence',
        PANCARD: 'pancard',
        
    },
    
};


var APP_CONSTANTS = {
    SERVER: SERVER,
    swaggerDefaultResponseMessages:swaggerDefaultResponseMessages,
    SCOPE:SCOPE,
    MODELS:MODELS,
    DATABASE_CONSTANT:DATABASE_CONSTANT
};

module.exports = APP_CONSTANTS;
