// exports.cours = (req, res) => {
//     res.render('cours', { title: 'Cours', layout: "cours", db: data });
// }
require('dotenv').config()
const { MODE } = process.env

exports.getCours = async (req, res) => {
    let id = req.params.id;
    let dbCours;

    dbCours = await db.query(`SELECT titre, description, contenu FROM cours where id='${id}';`, (err, data) => {
        if(err) throw err;

        if(MODE === 'test')
            res.json({dbCours})
        else
            res.render('cours', { layout: "cours", db: data[0], meta: {titre: data[0].titre} });
    });

    
}