// HOME
const { home, connexion, profil ,contact, Creationcours, inscription, seeCourses, user } = require('./HomeControllers');
// AUTH
const { connectUser, inscripUser, deconnexion } = require('./AuthControllers')
// USER + CRUD
const { getUsers, updateUser, deleteOneUser } = require('./UserControllers');
// PROFIL
const {getProfilUser, updateProfil } = require('./ProfilControllers');
// COURS + CRUD
const { getCours, postCours, getSeeCourses } = require('./CoursControllers')
// ADMIN
const { admin } = require('./AdminControllers');
// MAIL
const { verificationMail, verificationMailPost, sendMailContact, sendVerif, verifMail } = require('./MailControllers');


module.exports = {
    // Home
    home, connexion, contact, admin, Creationcours, profil ,inscription, seeCourses, user,
    // Auth
    connectUser, inscripUser, deconnexion,
    // User + CRUD
    getUsers, updateUser, deleteOneUser, getProfilUser, updateProfil,
    // Cours + CRUD
    getCours, postCours, getSeeCourses,
    // Admin
    admin,
    // Mail
    verificationMail, verificationMailPost, sendMailContact, sendVerif, verifMail
}