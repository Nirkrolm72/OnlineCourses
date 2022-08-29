const nodemailer = require('nodemailer');
const { transporter } = require('../config/nodemailer');

exports.sendMailContact = (req, res) => {
    const { sujet, email, nomEtPrenom, description } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'Guyon.Brandon.dev@gmail.com',
            pass: 'rseyekjmvzqnrlku'
        }
    });

    let mailData = {
        from: 'Guyon.Brandon.dev@gmail.com',
        to: 'guyonbrandon@outlook.fr',
        subject: req.body.sujet,
        text: req.body.description,
        html: `
              <h3>De la part de : ${nomEtPrenom}</h3>
              <h3>Son mail : ${email}</h3>
              <h3>Sujet : ${sujet}</h3>
              <p>Description : ${description}</p>
            `
    }

    transporter.sendMail(mailData, (error, result) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(result);
            res.redirect('/');
        }
    });
};