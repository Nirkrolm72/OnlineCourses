exports.user = (req, res) => {
    res.render('user', { title: 'Utilisateur', layout: "user" });
}

exports.getUsers = async (req, res) => {
    await db.query('SELECT id, prenom, email, status, is_admin, is_formateur, is_ban, is_verified FROM users', function (err, data) {
        if (err) throw err;
        res.render('user', { title: 'Utilisateur', layout: "user", db: data });
    });
}



exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { prenom, email, status } = req.body;
    
    if (req.body.prenom) {
        await db.query(`UPDATE users SET prenom="${prenom}" WHERE id=${id};`, function (err, data) {
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
    else if (req.body.status) {
        await db.query(`UPDATE users SET status="${status}" WHERE id=${id};`, function (err, data) {
            if (err) throw err;
            res.redirect('/user');
        });
    }
    else {
        // Edition de l'user par rapport a son id
        await db.query(`UPDATE users SET prenom="${prenom}", email="${email}", status="${status}" WHERE id=${id};`, function (err, data) {
            if (err) throw err;
            res.redirect('/user');
        });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    // Supression de l'utilisateur par rapport à son ID
    await db.query(`DELETE FROM users WHERE id=${id}`, function (err, data) {
        if (err) throw err;

        // Redirection vers la page user
        res.redirect('/user');
    });
}