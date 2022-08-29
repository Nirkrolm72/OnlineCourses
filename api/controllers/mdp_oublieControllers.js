//const { transporter} = require('../config/nodemailer');
const nodemailer = require('nodemailer');

exports.mdpOublie = (req, res) => {
    res.render('mdpOublie', { title: 'mdpOublie', layout: 'mdpOublie' });
}

var rand, mailData, host, link;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'Guyon.Brandon.dev@gmail.com',
        pass: 'rseyekjmvzqnrlku'
    }
});

exports.forgotPassword = async (req, res) => {


}

