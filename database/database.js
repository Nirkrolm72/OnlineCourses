const mysql = require('mysql');

// Création de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'brandon',
    password: 'kali',
    database: 'OnlineCourses'
  });



module.exports = db;