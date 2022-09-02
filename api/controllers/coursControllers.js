// exports.cours = async (req, res) => {
// const { id } = req.params;

//     await db.query(`SELECT titre, description, contenu FROM cours WHERE id="${id}"`), (err, data) => {
//         if (err) throw err;


//         res.render('cours', { title: 'Cours', layout: "cours", db:data[0] });
//     }

// }

exports.getCours = async (req, res) => {
    let id = req.params.id;


    await db.query(`SELECT titre, description, contenu FROM cours WHERE id='${id}';`, (err, data) => {
        if (err) throw err;
        



        res.render('cours', {layout: "cours",  db: data[0] });
        console.log("data rep", data)

    });

}

