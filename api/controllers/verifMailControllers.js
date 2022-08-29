const nodemailer = require('nodemailer');

function sendEmail(email, token) {

    var email = email;
    var token = token;

    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Guyon.Brandon.dev@gmail.com',
            pass: 'rseyekjmvzqnrlku'
        }
    });

    var mailOptions = {
        from: 'Guyon.Brandon.dev@gmail.com',
        to: email,
        subject: 'Email de vérificatioin',
        html: '<p>Veuillez cliquer sur ce lien pour vérifier votre adresse email <a href="http://localhost:3000/verify-email?token=' + token + '">Cliquez sur le lien</a></p>'

    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            return 1
        } else {
            return 0
        }
    });
}

exports.verifEmail = (req, res) => {
    const { email } = req.body;
    //console.log(sendEmail(email, fullUrl));

    db.query(`SELECT isVerified FROM users WHERE email ="${email}"`, function (err, result) {
        if (err) throw err;

        var type = 'success'
        var msg = 'Email already verified'

        console.log(result[0]);

        if (result.length > 0) {

            var token = randtoken.generate(20);

            if (result[0].verify == 0) {
                var sent = sendEmail(email, token);
                if (sent != '0') {


                    var data = {
                        token: token
                    }


                    connection.query('UPDATE isVerified SET ? WHERE email ="' + email + '"', data, function (err, result) {
                        if (err) throw err

                    })

                    type = 'success';
                    msg = 'The verification link has been sent to your email address';

                } else {
                    type = 'error';
                    msg = 'Something goes to wrong. Please try again';
                }
            }


        } else {
            console.log('2');
            type = 'error';
            msg = 'The Email is not registered with us';

        }

        //req.flash(type, msg);
        res.redirect('/');
    });
}