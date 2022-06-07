const nodemailer = require("nodemailer");
const config = require("../config/auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
module.exports.sendConfirmationEmail = (name, email, confirmationCode,isFirst) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "This link will take you create to your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>${user} Invited you to join SportTech. Please confirm by clicking on the following link</p>
          <a href=http://localhost:8081/registerPlayer/${confirmationCode}> Click here</a>
          </div>`,
      
    }).catch(err => console.log(err));
  };