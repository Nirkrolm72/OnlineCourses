exports.deconnexion = (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('poti-gato');
      console.log("Clear Cookie session :", req.sessionID);
      res.redirect('/');
    })
}