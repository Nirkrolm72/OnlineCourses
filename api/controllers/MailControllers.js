const nodemailer = require('nodemailer');
const db = require('../database/database');
const jwt = require('jsonwebtoken');

var rand, mailOptions, host, link;

exports.verificationMailPost = async (req, res) => {
    const { id } = req.params;
    console.log('Verif mail post :', req.body);

    const user = await db.query(`SELECT * FROM users WHERE id = '${id}';`)

    if (user) {
        await db.query(`UPDATE users SET isVerified = 1, isVisiteur = 1 WHERE id='${id}';`);

        res.render('connexion', { layout: 'connexion', success: 'Votre compte a bien été vérifié !'})
    } else {
        res.redirect('/connexion');
    }
}

exports.verificationMail = async (req, res) => {
    console.log('Controller Page Verification: ', rand)

    const user = await db.query(`SELECT * FROM users WHERE email = "${mailOptions.to}"`)
    console.log('Récup mail :', user);

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");

        if (req.params.id == mailOptions.rand) {
            console.log("email is verified: ", user[0]);
            res.render('verifMail', {
                user: user[0]
            })
        } else {
            res.render('verifMail', {
                message: "Bad request !"
            })
        }
    } else {
        res.render('verifMail', {
            message: "request is form unknown source !"
        })
    }
}



exports.sendMailContact = (req, res) => {
    const { sujet, email, nomEtPrenom, description } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: false,
        port: 587,
        auth: {
            user: 'guyonbrandon@outlook.fr',
            pass: 'br26an07don1997' // rseyekjmvzqnrlku'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    let mailData = {
        from: 'guyonbrandon@outlook.fr',
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


