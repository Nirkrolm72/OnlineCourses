const { db } = require('../database/database');

require('dotenv').config()
const { MODE } = process.env


exports.postCours = (req, res) => {
    const { titre, description, contenu } = req.body;
    const { id_user } = req.session.user.id;
    const image = req.file ? req.file.filename : false;

    db.query(`INSERT INTO cours (titre, description ,contenu, id_user, image)
              VALUES ('${titre}', '${description}', '${contenu}' ,'${req.session.user.id}', '${image}');`,
              (err, data, field) => {
            if (err) throw err;

            if (MODE === 'test') res.json({
                id: data.insertId,
                message: "Success create"
            })
            else {
                console.log('Insertion effectuée avec succès');
                res.redirect('/seecourses');
            }

    })

}

exports.getCours = (req, res) => {
    let id = req.params.id;


    db.query(`SELECT titre, description, contenu FROM cours where id='${id}';`, (err, data) => {
        if (err) throw err;

        if (MODE === 'test')
            res.json({ dbCours: data })
        else
            res.render('cours', { layout: "cours", db: data[0], meta: { titre: data[0].titre } });
    });
}

exports.getSeeCourses = async (req, res) => {

    await db.query(`SELECT id, titre, description, image FROM cours`, (err, data) => {
        if (err) throw err;

        if (req.file) {
            const img = db.query(`SELECT image from cours WHERE id=${id}`);

            if (img[0].image !== "linuxbash.png") {
                pathImg = path.resolve("assets/images/" + img[0].image)
                fs.unlink(pathImg, (err) => {


                })

            }


            db.query(`UPDATE users SET image="${req.file.completed}" WHERE id=${id};`);

            //console.log(req.session);
            db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
                if (err) throw err;

                //console.log("user", data)
                req.session.user = {
                    ...data[0]
                };
                res.redirect("/profil");
            });
        }

        res.render('seeCourses', { title: 'Cours', layout: 'cours', db: data });
    });

}

exports.getAllCours = async (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    await db.query(`select prenom, titre, description from cours inner join users on cours.id_user = users.id;`, (err, data) => {
        if (err) throw err;
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb", data);

        res.render('admin', { layout: "admin", db: data });
    });
}

// select prenom, titre, description FROM cours INNER JOIN users ON users.id = cours.id_user;


exports.updateCours = async (req, res) => {
    const { id } = req.params;
    const { titre, description, contenu } = req.body;

    await db.query(`UPDATE cours SET titre="${titre}", description="${description}", contenu="${contenu}"`, function (err, data) {
        if(err) throw err;

        res.redirect('/admin');
    })
}

exports.deleteCours = async (req, res) => {
    console.log("ohe jsuis la");
    const { id } = req.params;
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    await db.query(`DELETE from cours WHERE id=${id}`, function (err, data) {
        if (err) throw err;

        res.redirect('/admin');
    })
}