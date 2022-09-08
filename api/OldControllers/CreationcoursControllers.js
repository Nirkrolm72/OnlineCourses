require('dotenv').config()
const { MODE } = process.env

exports.Creationcours = (req, res) => {
    res.render('Creationcours', { title: 'Création d\'un cours', layout: "Creationcours", db: 'data' });
}

exports.postCours = (req, res) => {
    const { titre, description, contenu, image } = req.body;
    // const { id_user } = req.session.user.id;
    console.log("serd", req.session);
    db.query(`INSERT INTO cours (titre, description ,contenu, id_user, image) VALUES ('${titre}', '${description}', '${contenu}', '${req.session.user.id}', '${req.file.completed}');`, (err, data, field) => {
        if (err) throw err;

        if (MODE === 'test') {
            console.log('Insertion effectuée avec succès TEST');
            let abc = { id: data.insertId, message: "Success Create" }
            console.log("dz",abc)
            res.json(abc)
        }
        else{
            console.log('Insertion effectuée avec succès');
            res.redirect('/seecourses');
        }


    })

}