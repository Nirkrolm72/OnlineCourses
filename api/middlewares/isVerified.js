module.exports = async (req, res, next) => {
    if (req.session.user) {
        const isVerif = await query(`SELECT isVerified FROM user WHERE id = ${req.session.user.id}`)
       
        if (isVerif[0].isVerified === 1) {
            next();
        } else {
            return res.render('home', { success: "Pensez à vérifier vos Email pour finaliser votre inscription, si le problème persiste, contacter l'administrateur via le formulaire en bas de page"})
        }
    } else {
        return res.render('home', { success: "Pensez à vérifier vos Email pour finaliser votre inscription, si le problème persiste, contacter l'administrateur via le formulaire en bas de page"})

    }
}