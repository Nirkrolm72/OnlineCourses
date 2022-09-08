require('dotenv').config()
const bcrypt = require('bcrypt');
const flash = require('flash');
const { setSession } = require('../../utils/setSession');
const { db } = require('../database/database');
const { user } = require('./userControllers');
const { MODE } = process.env

exports.connexion = (req, res) => {
    res.render('connexion', { title: 'Connexion', layout: 'connexion' });
}

//const setSession = require("./utils/setSession");

exports.connectUser = (req, res) => {
    const { email, password } = req.body
    db.query(`SELECT password, email FROM users WHERE email="${email}"`, function (err, data) {
        if (err) throw err;

        if (!data[0])
            return res.render('connexion', { flash: 'Ce compte n\'existe pas' });

        bcrypt.compare(password, data[0].password, async function (err, result) {
            if (err) return res.render('connexion', { flash: 'Une erreur est survenu !' });
            if (result) {
                setSession(req, res, email);

                db.query(`SELECT * FROM users WHERE email="${data[0].email}"`, (err, userget) => {
                    let user = userget[0];

                    // console.log(user);

                    req.session.user = {
                        id: user.id,
                        email: user.email,
                        prenom: user.prenom,
                        nom: user.nom,
                        avatar: user.avatar,
                        isAdmin: user.isAdmin,
                        isVisiteur: user.isVisiteur,
                        isVerified: user.isVerified
                    };

                    if (MODE === 'test') {
                        return res.json({ msg: 'ok login' })
                    } else {
                        return res.render('connexion', { flash: 'Une erreur est survenu !' });
                    }
                })
            }
            else {
                return res.render('connexion', { flash: 'Email ou mot de passe incorrect' });
            }
        });

    });
}
