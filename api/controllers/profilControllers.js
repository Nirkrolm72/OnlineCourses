const path = require('path');
const fs = require('fs');


exports.profil = (req, res) => {
    res.render('profil', { title: 'Profil', layout: 'profil' });
}

exports.getProfilUser = async (req, res) => {
    await db.query('SELECT * FROM users', function (err, data) {
        if (err) throw err;
        res.locals.user = req.session.user;
        res.render('profil', { title: 'Profil', layout: 'profil', db: data });
    });
}

exports.updateProfil = async (req, res) => {
    const { id } = req.params;
    const {email} = req.body;

    if (req.body.email) {
        await db.query(`UPDATE users SET email="${email}" WHERE id="${id}"`, function (err, data) {
            if (err) throw err;

            res.redirect('/profil');
        });
    }

    if(req.file){
        const img = await db.query(`SELECT avatar from users WHERE id=${id}`);

        if(img[0].image !== "linuxbash.png"){
            pathImg = path.resolve("assets/images/" + img[0].image)
            fs.unlink(pathImg, (err) => {
             
                
            })

        }

        
        await db.query(`UPDATE users SET avatar="${req.file.completed}" WHERE id=${id};`);
    }

    res.redirect("/profil");
    console.log(req.session);
        // db.query(`SELECT * FROM user WHERE id=${req.session.user.id};`, (err, data) => {
        //   console.log("user", data)
        //   req.session.user = {
        //     ...data[0]
        //   };
        //   res.redirect("/profil");
        // })
}
