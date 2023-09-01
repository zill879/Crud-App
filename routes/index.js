var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next){

    var user_name = request.body.user_name;

    var user_password = request.body.user_password;

    if(user_name && user_password)
    {
        query = `
        SELECT * FROM user_login 
        WHERE user_name = "${user_name}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == user_password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.redirect("http://localhost:3000/pak_player");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect User Name');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter User Name and Password Details');
        response.end();
    }

});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;

