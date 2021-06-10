const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
require('dotenv').config();


// var transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "testingpmai999@gmail.com",
//                 pass: "Testingmail123"
//             }
//         });
//        console.log("111",_id)

//        function send(email,_id) {
//             return new Promise((resolve, reject) => {        
//                 var info = {
//                     from:"testingpmai999@gmail.com",
//                     to: email,
//                     subject: "Reset Password",
//                     html: ` <h2><p>Click on the <a href="http://localhost:8000/user/forgotPasswordPageRender?id=${_id}">link</a> to change your password</p></h2>`
//                 };
        
//                 transporter.send(info, (error, accept) => {
//                     if (error) { reject(error) }
//                     else {
//                         resolve(accept,console.log("Mail Sended"))
//                     }
//                 })
//             })
//         }
//     catch(err){
//         throw err
    
//     }




function upload(file) {
    return new Promise((resolve, reject) => {
        try {
            if (file.length > 1) {
                var result = [];
                console.log("hello");
                for (var i = 0; i < file.length; i++) {


                    result.push(file[i].hapi);
                    console.log(file[i].hapi);
                    var p = uuidv4() + file[i].hapi.filename;
                    console.log(p);

                    let r = file[i].pipe(fs.createWriteStream('./uploads/' + p))
                    console.log(r.path)
                }
                resolve(result);
            }
            else {
                var result = [];
                console.log("hi");
                result.push(file.hapi);
                console.log(file.hapi)
                var p = uuidv4() + file.hapi.filename;
                console.log(p);

                let r = file.pipe(fs.createWriteStream('./uploads/' + p))
                console.log(r.path)
                resolve(result);
            }
        }
        catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    // sentmail: sentmail,
    Uplaod: upload
};
