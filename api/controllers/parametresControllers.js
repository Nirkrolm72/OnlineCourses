exports.parametres = (req, res) => {
    res.render('parametres', { title: 'Parametres', layout: 'parametres' });
}

const getUser = (req, res) => {
    res.render('parametres', { title: 'parametres', layout: 'parametres' });
}

module.exports = {
    getUser
}