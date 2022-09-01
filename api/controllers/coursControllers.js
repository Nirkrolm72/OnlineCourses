exports.cours = (req, res) => {
    res.render('cours', { title: 'Cours', layout: "cours" });
}

exports.getCours = async (req, res) => {
    await db.query('SELECT * FROM cours', function(err, result){
        if(err) throw err;

        res.render('cours', { title: 'Cours', layout: "cours" });
    });
}