var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM formats order by Fid" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('formats', {title:'Node.js MySQL CRUD Application', action:'list', formatsData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("formats", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_formats", function(request, response,next){ 
    
    var query = `INSERT INTO formats(Fid,Format_name) 
    VALUES("${request.body.Fid}", "${request.body.Format_name} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/formats")
        }
    });
    
});
router.get('/edit/:Fid', function(request, response, next){

	var Fid = request.params.Fid;

	var query = `SELECT * FROM formats WHERE Fid = "${Fid}"`;

	database.query(query, function(error, data){

		response.render('formats', {title: 'Edit MySQL Table Data', action:'edit', formatsData:data[0]});

	});

});
router.post('/edit/:Fid', function(request, response, next){

	var Fid = request.params.Fid;

	var Format_name = request.body.Format_name;

	var query = `
	UPDATE formats 
	SET Format_name = "${Format_name}"  
	WHERE Fid = "${Fid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/formats');
		}

	});

});
router.get('/delete/:Fid', function(request, response, next){

	var Fid = request.params.Fid; 
	var query = `
	DELETE FROM formats WHERE Fid = "${Fid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/formats");
		}

	});

});
module.exports = router; 