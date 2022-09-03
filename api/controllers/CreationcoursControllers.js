exports.Creationcours = (req, res) => {
    res.render('Creationcours', { title: 'Création d\'un cours', layout: "Creationcours", db: 'data' });
}

exports.postCours = async (req, res) => {
    const {titre, description, contenu, image} = req.body;
    const {id_user} = req.session.user.id;
    
    // const data = {
    //     titre: req.body.titre,
    //     description: req.body.description,
    //     date: req.body.date,
    //     contenu: req.body.contenu,
    //     'avatar': req.body.avatar,
    //     id_user: req.session.user.id // Avec les sessions id_user dynamique
    // }

    await db.query(`INSERT INTO cours (titre, description ,contenu, id_user, image) VALUES ('${titre}', '${description}', '${contenu}', '${req.session.user.id}', '${req.file.completed}');`, (err, rows, field) => {
        if (err) throw err;
        
    
        console.log('Insertion effectuée avec succès');
        res.redirect('/seecourses');
    })

}