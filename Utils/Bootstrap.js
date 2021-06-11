let mongoose = require('mongoose'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models'),
    bcrypt = require('bcryptjs'),
    winston = require('winston');


mongoose.Promise = Promise;
const util = require('util');
const fs = require('fs');


//Connect to MongoDB
mongoose.connect(Config["development"].mongoDb.URI, { useUnifiedTopology: true,useCreateIndex: true,useNewUrlParser: true, useFindAndModify: false }).then(success => {
     console.log('MongoDB Connected')
     Run();
}).catch(err => {
    console.log( err)
    winston.info({ ERROR: err });
    process.exit(1);
});

const Run = async () => {
    let password = "$2a$10$KwFpE1iWmcLXbLeZTSin4utRst5c3AEOSPMUlwMJhr4T5P6sePrUi";
    let adminDetails2 = {
        name : "NCPD ADMIN",
        email: "admin@NCPD.com",
        password: password,           //123456
    };
    CreateAdmin(adminDetails2);
}


const CreateAdmin = async (adminDetails) => {
    return new Promise((resolve, reject) => {
        try {
            let adminData = DAO.findAndUpdate(Models.Admin, { email: adminDetails.email }, adminDetails, { lean: true, upsert: true, new: true });
            return resolve("Admin Added");
        } catch (err) {
            console.log("====================", err)
            return reject(err);
        }
    });
}


module.exports = {
    Run: Run
}