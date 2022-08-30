const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

var rand, mailOptions, host, link;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'Guyon.Brandon.dev@gmail.com',
        pass: 'rseyekjmvzqnrlku'
    }
});

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

    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "verify?id=" + rand;

    mailOptions = {
        to: 'guyonbrandon@outlook.fr',
        subject: "Veuillez comfirmer votre email",
        html: `
            <h2>Bonjour,</h2><br>
            <h5>Veuillez comfirmer votre adresse mail, cliquer <a href=" ` + link + ` ">ici</a></h5><br>`

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

exports.updatePassword = async (req, res) => {
    console.log('Controller Update Password', req.body, req.params)
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    // console.log(encryptedPassword);

    let sql = `UPDATE user
               SET password = '${encryptedPassword}'
               WHERE id = '${req.params.id}';`

    await query(sql, encryptedPassword)

    // console.log(await query('select * from user where id = 6'))

    res.render('connexion', {
        success: 'Votre mot de passe a bien été modifié !'
    })
}