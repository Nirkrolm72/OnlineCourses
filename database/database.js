const mysql = require('mysql');

// Création de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: 'Br26an07don1997//',
    database: 'OnlineCourses'
  });



module.exports = db;