const nodemailer = require('nodemailer');

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




module.exports = {
    sentmail: sentmail,
};