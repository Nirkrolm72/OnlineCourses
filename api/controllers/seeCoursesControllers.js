exports.seeCourses = (req, res) => {
    res.render('seeCourses', { title: 'Cours', layout: "cours" });
}

const getSeeCourses = (req, res) => {
    // A faire 
}

module.exports = {
    getSeeCourses
}