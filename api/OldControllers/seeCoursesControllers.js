exports.seeCourses = (req, res) => {
    res.render('seeCourses', { title: 'Cours', layout: "cours", db:'data' });
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
