// exports.cours = (req, res) => {
//     res.render('cours', { title: 'Cours', layout: "cours", db: data });
// }
require('dotenv').config()
const { MODE } = process.env

exports.getCours = (req, res) => {
    let id = req.params.id;

    console.log("controller cours", req.params, MODE);
    db.query(`SELECT titre, description, contenu FROM cours where id='${id}';`, (err, data) => {
        if(err) throw err;
        //console.log("controller cours", req.params.id);
        if(MODE === 'test')
            res.json({dbCours:data})
        else
            res.render('cours', { layout: "cours", db: data[0], meta: {titre: data[0].titre} });
    });

    
}