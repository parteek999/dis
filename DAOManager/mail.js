const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

async function sentmail(email) {
    return new Promise((resolve, reject) => {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "testingpmai999@gmail.com",
                pass: "Testingmail123"
            }
        });
        // var value = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let mailoptions = {
            from: 'testingpmai999@gmail.com',
            to: email,
            subject: 'testing email',
            html: `<p> <a href="http://15.206.146.120:8000/create?id=${email}">link</a>
             your new password is = </p>`
            // ${value}
            //  </p>`
        };
        transport.sendMail(mailoptions, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



async function upload(file) {
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
    sentmail: sentmail,
    Uplaod: upload
};
