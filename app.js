require('dotenv').config();
const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const session = require('express-session');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');

//const router = require('./router');

// Routes
const home_routes = require('./routes/home');
const user_routes = require('./routes/users');
const admin_routes = require('./routes/admin');
const connexion_routes = require('./routes/connexion');
const cours_routes = require('./routes/cours');
const inscription_routes = require('./routes/inscription');
const formateur_routes = require('./routes/formateur');
const parametres_routes = require('./routes/parametres');
const profil_routes = require('./routes/profil');
const seeCourses_routes = require('./routes/seeCourses');


// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config méthode override
app.use(methodOverride('_method'));

// Base de donnée
const { request } = require('http');
const { response } = require('express');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const { getUser } = require('./api/controllers/parametresControllers');


require('./api/database/database');


// Configuration handlebars
app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', './views');

// Route fichier static
app.use('/assets', express.static('public'));

let configDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
};

// Routes
//app.use('/home', home_routes);
app.use('/connexion', connexion_routes);
app.use('/inscription' ,inscription_routes);
app.use('/admin', admin_routes);
app.use('/cours', cours_routes);
app.use('/formateur', formateur_routes);
app.use('/parametres', parametres_routes);
app.use('/profil', profil_routes);
app.use('/seeCourses', seeCourses_routes);
app.use('/user', user_routes);


app.use('*', function (req, res) {
  res.status(404).render("404", {
      layout: '404'
  });
});

// Le serveur écoute sur le port 3000
app.listen(PORT_NODE, () =>{
    console.log('Le serveur est lancé sur le port 3000');
});

module.exports = { db };