const express = require('express');
const {engine} = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');
const passport = require('passport-google-oidc');
const GoogleStrategy = require('passport-google-oauth2');
const app = express();


// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Base de donnée
const db = require('./database/database');
const { request } = require('http');
const { response } = require('express');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
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
    delete(req.session);
    console.log('Vous êtes déconnecté');
    res.redirect('/');
  }
  else{
    res.redirect('/');
  }
});

app.get('/profil', function(req, res){
    db.query('SELECT * FROM users', function(err, data){
      if(err) throw err;
      res.render('profil', {title: 'Profil', layout:'profil', db:data});
    });
});

app.get('/parametres', function(req, res){
    res.render('parametres', {title: 'Parametres', layout:'parametres'});
});

app.get('/admin', function(req, res){
  res.render('admin', {title: 'admin', layout:"admin"});
});

app.get('/user', function(req, res){
    db.query('SELECT prenom, email, status FROM users', function(err, data){
      if(err) throw err;
      res.render('user', {title: 'Utilisateur', layout:"user", db:data});
      
    });
});

app.get('/user/:id', function(req, res){
  res.render('user', {title: 'Utilisateur', layout:"user", db:data});
});

app.put('/user/:id', function(req, res){
  res.render('user', {title: 'Utilisateur', layout:"user", db:data});
});

app.delete('/user/:id', function(req, res){

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


// Système d'inscription => POST
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


// METHODE UPDATE => PUT
app.put('/user/:id', (req, res) => {
  const { id } = req.params.id;
  const { prenom, email, status } = req.body;

  db.query(`UPDATE users SET prenom="${prenom}", email="${email}", status"${status}" WHERE id=${id};`, function(err, data){
    if(err){
      console.log('erreur update');
    }
    console.log('update réussi');
    res.redirect('/admin');
  });
});

// METHODE DELETE => DELETE
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM users WHERE id=${id}`, function(err, data){
    if(err){
      console.log('erreur');
    }
    else{
      console.log('supression réussie');
      res.redirect('/admin');
    }
  });
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
