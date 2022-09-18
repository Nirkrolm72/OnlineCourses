require('dotenv').config()
const bcrypt = require('bcrypt');
const flash = require('flash');
const { db } = require('../database/database');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { MODE } = process.env

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: 'Guyon.Brandon.dev@gmail.com',
		pass: 'rseyekjmvzqnrlku'
	}
});

exports.connectUser = (req, res) => {
	const { email, password } = req.body
	
	db.query(`SELECT password, email FROM users WHERE email="${email}"`, function (err, data) {
		if (err) throw err;

		if (!data[0])
			return res.render('connexion',{ layout: 'connexion', flash: 'Ce compte n\'existe pas' });
		
		bcrypt.compare(password, data[0].password, async function (err, result) {
			if (err) return res.render('profil', { layout: 'profil', flash: 'Une erreur est survenu !' });
			if (result) {
				

				db.query(`SELECT * FROM users WHERE email="${data[0].email}"`, (err, userget) => {
					let user = userget[0];

					// console.log(user);

					req.session.user = {
						id: user.id,
						email: user.email,
						prenom: user.prenom,
						nom: user.nom,
						avatar: user.avatar,
						isAdmin: user.isAdmin,
						isVisiteur: user.isVisiteur,
						isVerified: user.isVerified,
						mobile: user.mobile,
						adresse: user.adresse,
						ville: user.ville,
						codePostal: user.codePostal,
						pays: user.pays
					};

					if (MODE === 'test') {
						return res.json({ msg: 'ok login' })
					} else {
						db.query(`UPDATE users SET isVisiteur=1, isVerified=1 WHERE id="${req.session.user.id}";`, function (err, data) {
							if(err) throw err;
							res.redirect('/profil');
						})
						//return res.render('profil', { layout: 'profil'});
						
					}
				})
			}
			else {
				if (MODE === 'test') {
					return res.json({ msg: 'Le Login est NOK' })
				} else {
				return res.render('connexion', { layout: 'connexion', flash: 'Email ou mot de passe incorrect' });
				}}
		});

	});
}

exports.inscripUser = async (req, res) => {
	const saltRounds = 10;
	const { nom, prenom, email, password, avatar, mobile, adresse, ville ,codePostal, pays } = req.body;

	console.log(req.body);

	bcrypt.hash(password, saltRounds, function (err, hash) {
		db.query(`INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified, mobile, adresse, ville ,codePostal, pays) VALUES ('${nom}', '${prenom}', '${email}', '${hash}', '${avatar}', 1, 1, 1, '${mobile}', '${adresse}', '${ville}', '${codePostal}', '${pays}');`, (err, rows, fields) => {
			if (err) {
				console.log(err.message);
				res.send(err);
			}
			else {
				const token = jwt.sign({
					data: 'Token Data'  
				}, 'MaCleSecrete', { expiresIn: '10m' }  
			);
				
				mailOptions = {
					from: 'Guyon.Brandon.dev@gmail.com',
					to: email,
					subject: "Confirmation email.",
					text: `
							<h2>Bonjour,</h2><br>
							<h5>Pour activer votre compte utilisateur, veuillez cliquer sur le lien ci-dessous</h5><br>
							http://localhost:3000/verification/${token}`

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

				res.render('connexion', { layout: 'connexion', success: 'Votre compte à bien été créé merci de vérifier vos emails !'})



				console.log('Insertion effectuée avec succès');
				//res.redirect('/connexion');
			}
		});
	});

}

exports.deconnexion = (req, res) => {
	req.session.destroy(() => {
	  res.clearCookie('poti-gato');
	  console.log("Clear Cookie session :", req.sessionID);
	  res.redirect('/');
	})
}