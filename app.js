require('dotenv').config();
const express = require('express');
const router = express.Router();

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

const app = express();

// Routes
const home_routes = require('./routes/home');
const user_routes = require('./routes/users');
const admin_routes = require('./routes/admin');
const connexion_routes = require('./routes/connexion');
const mdpOublie_routes = require('./routes/mdpOublie');
const creationCours_routes = require('./routes/Creationcours');
const inscription_routes = require('./routes/inscription');
const visiteur_routes = require('./routes/visiteur');
const parametres_routes = require('./routes/parametres');
const profil_routes = require('./routes/profil');
const seeCourses_routes = require('./routes/seeCourses');
const deconnexion_routes = require('./routes/deconnexion');
const contact_routes = require('./routes/contact');
const cours_routes = require('./routes/cours');



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

// Controllers
const { getProfilUser, updateProfil} = require('./api/controllers/profilControllers');
const { getUsers, editOneUser } = require('./api/controllers/userControllers');
const {inscripUser,verificationMail, verificationMailPost } = require('./api/controllers/inscriptionControllers');
const { postCours} = require('./api/controllers/CreationcoursControllers');
const { updateUser, deleteUser} = require('./api/controllers/adminControllers');
const { connectUser } = require('./api/controllers/connexionControllers');
const { deconnexion } = require('./api/controllers/deconnexionControllers');
const { getSeeCourses } = require('./api/controllers/seeCoursesControllers');
const { visiteur } = require('./api/controllers/visiteurControllers');
const { mdpOublie } = require('./api/controllers/mdp_oublieControllers');
const { contact } = require('./api/controllers/contactController');
const nodemailerControllers = require('./api/controllers/nodemailerControllers');
const { getCours, cours } = require('./api/controllers/coursControllers');


// Middleware
//const multer = require('./api/config/multer');

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
  res.locals.user = req.session.user;
  next();
})

// Routes

app.get('/', function(req, res){
  res.render('home');
});


const upload = require('./api/config/multer');

const { isAdmin } = require('./api/middlewares/admin.middleware');
const {isVisiteur} = require('./api/middlewares/visiteur.middleware');



app.use('/connexion', connexion_routes);
app.post('/connexion', connexion_routes, connectUser);

app.use('/inscription', inscription_routes);
app.post('/inscription',inscription_routes, inscripUser);

app.use('/admin', isAdmin, admin_routes);
app.put('/admin', isAdmin, admin_routes, updateUser);
app.delete('/admin',isAdmin, admin_routes, deleteUser);


app.get('/Creationcours', isAdmin, creationCours_routes);
app.post('/Creationcours', upload.single('avatar') ,isAdmin, creationCours_routes, postCours);


app.get('/cours/:id', cours_routes, getCours);

app.use('/visiteur', visiteur_routes);

app.use('/parametres', parametres_routes);

app.get('/profil', profil_routes, getProfilUser);
app.post('/profil',profil_routes, updateProfil);
app.put('/profil/:id',upload.single('avatar'), updateProfil);

app.get('/seeCourses',upload.single('avatar'), isAdmin, isVisiteur, seeCourses_routes, getSeeCourses);


app.get('/user', upload.single('avatar') ,isAdmin, user_routes);
app.post('/user', isAdmin, updateUser, user_routes);
app.put('/user/:id', isAdmin, editOneUser);

app.get('/deconnexion', deconnexion_routes, deconnexion);

app.use('/contact', contact_routes);
app.post('/contact', contact_routes, nodemailerControllers.sendMailContact);

app.post('/verification', nodemailerControllers.sendVerif);

app.get('/verification/:id', verificationMail);
app.post('/verification/:id', verificationMailPost);

// app.use('*', function (req, res) {
//   res.status(404).render("404", {
//       layout: '404'
//   });
// });

// Le serveur écoute sur le port 3000
app.listen(PORT_NODE, () =>{
    console.log('Le serveur est lancé sur le port 3000');
});

module.exports = { db };