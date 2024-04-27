const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
// const e = require("express");

const sendMail = asyncHandler(async (email, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cuahangbansua " <no-reply@cuahangbansua.com>', // sender address
    to: email, // list of receivers
    subject: "Forgotpassword", // Subject line
    html: html, // html body
  });
  return info;
});
module.exports = sendMail;
