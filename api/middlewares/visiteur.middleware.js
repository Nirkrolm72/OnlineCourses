module.exports = {
    isVisiteur: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/connexion');
      const [user] = await db.query(`SELECT isVisiteur FROM users WHERE id="${req.session.user.id}"`);
      console.log(user);
      ( user.isVisiteur === req.session.user.isVisiteur && user.isVisiteur === 0 ) ? res.redirect('/connexion') : next();
    }
}

// module.exports = async (req, res, next) => {
//   if(req.session.user){
//     const isVisiteur = await query(`SELECT isVisiteur FROM users WHERE id = ${req.session.user.id}`);

//     if(isVisiteur[0].isVisiteur === 1){
//       next();
//     }
//     else{
//       return res.render('/', {failure: "Vous devez vous connecter pour avoir accès aux cours"});
//     }
//   }
// }
