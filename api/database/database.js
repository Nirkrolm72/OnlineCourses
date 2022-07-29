const mysql = require('mysql');

// Création de la connexion à la base de données
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kali',
  database: 'OnlineCourses'
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connecté à la base de donnée');
});

module.exports = { db };

