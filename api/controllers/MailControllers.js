exports.verificationMail = async (req, res) => {
    console.log('Controller Page Verification: ', rand)

    const user = await db.query(`SELECT * FROM users WHERE email = "${mailOptions.to}"`)
    console.log('Récup mail :', user);
    console.log(mailOptions.to);

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");

        if (req.params.id == mailOptions.rand) {
            console.log("email is verified: ", user);
            res.render('verifMail', {
                user: user
            })
        } else {
            res.render('verifMail', {
                message: "Bad request !"
            })
        }
    } else {
        res.render('verifMail', {
            message: "request is form unknown source !"
        })
    }
}

exports.verificationMailPost = async (req, res) => {
    const { id } = req.params;
    console.log('Verif mail post :', req.body);

    const user = await db.query(`SELECT * FROM users WHERE id = '${id}';`)

    if (user) {
        await db.query(`UPDATE users SET isVerified = 1, isVisiteur = 1 WHERE id='${id}';`);

        res.render('connexion', { success: 'Votre compte a bien été vérifié !'})
    } else {
        res.redirect('/connexion');
    }
}


exports.sendMailContact = (req, res) => {
    const { sujet, email, nomEtPrenom, description } = req.body;


    let mailData = {
        from: 'Guyon.Brandon.dev@gmail.com',
        to: 'guyonbrandon@outlook.fr',
        subject: req.body.sujet,
        text: req.body.description,
        html: `
              <h3>De la part de : ${nomEtPrenom}</h3>
              <h3>Son mail : ${email}</h3>
              <h3>Sujet : ${sujet}</h3>
              <p>Description : ${description}</p>
            `
    }

    transporter.sendMail(mailData, (error, result) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(result);
            res.redirect('/');
        }
    });
};

exports.sendVerif = (req, res) => {

    rand = Math.floor((Math.random() * 100) + 54)
    host = req.get('host');
    link = "http://" + req.get('host') + "verify?id=" + rand;
    

    mailOptions = {
        to: 'guyonbrandon72@gmail.com',
        subject: "Veuillez comfirmer votre email",
        html: `
            <h2>Bonjour,</h2><br>
            <h5>Veuillez comfirmer votre adresse mail, cliquer <a href="  `+ link +`  ">ici</a></h5><br>
        `

    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }
        else{
            console.log("Message envoyé: " + response.message);
            res.redirect('/');
        }
    });
}

exports.verifMail = async (req, res) => {
    console.log('check editpassword: ', rand)
    
    if (!mailOptions) return res.render('connexion', { error: 'Une erreur est survenu !' })
    if (Number(req.params.id) !== rand) return res.render('connexion', { error: 'Une erreur est survenu !' })

    const user = await query(`SELECT * FROM users WHERE email = "${mailOptions.to}"`)

    console.log('Edit password mail: ', user)

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email")

        if (req.params.id == mailOptions.rand) {
            console.log("email is verified: ", user[0])
            res.render('editPassword', {
                user: user[0]
            })

        } else {
            res.render('editPassword', {
                message: "Bad request !"
            })
        }

    } else {
        res.render('editPassword', {
            message: "Request is from unknown source !"
        })
    }
}

exports.postMessages = async (req, res) => {
    const {sujet, message} = req.body;
    await db.query(`INSERT INTO message (sujet, message) VALUES ('${sujet}', '${message}';)`, (err, data) => {
        if(err) throw err;

        res.render('contact', { title: 'Contact', layout: "contact", db: data });
    })
}