const chaiHttp = require('chai-http'),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    { app, db } = require('../../app'),

    path = require('path');

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // COURS", function () {
    // On définit des variables à utiliser plus tard
    let id;
    let cookieSession = "";


    it("CHAI // POST // LOGIN", (done) => {
        chai
            .request(app)
            .post('/connecUser')
            .set("Accept", "application/json")
            .send({ email: "guyonbrandon@outlook.fr", password: "admin" })
            .end((err, res) => {
                cookieSession = res.res.headers['set-cookie'][0].split(';')[0]
                if (err) return done(err);
                
                res.should.have.status(200);
                done();
            });
    });


    // Test route GET Cours
    it("CHAI // GET // COURS", function (done) {
        // Nous appelons chai avec .request(app) afin de venir cherher les routes de notre application
        chai
            .request(app)
            // On précise la route
            .get(`/cours/${id}`)
            .set("Accept", "application/json")
            .set('Cookie', cookieSession)
            // Et enfin nous allons pouvoir checker le format de notre réponse
            .end((err, res) => {

                if (err) return done(err);

                // Ici on demande à ce que res.body.cours doit être un 'array'

                //res.body.db.should.be.a("array");
                res.body.dbCours.should.be.a('array');
                // Ici on demande à ce que res soit un status 200
                res.should.have.status(200);
                // Et le done() permet de cloturer notre test
                done();
            });
    })


    it("CHAI // POST // COURS", (done) => {
        chai
            .request(app)
            .post('/Creationcours')
            .set("Accept", "application/json")
            .set('Cookie', cookieSession)
            .field("Content-Type", "multipart/form-data")
            .field("titre", "Apprendre le langage Angular")
            .field("description", "Apprenez les fondamentaux du langage Angular")
            .field("contenu", "Ceci est un test avec le langage Bash")
            .attach("avatar", path.resolve(__dirname, "../../public/ressources/angular.png"))
            .end((err, res) => {
                if (err) return done(err);
                
                res.body.id.should.be.a('number');
                id = res.body.id
                res.should.have.status(200);
                done();
            });
    });

    it("CHAI // PUT // COURS", (done) => {
        chai
            .request(app)
            .put(`/cours/${id}`)
            .set("Accept", "application/json")
            .set('Cookie', cookieSession)
            .field("Content-Type", "multipart/form-data")
            .field("titre", "Apprendre le python")
            .field("description", "Apprendre le langage python")
            .field("contenu", "Ceci est un test avec le langage python")
            .attach("avatar", path.resolve(__dirname, "../../public/images/linuxbash.png"))
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            });
    });

    

    it(" CHAI // DELETE // COURS ID", (done) => {
        chai
            .request(app)
            .delete(`/cours/${id}`)
            .set("Accept", "application/json")
            .set('Cookie', cookieSession)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            });
    });


});
