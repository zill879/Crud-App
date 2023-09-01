var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM type order by type_id" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('type', {title:'Node.js MySQL CRUD Application', action:'list', typeData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("type", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_type", function(request, response,next){ 
    
    var query = `INSERT INTO type(type_id,Type_Name) 
    VALUES("${parseInt(request.body.type_id)}", "${request.body.Type_Name} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/type")
        }
    });
    
});
router.get('/edit/:type_id', function(request, response, next){

	var type_id = request.params.type_id;

	var query = `SELECT * FROM type WHERE type_id = "${type_id}"`;

	database.query(query, function(error, data){

		response.render('type', {title: 'Edit MySQL Table Data', action:'edit', typeData:data[0]});

	});

});
router.post('/edit/:type_id', function(request, response, next){

	var type_id = request.params.type_id;

	var Type_Name = request.body.Type_Name;

	var query = `
	UPDATE type
	SET Type_Name = "${Type_Name}"  
	WHERE type_id = "${type_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/type');
		}

	});

});
router.get('/delete/:type_id', function(request, response, next){

	var type_id = request.params.type_id; 
	var query = `
	DELETE FROM type WHERE type_id = "${type_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/type");
		}

	});

});
module.exports = router; 