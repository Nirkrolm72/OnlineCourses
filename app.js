require('dotenv').config();
const express = require('express');
const {engine} = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');
const app = express();
const router = require('./router');

// const authRouter = require('./auth.router');

// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

// Import des middlewares
//const { isAdmin } = require('./middleware');

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config méthode override
app.use(methodOverride('_method'));

// Base de donnée
const { request } = require('http');
const { response } = require('express');
const SMTPTransport = require('nodemailer/lib/smtp-transport');


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

// Configuration Express-Session
// var sessionStore = new MySQLStore(configDB);
// app.use(session({
//   secret:"JeSuisBatman",
//   name: "BruceWayne",
//   saveUninitialized: true,
//   resave: false,
//   store: sessionStore
// }));

// db = mysql.createConnection(configDB);

// Config ASYNC
// const util = require("util");
// db.query = util.promisify(db.query).bind(db);

// Connexion de la db mysql
// db.connect((err) => {
//   if (err) console.error('error connecting: ', err.stack);
// });

// Session Connexion for HBS
// app.use('*', (req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// })

// Page Home
app.use('/', router);

// Utilisation du middleware pour toute les routes suivante
// app.use(isAdmin);

// app.post('/connexion', (req, res) => {
//   const { email, password} = req.body;
//   db.query(`SELECT password FROM users WHERE email="${email}`, function (err, data){
//     if(err) throw err;
//     if(!data[0]) return res.render('/connexion', {flash: "Ce compte n'existe pas"});

//     bcrypt.compare(password, data[0].password, function (err, result){
//       if(result === true) {setSession(req, res, email)} else return res.render('connexion', {flash: "L\'email ou le mot de passe est incorrect"});
//     });
//   });
// });


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



// Le serveur écoute sur le port 3000
app.listen(PORT_NODE, () =>{
    console.log('Le serveur est lancé sur le port 3000');
});

module.exports = { db };