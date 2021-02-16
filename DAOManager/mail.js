const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

async function sentmail(accessToken) {
    return new Promise((resolve, reject) => {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "testingpmai999@gmail.com",
                pass: "Testingmail123"
            }
        });

        //  step 2 
        let mailoptions = {
            from: 'testingpmai999@gmail.com',
            to: 'parteekgupta999@gmail.com',
            subject: 'testing email',
            //   text:'Heloo new man',
            html: `<h2>please click on given link to activate your account</h2>
             <p>facebook.com/authentication/activate/${accessToken}</p>
      `
        };
        // step 3
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
        catch(err){
           reject (err)
        }
    })

}

module.exports = {
    sentmail: sentmail,
    Uplaod:upload
};
