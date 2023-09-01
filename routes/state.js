var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM state order by Sid" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('state', {title:'Node.js MySQL CRUD Application', action:'list', stateData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("state", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_state", function(request, response,next){ 
    
    var query = `INSERT INTO state(Sid,State_Name) 
    VALUES("${parseInt(request.body.Sid)}", "${request.body.State_Name} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/state")
        }
    });
    
});
router.get('/edit/:Sid', function(request, response, next){

	var Sid = request.params.Sid;

	var query = `SELECT * FROM state WHERE Sid = "${Sid}"`;

	database.query(query, function(error, data){

		response.render('state', {title: 'Edit MySQL Table Data', action:'edit', stateData:data[0]});

	});

});
router.post('/edit/:Sid', function(request, response, next){

	var Sid = request.params.Sid;

	var State_Name = request.body.State_Name;

	var query = `
	UPDATE state 
	SET State_Name = "${State_Name}"  
	WHERE Sid = "${Sid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/state');
		}

	});

});
router.get('/delete/:Sid', function(request, response, next){

	var Sid = request.params.Sid; 
	var query = `
	DELETE FROM state WHERE Sid = "${Sid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/state");
		}

	});

});
module.exports = router;    