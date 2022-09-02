exports.seeCourses = (req, res) => {
    res.render('seeCourses', { title: 'Cours', layout: "cours", db:data });
}

exports.getSeeCourses = async (req, res) => {
    
    // data = {
    //     'titre': req.body.titre,
    //     'description': req.body.description,
    //     'contenu': req.body.contenu
    // }

    await db.query(`SELECT id, titre, description FROM cours`, function (err, data){
        if(err) throw err;

        res.render('seeCourses', {title: 'Cours', layout: 'cours', db:data});
    });

}
