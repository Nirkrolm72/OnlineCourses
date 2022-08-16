exports.admin = (req, res) => {
    res.render('admin', { title: 'admin', layout: "admin" });
}

exports.getUsers = async (req, res) => {
    await db.query('select users.id, cours.titre, users.prenom, cours.description from users right join cours on users.id = cours.id_user;', function (err, data) {
        if (err) throw err;
        res.render('admin', { title: 'admin', layout: "admin", db: data });
    });
}

exports.updateUser = async (req, res) => {
    const { id_user } = req.params;
    const { titre, prenom, description } = req.body;

    if (req.body.titre) {
        db.query(`UPDATE cours SET titre="${titre}" WHERE id_user=${id_user}`, function (err, data) {
            if (err) throw err;
            res.redirect('/admin');
        });
    }
    else if (req.body.prenom) {
        db.query(`UPDATE cours SET prenom="${prenom}" WHERE id=${id_user}`, function (err, data) {
            if (err) throw err;
            res.redirect('/admin');
        });
    }
    else if (req.body.description) {
        db.query(`UPDATE cours SET description="${description}" WHERE id=${id_user}`, function (err, data) {
            if (err) throw err;
            res.redirect('/admin');
        });
    }
    else {
        db.query(`UPDATE cours SET titre="${titre}", prenom="${prenom}", description=${description} WHERE id=${id_user}`, function (err, data) {
            if (err) throw err;
            res.redirect('/admin');
        });
    }
}

exports.deleteUser = async (req, res) => {
    const { id_cours } = req.params;
    db.query(`DELETE FROM cours WHERE id_cours="${id_cours}"`, (err, data) => {
        if (err) throw err;
        res.redirect('/admin');
    });
}