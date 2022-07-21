const express = require('express');
const {engine} = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express();


// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Base de donnée
const db = require('./database/database');
const { request } = require('http');
const { response } = require('express');
db.connect(function(err){
  if(err) throw err;
  console.log('Connecté à la base de donnée');
});


// Configuration handlebars
app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', './views');

// Route fichier static
app.use('/assets', express.static('public'));

// Router
app.get('/', function(req, res){
    res.render('home', {title: 'Accueil'});
});

app.get('/connexion', function(req, res){
    res.render('connexion', {title: 'Connexion', session: req.session});
});

app.get('/inscription', function(req, res){

    res.render('inscription', {title: 'Inscription'});
});

app.get('/deconnexion', function(req, res){
  if(!req.session){
    req.session.destroy(function(err){
      res.redirect('/');
    });
  }
  else{
    res.redirect('/');
  }
});

app.get('/profil', function(req, res){
    res.render('profil', {title: 'Profil', layout:'profil'});
});

app.get('/securite_du_compte', function(req, res){
    res.render('securite_du_compte', {title: 'Securite_du_compte', layout:'securite_du_compte'});
});

app.get('/admin', function(req, res){
  res.render('admin', {title: 'admin', layout:"admin"});
});

app.get('/user', function(req, res){
    res.render('user', {title: 'Utilisateur', layout:"user"});
});

app.get('/formateur', function(req, res){
  res.render('formateur', {title: 'Formateur', layout:"formateur"});
});

app.get('/cours', function(req, res){
    res.render('cours', {title: 'Cours', layout:"cours"});
});

app.get('/seeCourses', function(req, res){
    res.render('seeCourses', {title: 'Cours', layout:"cours"});
});

// Système d'inscription
app.post('/inscription', async function(req, res){

    var value = req.body.password;
    const salt = await bcrypt.genSalt(10);
    value = await bcrypt.hash(value, salt);
    
    var data = {
      'nom': req.body.nom,
      'prenom': req.body.prenom,
      'email': req.body.email,
      'password': value,
      'avatar': req.body.avatar,
      'ville': req.body.ville,
      'pays': req.body.pays,
      'status': req.body.status
    }

    const insertion = "INSERT INTO users SET ?";
    db.query(insertion, data, (err, rows, fields) => {
      if(err){
        console.log(err.message);
        res.send(err);
      }
      else{
        console.log('Insertion effectuée avec succès');
        res.redirect("/profil");
      }
    });
});


// Système de connexion
app.use(session({
	secret: 'Nirkrolm',
	resave: true,
	saveUninitialized: true
}));


app.post('/connexion', async function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
  
	if (email && password) {
		db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
        console.log('Vous êtes maintenant connecté');
				res.redirect('/profil');
			} 
      else{
				res.send('Email ou mot de passe incorrect');
        res.redirect('/connexion');
			}	
			res.end();
		});
	} else {
    
		res.send('Veuillez entrer un email et un mot de passe');
		res.end();
	}
});








// Nodemailer
/*app.post('/', function(req, res){
  const {sujet, email, nomEtPrenom, description} = req.body;

  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'Guyon.Brandon.dev@gmail.com',
      pass: 'rseyekjmvzqnrlku'
    }
  });
//rseyekjmvzqnrlku
//tuukluogrqbefvwz
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
    if(error){
      return console.log(error);
    }
    else{
      console.log(result);
      res.render('home');
    }
  });
});*/

app.use('*',function(req, res){
    res.status(404).render("404",{
      layout: '404'
    });
  });

// Le serveur écoute sur le port 80
app.listen(3000, () =>{
    console.log('Le serveur est lancé sur le port 3000');
});
