const bcrypt = require('bcrypt');

exports.inscription = (req, res) => {
    res.render('inscription', { title: 'Inscription' });
}

exports.inscripUser = async (req, res) => {
    const saltRounds = 10;
    const { nom, prenom, email, password , avatar} = req.body;

    var data = {
        'nom': req.body.nom,
        'prenom': req.body.prenom,
        'email': req.body.email,
        'password': req.body.password,
        'avatar': req.body.avatar,
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        // const insertion = `INSERT INTO users SET nom="${nom}", prenom="${prenom}", email="${email}", password="${password}", avatar="${avatar}", is_admin = 0, is_visiteur = 0, is_verified = 0`;
        
    db.query(`INSERT INTO users (nom, prenom, email, password, avatar, is_admin, is_visiteur, is_verified) VALUES ('${nom}', '${prenom}', '${email}', '${hash}', '${avatar}', 0, 0, 0);`, data, (err, rows, fields) => {
            if (err) {
                
                console.log(err.message);
                res.send(err);
            }
            else {
                console.log(data)
                console.log('Insertion effectuée avec succès');
                res.redirect('/connexion');
            }
        });
    });
}

