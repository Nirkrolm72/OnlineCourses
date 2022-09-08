exports.getUsers = async (req, res) => {
    await db.query('SELECT id, nom, prenom, email, avatar, isAdmin, isVisiteur, isVerified FROM users', function (err, data) {
        if (err) throw err;

        if(req.file){
            const img = db.query(`SELECT avatar from users WHERE id=${id}`);
    
            if(img[0].image !== "linuxbash.png"){
                pathImg = path.resolve("assets/images/" + img[0].image)
                fs.unlink(pathImg, (err) => {
                 
                    
                })
    
            }
    
            
            db.query(`UPDATE users SET avatar="${req.file.completed}" WHERE id=${id};`);
    
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

        res.render('user', { title: 'Utilisateur', layout: "user", db: data });
    });
}


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;

    if (req.body.prenom) {
        await db.query(`UPDATE users SET prenom="${prenom}" WHERE id=${id};`, function (err, data) {
            if (err) throw err;
            res.redirect('/user');
        });
    }
    else if (req.body.nom) {
        await db.query(`UPDATE users SET nom="${nom}" WHERE id=${id};`, function (err, data) {
            if (err) throw err;
            res.redirect('/user');
        });
    }
    else if (req.body.email) {
        await db.query(`UPDATE users SET email="${email}" WHERE id=${id};`, function (err, data) {
            if (err) throw err;
            res.redirect('/user');
        });
    }

        console.log(req.session);
        db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
            if(err) throw err;
            
          console.log("user", data)
          req.session.user = {
            ...data[0]
          };
          res.redirect("/user");
        });
}

exports.editOneUser = async (req, res) => {
    let sql = `UPDATE users SET isAdmin = '${(req.body.isAdmin === 'on' ? '1' : '0')}', 
    isVerified = '${(req.body.isVerified === 'on' ? '1' : '0')}', 
    isVisiteur = '${(req.body.isVisiteur === 'on' ? '1' : '0')}' WHERE id = '${req.params.id}';`

    await db.query(sql);

    console.log(req.body);

    res.redirect('/user');
}

exports.deleteOneUser = async (req, res) => {
    const { id } = req.params;

    // Supression de l'utilisateur par rapport à son ID
    await db.query(`DELETE FROM users WHERE id=${id}`, function (err, data) {
        if (err) throw err;

        // Redirection vers la page user
        res.redirect('/user');
    });
}
