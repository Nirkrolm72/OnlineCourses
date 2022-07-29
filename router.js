const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = express.Router();

// connexion avec la base de donnée
const db = require('./api/database/database');

// Body-Parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Config méthode override
router.use(methodOverride('_method'));

/**********************************CONTROLLERS********************************* */
const { get, register } = require('./api/controllers/inscription.controllers');
const { profil } = require('./api/controllers/profil.controllers');
const { connexion } = require('./api/controllers/connexion.controllers');
const { parametres } = require('./api/controllers/parametres.controllers');
const { admin, adminUpdate, adminSupprimer } = require('./api/controllers/admin.controllers');
const { user, userUpdate, userSupprimer } = require('./api/controllers/user.controllers');
const { formateur } = require('./api/controllers/formateur.controllers');
const { cours, postCours } = require('./api/controllers/cours.controllers');
const { seeCourses } = require('./api/controllers/seeCourses.controllers');
const { home } = require('./api/controllers/home.controllers');


/****************************MIDDLEWARES******************************* */
const { mdlinscription } = require('./api/middlewares/inscription.middleware');
const { mdlprofil } = require('./api/middlewares/profil.middleware');
const { mdlparametres } = require('./api/middlewares/parametres.middleware');
const { mdladmin } = require('./api/middlewares/admin.middleware');
const { mdluser } = require('./api/middlewares/user.middleware');
const { mdlformateur } = require('./api/middlewares/formateur.middleware');
const { mdlcours } = require('./api/middlewares/cours.middleware');
const { mdlseeCourses } = require('./api/middlewares/seeCourses.middleware');



// Page d'accueil
router.route('/').get(home);

/******************Page Inscription****************************/
router.route('/connexion').get(connexion);
// /******************Fin Page Inscription*********************/

/******************Page Inscription****************************/
router.route('/inscription').get(get).post(register);
// /******************Fin Page Inscription*********************/


// /******************Page Profil*********************/
router.route('/profil').get(profil);
// /****************** Fin Page Profil*********************/


// /******************Page Paramètres*********************/
router.route('/parametres').get(parametres);
// /****************** Fin Page Paramètres*********************/


// /******************Page Admin*********************/
router.route('/admin').get(admin).put(adminUpdate).delete(adminSupprimer);
// /******************Fin Page Admin*********************/


// /******************Page User*********************/
router.route('/user').get(user).put(userUpdate).delete(userSupprimer);
// /****************** Fin Page User*********************/


// /****************** Fin Page Formateur*********************/
router.route('/formateur').get(formateur);
// /****************** Fin Page Formateur*********************/


// /******************Page Cours*********************/
router.route('/cours').get(cours).post(postCours);
// /****************** Fin Page Cours*********************/


// /******************Page SeeCourses*********************/
router.route('/seeCourses').get(seeCourses);
// /****************** Fin Page SeeCourses*********************/

// /******************Page 404*********************/
router.use('*', function (req, res) {
    res.status(404).render("404", {
        layout: '404'
    });
});
/****************** Fin Page 404*********************/



module.exports = router;