const express = require('express');
const {engine} = require('express-handlebars');
const session = require('express-session');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');
const passport = require('passport-google-oidc');
const GoogleStrategy = require('passport-google-oauth2');
const app = express();


// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config méthode override
app.use(methodOverride('_method'));

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
    res.render('connexion', {title: 'Connexion'});
});

app.get('/inscription', function(req, res){
    res.render('inscription', {title: 'Inscription'});
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
  db.query('select id, titre, prenom, description from users inner join cours on users.id = cours.id_cours', function(err, data){
    if(err) throw err;
    res.render('admin', {title: 'admin', layout:"admin", db:data});
  });
});

app.put('/admin/:id_user', (req, res) => {
  const { id_user } = req.params;
  const {titre, prenom, description} = req.body;

  if(req.body.titre){
    db.query(`UPDATE cours SET titre="${titre}" WHERE id_user=${id_user}`, function(err, data){
      if(err) throw err;
      res.redirect('/admin');
    });
  }
  else if(req.body.prenom){
    db.query(`UPDATE cours SET prenom="${prenom}" WHERE id=${id_user}`, function(err, data){
      if(err) throw err;
      res.redirect('/admin');
    });
  }
  else if(req.body.description){
    db.query(`UPDATE cours SET description="${description}" WHERE id=${id_user}`, function(err, data){
      if(err) throw err;
      res.redirect('/admin');
    });
  }
  else{
    db.query(`UPDATE cours SET titre="${titre}", prenom="${prenom}", description=${description} WHERE id=${id_user}`, function(err, data){
      if(err) throw err;
      res.redirect('/admin');
    });
  }
});

app.delete('/admin/:id_cours', (req, res) => {
  const { id_coursœ } = req.params;
  db.query(`DELETE FROM cours WHERE id_cours="${id_cours}"`, (err, data) => {
    if(err) throw err;
    res.redirect('/admin');
  });
});

app.get('/user', function(req, res){
    db.query('SELECT prenom, email, status, id FROM users', function(err, data){
      if(err) throw err;
      res.render('user', {title: 'Utilisateur', layout:"user", db:data});
      
    });
});

// Modification utilisateur
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const { prenom, email, status } = req.body;
  
  if(req.body.prenom){
    db.query(`UPDATE users SET prenom="${prenom}" WHERE id=${id};`, function(err, data){
      if(err) throw err;
      res.redirect('/user');
    });
  }
  else if(req.body.email){
    db.query(`UPDATE users SET email="${email}" WHERE id=${id};`, function(err, data){
      if(err) throw err;
      res.redirect('/user');   
    });
  }
  else if(req.body.status){
    db.query(`UPDATE users SET status="${status}" WHERE id=${id};`, function(err, data){
      if(err) throw err;
      res.redirect('/user'); 
    });
  }
  else{
      // Edition de l'user par rapport a son id
    db.query(`UPDATE users SET prenom="${prenom}", email="${email}", status="${status}" WHERE id=${id};`, function(err, data){
      if(err) throw err;
      res.redirect('/user');
    });
 }
});


app.delete('/user/:id', (req,res) => {
  const { id } = req.params;

  // Supression de l'article par rapport a son id
  db.query(`DELETE FROM users WHERE id=${id}`, function(err, data){
    if(err) throw err;

    // Redirection vers la page admin
    res.redirect('/user');
  })
});


app.get('/formateur', function(req, res){
  res.render('formateur', {title: 'Formateur', layout:"formateur"});
});

app.get('/cours', function(req, res){
  res.render('cours', {title: 'Cours', layout:"cours"});
});




app.post('/cours', function(req, res){
  const data = {
    'titre': req.body.titre,
    'description': req.body.description,
    'date': req.body.date,
    'contenu': req.body.contenu,
    'id_user': 1
  }

  const insertion = "INSERT INTO `cours` SET ?";
  db.query(insertion, data, (err, rows, fields) =>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Insertion effectuée avec succès");
      res.render('cours', {title: 'Cours', layout:"cours", db:data});
    }
  })
  //res.render('cours', {title: 'Cours', layout:"cours"});
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

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// cookie parser middleware
app.use(cookie('mycookie'));

// a variable to save a session
var sessions;

// app.post('/connexion', (req,res) => {
//   const {email, password} = req.body;

// });

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
