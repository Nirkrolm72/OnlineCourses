const bcrypt = require('bcrypt');

exports.inscription = (req, res) => {
    res.render('inscription', { title: 'Inscription' });
}

exports.inscripUser = async (req,res) => {
    var value = req.body.password;
    const salt = await bcrypt.genSalt(10);
    value = bcrypt.hash(value, salt);

    var data = {
        'nom': req.body.nom,
        'prenom': req.body.prenom,
        'email': req.body.email,
        'password': req.body.password,
        'avatar': req.body.avatar,
    }

    const insertion = "INSERT INTO users SET ?, is_admin = 0, is_visiteur = 0, is_verified = 0";
    console.log(req.body)
    db.query(insertion, data, (err, rows, fields) => {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        else {
            console.log('Insertion effectuée avec succès');
            res.redirect('/profil');
        }
    });
}