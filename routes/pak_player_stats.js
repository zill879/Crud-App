var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM pak_player_stats " ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('pak_player_stats', {title:'Node.js MySQL CRUD Application', action:'list', pak_player_statsData:data});
		}

	});

});

router.get("/add", function(request,response,next){

    response.render("pak_player_stats", {title: 'Insert Data into MYSQL', action:'add'});
});

router.post("/add_pak_player_stats", function(request, response,next){
    
    var query = `INSERT INTO pak_player_stats(Pid,Bat_id,Ball_id,All_Rounder_id) 
    VALUES("${request.body.Pid}", "${request.body.Bat_id} ", "${request.body.Ball_id}", "${request.body.All_Rounder_id}")`;

    database.query(query, function(error, data){
        if (error){
            throw error;
        }
        else 
        {
            response.redirect("/pak_player_stats")
        }
    });
    
});
router.get('/edit/:All_Rounder_id/:Bat_id/:Ball_id/:Pid', function(request, response, next){

	var All_Rounder_id = request.params.All_Rounder_id;
    var Bat_id = request.params.Bat_id;
    var Ball_id = request.params.Ball_id;
    var Pid = request.params.Pid;
	var query = `SELECT * FROM pak_player_stats WHERE All_rounder_id = "${All_Rounder_id}" AND Bat_id="${Bat_id}" AND Ball_id="${Ball_id}" AND Pid="${Pid}"`;

	database.query(query, function(error, data){

		response.render('pak_player_stats', {title: 'Edit MySQL Table Data', action:'edit', pak_player_statsData:data[0]});

	});

});
router.post('/edit/:All_Rounder_id/:Bat_id/:Ball_id/:Pid', function(request, response, next){

	var All_Rounder_id = request.params.All_Rounder_id;
	var Bat_id = request.params.Bat_id;
    var Ball_id = request.params.Ball_id;
    var Pid = request.params.Pid;

	var query = `
	UPDATE pak_player_stats 
	SET Bat_id = "${request.body.Bat_id}", 
	Ball_id = "${request.body.Ball_id}", 
	Pid = "${request.body.Pid}" 
	WHERE All_rounder_id = "${All_Rounder_id}" AND Bat_id="${Bat_id}" AND Ball_id="${Ball_id}" AND Pid="${Pid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/pak_player_stats');
		}

	});

});
router.get('/delete/:All_Rounder_id/:Bat_id/:Ball_id/:Pid', function(request, response, next){

	var All_Rounder_id = request.params.All_Rounder_id; 
    var Bat_id = request.params.Bat_id;
    var Ball_id = request.params.Ball_id;
    var Pid = request.params.Pid;
	var query = `
	DELETE FROM pak_player_stats WHERE All_rounder_id = "${All_Rounder_id}" AND Bat_id="${Bat_id}" AND Ball_id="${Ball_id}" AND Pid="${Pid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/pak_player_stats");
		}

	});

});

module.exports = router;