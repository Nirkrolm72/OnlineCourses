const assert = require('assert');


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

    // Test route GET Cours
    it("CHAI // GET // COURS", function (done) {
        // Nous appelons chai avec .request(app) afin de venir cherher les routes de notre application
        chai
            .request(app)
            // On précise la route
            .get('/user/1')
            // Et enfin nous allons pouvoir checker le format de notre réponse
            .end((err, res) => {

                if(err) return done(err);
                
                // Ici on demande à ce que res.body.cours doit être un 'array'
                console.log('/user/1', res)
            
                //res.body.db.should.be.a("array");
                res.body.db.should.be.a('array');
                // Ici on demande à ce que res soit un status 200
                res.should.have.status(200);    
                // Et le done() permet de cloturer notre test
                done();
            });
    });

    it("CHAI // POST // LOGIN", (done) => {
        chai
            .request(app)
            .post('/connexion')
            .set("Accept", "application.json")
            .send({email: "guyonbrandon@outlook.fr", password: "admin"})
            .end((err, res) => {
                cookieSession = res.res.headers['set-cookie'][0].split(';')[0]
                if(err) return done(err);
                res.should.have.status(200);
                done();
            });
    });
});