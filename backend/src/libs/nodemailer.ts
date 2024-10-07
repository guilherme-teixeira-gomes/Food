const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  // host: process.env.MAIL_HOST,
  // port: process.env.MAIL_POST,
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export default transport;