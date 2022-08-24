module.exports = {
    isAdmin: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/connexion')
      const [user] = await db.query(`SELECT is_admin FROM users WHERE email="${req.session.user.email}"`);
      console.log(user);
      ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/connexion') : next();
    }
}