exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact', layout: "contact" });
}

exports.postMessages = async (req, res) => {
    const {sujet, message} = req.body;
    await db.query(`INSERT INTO message (sujet, message) VALUES ('${sujet}', '${message}';)`, (err, data) => {
        if(err) throw err;

        res.render('contact', { title: 'Contact', layout: "contact", db: data });
    })
}