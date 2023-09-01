var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM team order by Tid" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('team', {title:'Node.js MySQL CRUD Application', action:'list', teamData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("team", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_team", function(request, response,next){ 
    
    var query = `INSERT INTO team(Tid,Tname) 
    VALUES("${request.body.Tid}", "${request.body.Tname} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/team")
        }
    });
    
});
router.get('/edit/:Tid', function(request, response, next){

	var Tid = request.params.Tid;

	var query = `SELECT * FROM team WHERE Tid = "${Tid}"`;

	database.query(query, function(error, data){

		response.render('team', {title: 'Edit MySQL Table Data', action:'edit', teamData:data[0]});

	});

});
router.post('/edit/:Tid', function(request, response, next){

	var Tid = request.params.Tid;

	var Tname = request.body.Tname;

	var query = `
	UPDATE team 
	SET Tname = "${Tname}"  
	WHERE Tid = "${Tid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/team');
		}

	});

});
router.get('/delete/:Tid', function(request, response, next){

	var Tid = request.params.Tid; 
	var query = `
	DELETE FROM team WHERE Tid = "${Tid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/team");
		}

	});

});
module.exports = router; 