const nodemailer = require("nodemailer");

try {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:"testingpmai999@gmail.com",
      pass:"parteParteekgupta",
    },
  });


  function send(email, Token) {
    console.log(email, Token);
    return new Promise((resolve, reject) => {
      var info = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        //
        html: `<h2><p>Click on the  <a href=${process.env.BASE_URL}/user/forgotPasswordPageRender?id=${Token}>link</a> to change your password it will be expire in 15 minutes</p></h2>`,
      };

      transporter.sendMail(info, (error, accept) => {
        if (error) {
          reject(error);
        } else {
          resolve(accept, console.log("Mail Sended"));
        }
      });
    });
  }

  function Emailverify(email, Token) {
    console.log(email, Token);
    return new Promise((resolve, reject) => {
      var info = {
        from:"testingpmai999@gmail.com",
        to: email,
        subject: "Email Verify",
        html: `<h2><p>Click on the  <a href=${process.env.BASE_URL}/user/verifySignup?id=${Token}>link</a> for eamil verification . Link will be expire in 10 minutes</p></h2>`,
      };

      transporter.sendMail(info, (error, accept) => {
        if (error) {
          reject(error);
          console.log(error)
        } else {
          resolve(accept, console.log("Mail Sended"));
        }
      });
    });
  }
} catch (err) {
  throw err;
}

module.exports = { send, Emailverify };

// function send(email,_id) {
//     console.log(email,_id)
//     return new Promise((resolve, reject) => {
//         var info = {
//             from:process.env.EMAIL,process.env.PROJECT_NAME
//             to: email,
//             subject: "Reset Password",
//             // ${process.env.BASE_URL}
//             html: `<h2><p>Click on the <a href=
//             http://localhost:8000/user/forgotPasswordPageRender?id=${_id}>link</a> to change your password</p></h2>`
//         };

//         transporter.sendMail(info, (error, accept) => {
//             if (error) { reject(error) }
//             else {
//                 resolve(accept,console.log("Mail Sended"))
//             }
//         })
//     })
// }
