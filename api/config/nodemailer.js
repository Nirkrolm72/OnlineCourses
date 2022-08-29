const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'Guyon.Brandon.dev@gmail.com',
        pass: 'rseyekjmvzqnrlku'
    }
});

module.exports = transporter