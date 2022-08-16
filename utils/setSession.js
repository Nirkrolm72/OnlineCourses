const { inscripUser } = require("../api/controllers/inscriptionControllers");

exports.setSession = async function (req, res, email) {
    let userget = await db.query(`SELECT * FROM users WHERE email="${email}"`)
    let user = userget[0];
    
    
    req.session.user = {
      id: user.id,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
      avatar: user.avatar,
      ville: user.ville,
      adresse: user.adresse,
      codePostal: user.codePostal,
      pays: user.pays,
      status: user.status
      // 'isAdmin': user.isAdmin
    };
  
    res.redirect('/profil')
  }