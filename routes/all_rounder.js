var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM all_rounder order by All_rounder_id " ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('all_rounder', {title:'Node.js MySQL CRUD Application', action:'list', all_rounderData:data});
		}

	});

});

router.get("/add", function(request,response,next){

    response.render("all_rounder", {title: 'Insert Data into MYSQL', action:'add'});
});

router.post("/add_all_rounder", function(request, response,next){
    
    var query = `INSERT INTO all_rounder(Bat_id,Ball_id,All_rounder_id,All_Rounder) 
    VALUES("${request.body.Bat_id}", "${request.body.Ball_id} ", "${request.body.All_rounder_id}", "${request.body.All_Rounder}")`;

    database.query(query, function(error, data){
        if (error){
            throw error;
        }
        else 
        {
            response.redirect("/all_rounder")
        }
    });
    
});
router.get('/edit/:All_rounder_id', function(request, response, next){

	var All_rounder_id = request.params.All_rounder_id;

	var query = `SELECT * FROM all_rounder WHERE All_rounder_id = "${All_rounder_id}"`;

	database.query(query, function(error, data){

		response.render('all_rounder', {title: 'Edit MySQL Table Data', action:'edit', all_rounderData:data[0]});

	});

});
router.post('/edit/:All_rounder_id', function(request, response, next){

	var All_rounder_id = request.params.All_rounder_id;
	var Bat_id = request.body.Bat_id;
	var Ball_id = request.body.Ball_id;
	var All_Rounder = request.body.All_Rounder;

	var query = `
	UPDATE all_rounder 
	SET Bat_id = "${Bat_id}", 
	Ball_id = "${Ball_id}", 
	All_Rounder = "${All_Rounder}" 
	WHERE All_rounder_id = "${All_rounder_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/all_rounder');
		}

	});

});
router.get('/delete/:All_rounder_id', function(request, response, next){

	var All_rounder_id = request.params.All_rounder_id; 

	var query = `
	DELETE FROM all_rounder WHERE All_rounder_id = "${All_rounder_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/all_rounder");
		}

	});

});

module.exports = router;