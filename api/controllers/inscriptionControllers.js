const bcrypt = require('bcrypt')


exports.inscription = (req, res) => {
    res.render('inscription', { title: 'Inscription', layout: 'inscription' });
}

exports.inscripUser = async (req, res) => {
    const saltRounds = 10;
    const { nom, prenom, email, password, avatar} = req.body;

    var data = {
        'nom': req.body.nom,
        'prenom': req.body.prenom,
        'email': req.body.email,
        'password': req.body.password,
        'avatar': req.body.avatar
    }

    console.log(req.body);
    console.log(req.file);

    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.query(`INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified) VALUES ('${nom}', '${prenom}', '${email}', '${hash}', '${avatar}', 0, 0, 0);`, data, (err, rows, fields) => {
            if (err) {
                console.log(err.message);
                res.send(err);
            }
            else {
                 console.log('Insertion effectuée avec succès');
                res.redirect('/connexion');
            }
        });
    });
}

