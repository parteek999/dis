/**
 * Created by Shumi on 19/03/20.
 */

 
    const DAO = require('../DAOManager').queries,
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    Config = require('../Config');

    const fs = require('fs');
    const nodemailer = require("nodemailer");
    const { google } = require("googleapis");
    const { ERROR } = require('../Config/responseMessages');
    const OAuth2 = google.auth.OAuth2;

    const clientSecret = '';
    const clientID = '';

    const oauth2Client = new OAuth2(
        clientID, // ClientID
        clientSecret, // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

const refreshToken = ""


oauth2Client.setCredentials({
    refresh_token:refreshToken
});
const uniqueKeyGenerator = () => {

    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()

}

const RandomPassword = (length=6) => {
    return Math.random().toString(36).substr(2, length)
}

const UploadFile = async (payload) => {

    const fielName = new Date().getTime() + '.png';
    let newPath = 'uploads/' + fielName;

    const data = writedirAsync(newPath, payload.image._data);

    return fielName;
    

}


const writedirAsync = (path, data) =>{

     return new Promise( (resolve, reject) => {
        fs.writeFile(path, data,  (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


const ForgetPassword = async (payload) => {
    let model;
    let password;
    let encryptedPassword;
    let query = {email: payload.email};
    if(payload.type === 'ADMIN') {
        model = Models.Admins;
        password =  RandomPassword();
        encryptedPassword = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);

    }
    else if(payload.type === 'USER') {
        model = Models.Users;
        password =  RandomPassword();
        encryptedPassword = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);

        query.loginType = Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.EMAIL;
    }
    else if(payload.type === 'CAPTAIN') {
        password = Math.round(Math.random()*100).toString();
        encryptedPassword = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
        model = Models.Captain;
    }
    const data = await DAO.findAndUpdate(model,query,{ password: encryptedPassword});
    if(data) {
        const subject = "On Toes";
        const content = `Looks like you forget your password. Use below credentials to login<br>
        Email :  ${payload.email}  \n <br>
        Password :  ${password}  \n<br>
        Thank You <br>\n
        \n\n<br>
        Team On Toes \n`;

    const details = {
        subject,
        body:content,
        to:payload.email
    }
        sendEmail(details)
    }

}



const sendEmail = (data) => {

    
   const accessToken = oauth2Client.getAccessToken()

    return new Promise((resolve, reject) => {

        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                 type: "OAuth2",
                 user: "", 
                 clientId:clientID,
                 clientSecret,
                 refreshToken,
                 accessToken
            }
       });

       
        const mailOptions = {
            from: '',
            to: data.to,
            subject: data.subject,
            html: data.body,
        };
       
        smtpTransport.sendMail(mailOptions, (error, response) => {
            smtpTransport.close();
            resolve();
       });
    });
}


module.exports={
   
    uniqueKeyGenerator,
    RandomPassword,
    UploadFile,
    sendEmail,
    ForgetPassword
    
};