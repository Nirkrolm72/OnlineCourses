const { query } = require("express");
const { db } = require('../database/database');

exports.profil = (req, res) => {
    res.render('profil', { title: 'Profil', layout: 'profil' });
}

exports.getProfilUser = async (req, res) => {
    await db.query('SELECT * FROM users', function (err, data) {
        if (err) throw err;
        res.locals.user = req.session.user;
        res.render('profil', { title: 'Profil', layout: 'profil', db: data });
    });
}

exports.updateProfil = async (req, res) => {
    const { id } = req.params;
    const { email, mobile, adresse } = req.body;

    if (req.body.email) {
        await db.query(`UPDATE users SET email="${email}" WHERE id="${id}"`, function (err, data) {
            if (err) throw err;
            
            res.redirect('/profil');
        });
    }
}