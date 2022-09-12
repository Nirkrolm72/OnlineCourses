const { db } = require('../database/database');

require('dotenv').config()
const { MODE } = process.env


exports.postCours = (req, res) => {
    const { titre, description, contenu, image } = req.body;
    const { id_user } = req.session.user.id;

    let data = db.query(`INSERT INTO cours (titre, description ,contenu, id_user, image) VALUES ('${titre}', '${description}', '${contenu}' ,'${req.session.user.id}', '${req.file.completed}');`, (err, data, field) => {
        if (err) throw err;

        if (MODE === 'test') res.json({
            id: data.insertId,
            message: "Success create"
        })
        else{
            console.log('Insertion effectuée avec succès');
            res.redirect('/seecourses');
        }

    })

}

exports.getCours = (req, res) => {
    let id = req.params.id;

    
    db.query(`SELECT titre, description, contenu FROM cours where id='${id}';`, (err, data) => {
        if(err) throw err;

        if(MODE === 'test')
            res.json({dbCours:data})
        else
            res.render('cours', { layout: "cours", db: data[0], meta: {titre: data[0].titre} });
    });
}

exports.getSeeCourses = async (req, res) => {

    await db.query(`SELECT id, titre, description, image FROM cours`, (err, data) => {
        if(err) throw err;

        if(req.file){
            const img = db.query(`SELECT image from cours WHERE id=${id}`);
    
            if(img[0].image !== "linuxbash.png"){
                pathImg = path.resolve("assets/images/" + img[0].image)
                fs.unlink(pathImg, (err) => {
                 
                    
                })
    
            }
    
            
            db.query(`UPDATE users SET image="${req.file.completed}" WHERE id=${id};`);
    
            //console.log(req.session);
            db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
                if(err) throw err;
                
              //console.log("user", data)
              req.session.user = {
                ...data[0]
              };
              res.redirect("/profil");
            });
        }

        res.render('seeCourses', {title: 'Cours', layout: 'cours', db:data});
    });

}

exports.getAllCours = async (req, res) => {
    await db.query(`select titre, description, prenom from cours inner join users on cours.id = users.id;`, (err, data) =>{
        if(err) throw err;

        res.render('admin', { layout: "admin", db: data });
    });
}

exports.deleteCours = async (req, res) => {
    const { id } = req.params;

    await db.query(`DELETE from cours WHERE id=${id}`, function (err, data) {
        if(err) throw err;

        res.redirect('/admin');
    })
}