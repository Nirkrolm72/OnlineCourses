const { setSession } = require('../../utils/setSession');
exports.cours = (req, res) => {
    res.render('cours', { title: 'Cours', layout: "cours" });
}

exports.postCours = async (req, res) => {
    const data = {
        'titre': req.body.titre,
        'description': req.body.description,
        'date': req.body.date,
        'contenu': req.body.contenu,
        'id_user': req.session.user.id // Avec les sessions id_user dynamique
    }

    const insertion = "INSERT INTO cours SET ?";
    await db.query(insertion, data, (err, rows, fields) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('Insertion effectuée avec succès');
            res.redirect('/cours');
        }
    });
}