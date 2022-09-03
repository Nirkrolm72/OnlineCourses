// exports.cours = (req, res) => {
//     res.render('cours', { title: 'Cours', layout: "cours", db: data });
// }


exports.getCours = async (req, res) => {
    let id = req.params.id;

    await db.query(`SELECT titre, description, contenu FROM cours where id='${id}';`, (err, data) => {
        if(err) throw err;

        res.render('cours', { layout: "cours", db: data[0], meta: {titre: data[0].titre} });
    });

    
}