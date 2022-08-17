exports.seeCourses = (req, res) => {
    res.render('seeCourses', { title: 'Cours', layout: "cours" });
}

exports.getSeeCourses = async (req, res) => {
    // A faire
    await db.query('SELECT titre, description, date, contenu FROM cours', function (err, data){
        if(err) throw err;
        res.render('seeCourses', {title: 'Cours', layout: 'cours',db: data})
    });

}