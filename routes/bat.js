var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM bat order by Bat_id" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('bat', {title:'Node.js MySQL CRUD Application', action:'list', batData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("bat", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_bat", function(request, response,next){ 
    
    var query = `INSERT INTO bat(Bat_id,Batsman,Best_Runs,Runs,Fid) 
    VALUES("${request.body.Bat_id}", "${request.body.Batsman} ","${parseInt(request.body.Best_Runs)} ","${parseInt(request.body.Runs)} ","${request.body.Fid} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/bat")
        }
    });
    
});
router.get('/edit/:Bat_id', function(request, response, next){

	var Bat_id = request.params.Bat_id;

	var query = `SELECT * FROM bat WHERE Bat_id = "${Bat_id}"`;

	database.query(query, function(error, data){

		response.render('bat', {title: 'Edit MySQL Table Data', action:'edit', batData:data[0]});

	});

});
router.post('/edit/:Bat_id', function(request, response, next){

	var Bat_id = request.params.Bat_id;
	var Batsman = request.body.Batsman;
    var Best_Runs = parseInt(request.body.Best_Runs);
    var Runs = parseInt(request.body.Runs);
    var Fid = request.body.Fid;
	var query = `
	UPDATE bat 
	SET Batsman = "${Batsman}",
    Best_Runs = "${Best_Runs}",
    Runs = "${Runs}",
    Fid = "${Fid}"  
	WHERE Bat_id = "${Bat_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/bat');
		}

	});

});
router.get('/delete/:Bat_id', function(request, response, next){

	var Bat_id = request.params.Bat_id; 
	var query = `
	DELETE FROM bat WHERE Bat_id = "${Bat_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/bat");
		}

	});

});
module.exports = router; 