require('dotenv').config()
const { MODE } = process.env
const express = require('express');
const router = express.Router();

// // // connexion avec la base de donnée
const db = require('../api/database/database');

// // Import des controllers
const { home, connexion, editOneUser, profil, contact, Creationcours,
        inscription, seeCourses, user, connectUser, inscripUser,
        deconnexion, getUsers, updateUser, deleteOneUser, getCours, postCours,
        getSeeCourses, getAllCours, admin, verificationMail, verificationMailPost, sendMailContact,
        deleteCours, updateCours, sendVerif, verifMail, getProfilUser, updateProfil, mdpOublie } = require("../api/controllers");

// Import des middlewares
const { isAdmin, isVisiteur } = require('../api/middlewares');

// Multer
const upload = require('../api/config/multer');
const { application } = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');

// Page Home
router.route('/')
        .get(home)
        .post(sendMailContact)

// Auth
router.route('/connexion')
        .get(connexion)
        .post(connectUser)

router.route('/inscription')
        .get(inscription)
        .post(upload.single('avatar'), inscripUser)

router.route('/mdpOublie')
        .get(mdpOublie)

router.route('/deconnexion')
        .get(deconnexion)

// Profil
//router.use(isAdmin, isVisiteur)
router.route('/profil')
        .get(getProfilUser)
router.route('/profil/:id')
        .put(upload.single('avatar'), updateProfil)

// Cours + CRUD
router.use(isVisiteur)
router.route('/seeCourses')
        .get(getSeeCourses)
router.route('/cours/:id')
        .get(getCours);


router.use(isAdmin)
router.route('/Creationcours').get(Creationcours)
        .post(upload.single('avatar'), postCours)

// User + CRUD
router.use(isAdmin)
router.route('/user')
        .get(getUsers)

router.route('/user/:id')
        .put(editOneUser)
        .delete(deleteOneUser)

// Admin
router.use(isAdmin)
router.route('/admin')
        .get(getAllCours)
router.route('/admin/:id')
        .put(updateCours)
        .delete(deleteCours)


// MAIL
// router.route('/verification')
//     .post(sendVerif)

// router.route('/verification/:id')
//         .get(verificationMail)
//         .post(verificationMailPost)

// router.get('/verification/:token', (req, res) => {

//         const { token } = req.params;

//         jwt.verification(token, 'MaCleSecrete', function (err, decoded) {
//                 if (err) {
//                         console.log(err);
//                         res.send('Email de verification echoué, le lien est invalide');
//                 }
//                 else {

//                         res.send('Email de verification success');
//                 }
//         })
// })




// // /******************Page 404*********************/
// router.use('*', function (req, res) {
//     res.status(404).render("404", {
//         layout: '404'
//     });
// });
// /****************** Fin Page 404*********************/



module.exports = router;