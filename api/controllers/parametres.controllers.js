exports.parametres = (req, res) => {
    res.render('parametres', { title: 'Parametres', layout: 'parametres' });
}

exports.get = (req, res) => {
    res.render('parametres', { title: 'parametres', layout: 'parametres' });
}