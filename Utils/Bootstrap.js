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
    // Run();
}).catch(err => {
    console.log( err)
    winston.info({ ERROR: err });
    process.exit(1);
});

const Run = async () => {
    let password = "$2b$11$.kZ8RVapQzn7vryresNia.l2NF3IKfQ8o7uCUnLWgWlfukykutJI6";
    let adminDetails2 = {
        name : "NCPD ADMIN",
        email: "admin@NCPD.com",
        password: password,           //qwerty
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


function checkFolderAlreadyExist() {

    let _dirPath = "./uploads";
    console.log(fs.existsSync(_dirPath));
    if (!fs.existsSync(_dirPath)) {
        const mkdir = util.promisify(fs.mkdir);
        mkdir(_dirPath).then((stats) => {
            console.log('folder created successfully ');
        }).catch((error) => {
            console.log(error);
        });
    } else {
        console.log('folder already exist ');
    }
}
module.exports = {
    Run: Run
}