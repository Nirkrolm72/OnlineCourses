const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'Guyon.Brandon.dev@gmail.com',
        pass: 'rseyekjmvzqnrlku'
    }
});

var rand, mailOptions, host, link;



exports.inscription = (req, res) => {
    res.render('inscription', { title: 'Inscription', layout: 'inscription' });
}


exports.inscripUser = async (req, res) => {
    const saltRounds = 10;
    const { nom, prenom, email, password, avatar, mobile, adresse, codePostal, pays } = req.body;

    // var data = {
    //     'nom': req.body.nom,
    //     'prenom': req.body.prenom,
    //     'email': req.body.email,
    //     'password': req.body.password,
    //     'avatar': req.body.avatar
    // }

    console.log(req.body);

    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.query(`INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified, mobile, adresse, codePostal, pays) VALUES ('${nom}', '${prenom}', '${email}', '${hash}', '${avatar}', 1, 1, 1, '${mobile}', '${adresse}', '${codePostal}', '${pays}');`, (err, rows, fields) => {
            if (err) {
                console.log(err.message);
                res.send(err);
            }
            else {

                const user =  db.query(`SELECT * FROM users where email = "${req.body.email}";`)
                

                

                rand = Math.floor((Math.random() * 100) + 54);
                host = req.get('host');
                link = "http://" + req.get('host') + "/verification/" + rand;

                
                mailOptions = {
                    from: 'Guyon.Brandon.dev@gmail.com',
                    to: email,
                    subject: "Veuillez confirmez votre Email svp.",
                    rand: rand,
                    html: `
                            <h2>Bonjour,</h2><br>
                            <h5>Pour activer votre compte utilisateur, veuillez cliquer sur le lien ci-dessous</h5><br>
                            <a href=` + link + `>Cliquez ici pour activer votre compte</a><br>`

                }
                
                console.log('Données de mailOption :', mailOptions)

                transporter.sendMail(mailOptions, (err, res, next) => {
                    if (err) {
                        throw err
                    } else {
                        console.log("Message Envoyer")
                        next()
                    }
                })

                res.render('connexion', {
                    success: 'Votre compte à bien été créé merci de vérifier vos emails !'
                })


                console.log('Insertion effectuée avec succès');
                //res.redirect('/connexion');
            }
        });
    });

}

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
