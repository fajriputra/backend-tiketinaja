const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

const sendMail = (data) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.PASSMAIL,
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./src/templates/email"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/templates/email"),
        extName: ".html",
      })
    );

    const mailOptions = {
      from: `"Ticketing App 👻" <${process.env.SENDERMAIL}>`,
      to: data.to,
      subject: data.subject,
      template: data.template,
      context: data.data,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });

module.exports = sendMail;
