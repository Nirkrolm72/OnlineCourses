const { setSession } = require('../../utils/setSession');

exports.Creationcours = (req, res) => {
    res.render('Creationcours', { title: 'Création d\'un cours', layout: "Creationcours" });
}

exports.postCours = async (req, res) => {
    const data = {
        'titre': req.body.titre,
        'description': req.body.description,
        'date': req.body.date,
        'contenu': req.body.contenu,
        'avatar': req.body.avatar,
        'id_user': req.session.user.id // Avec les sessions id_user dynamique
    }

    const insertion = `insert into cours (titre, description, contenu) select path, name from cours`;
    // const insertion = "INSERT INTO cours SET ?";
    await db.query(insertion, data, (err, rows, fields) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('Insertion effectuée avec succès');
            res.redirect('/admin');
        }
    });
}