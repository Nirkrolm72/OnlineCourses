require('dotenv').config();
const express = require('express');

const {engine} = require('express-handlebars');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');
const mocha = require('mocha');
const assert = require('assert');

const app = express();



// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config méthode override
app.use(methodOverride('_method'));


// Base de donnée
// const { request } = require('http');
// const { response } = require('express');
// const SMTPTransport = require('nodemailer/lib/smtp-transport');

require('./api/database/database');


//Configuration handlebars
app.engine('.hbs', engine({
    extname: '.hbs'
}));


app.set('view engine', '.hbs');
app.set('views', './views');

// Route fichier static
app.use('/assets', express.static('public'));

// Configuration Express-Session


let configDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
};

db = mysql.createConnection(configDB);

// Config ASYNC
const util = require("util");
const cookieParser = require('cookie-parser');
db.query = util.promisify(db.query).bind(db);

db.connect((err) => {
  if (err) console.error('error connecting: ', err.stack);
  
});

var sessionStore = new MySQLStore(configDB);
app.use(
  expressSession({
    secret: "securite",
    name: "poti-gato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);



app.use('*', (req, res, next) => {
  console.log(req.session)
  res.locals.user = req.session.user;
  next();
})

// app.use('*', function (req, res) {
//   res.status(404).render("404", {
//       layout: '404'
//   });
// });


const ROUTER = require('./router/router');
app.use("/", ROUTER)
// Le serveur écoute sur le port 3000
app.listen(PORT_NODE, () =>{
    console.log('Le serveur est lancé sur le port 3000');
});

module.exports = { db, app };