const nodemailer = require("nodemailer");
require('dotenv').config();

try{
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "testingpmai999@gmail.com",
            pass: "Testingmail123"
        }
    });
   
    function send(email,_id) {
        console.log(email,_id)
        return new Promise((resolve, reject) => {        
            var info = {
                from:  'testingpmai999@gmail.com',
                to: email,
                subject: "Reset Password",
                html: ` <h2><p>Click on the <a href="http://192.241.139.55:8000/user/forgotPasswordPageRender?id=${_id}">link</a> to change your password</p></h2>`
            };
    
            transporter.sendMail(info, (error, accept) => {
                if (error) { reject(error) }
                else {
                    resolve(accept,console.log("Mail Sended"))
                }
            })
        })
    }
    
}catch(err){
    throw err
}

module.exports = send;