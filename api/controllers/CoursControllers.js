require('dotenv').config()
const { MODE } = process.env

exports.postCours = (req, res) => {
    const { titre, description, contenu, image } = req.body;
    const { id_user } = req.session.user.id;
    //console.log("serd", req.session);
    db.query(`INSERT INTO cours (titre, description ,contenu, id_user, image) VALUES ('${titre}', '${description}', '${contenu}', '${req.session.user.id}', '${req.file.completed}');`, (err, data, field) => {
        if (err) throw err;

        if (MODE === 'test') {
            console.log('Insertion effectuée avec succès');
            let abc = { id: data.insertId, message: "Success Create" }
           
            res.json(abc)
        }
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
    
            console.log(req.session);
            db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
                if(err) throw err;
                
              console.log("user", data)
              req.session.user = {
                ...data[0]
              };
              res.redirect("/profil");
            });
        }

        res.render('seeCourses', {title: 'Cours', layout: 'cours', db:data});
    });

}