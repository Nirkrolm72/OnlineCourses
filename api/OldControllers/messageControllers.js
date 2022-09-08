exports.messages = (req, res) => {
    res.render('messages', { title: 'Message', layout: "user", db: data });
}

exports.getMessages = async (req, res) => {
    await db.query(`select id_message, id_user, nom, prenom, sujet, message, email from message inner join users on message.id_message = users.id`, (err, data) => {
        if(err) throw err;

        res.render('messages', { title: 'Message', layout: "user", db:data });
    })
}