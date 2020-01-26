const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../config/mail');

const transport = nodemailer.createTransport({
  host, 
  port,
  auth: { user, pass },
});

// transport.use('compile', hbs({
//   viewEngine: 'handlebars',
//   viewPath: "./src/resources/mail/",
//   extName: '.html',
// }));
const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: './src/resources/mail/',
    layoutsDir: './src/resources/mail/auth/',
    defaultLayout: 'email.hbs',
  },
  viewPath: './src/resources/mail/auth/',
  extName: '.html',
};

transport.use('compile', hbs(handlebarOptions));

module.exports = transport;

