exports.profil = (req, res) => {
    res.render('profil', { title: 'Profil', layout: 'profil' });
}

exports.profil = async (req, res) => {
    await db.query('SELECT * FROM users', function (err, data) {
        if (err) throw err;
        res.render('profil', { title: 'Profil', layout: 'profil', db: data });
    });
}