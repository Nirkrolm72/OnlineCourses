const bcrypt = require('bcrypt');

exports.inscription = (req, res) => {
    res.render('inscription', { title: 'Inscription' });
}

exports.inscripUser = async (req,res) => {
    var value = req.body.password;
    const salt = await bcrypt.genSalt(10);
    value = await bcrypt.hash(value, salt);

    var data = {
        'nom': req.body.nom,
        'prenom': req.body.prenom,
        'email': req.body.email,
        'password': value,
        'avatar': req.body.avatar,
        'ville': req.body.ville,
        //'adresse': req.body.adresse,
        //'codePostal': req.body.codePostal,
        'pays': req.body.pays,
        'status': req.body.status
    }

    const insertion = "INSERT INTO users SET ?";
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