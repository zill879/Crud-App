var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM team_pak_player order by Tid" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('team_pak_player', {title:'Node.js MySQL CRUD Application', action:'list', team_pak_playerData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("team_pak_player", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_team_pak_player", function(request, response,next){ 
    
    var query = `INSERT INTO team_pak_player(Tid,Pid) 
    VALUES("${request.body.Tid}" , "${request.body.Pid} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/team_pak_player")
        }
    });
    
});
router.get('/edit/:Tid/:Pid', function(request, response, next){

	var Tid = request.params.Tid;
    var Pid = request.params.Pid;
	var query = `SELECT * FROM team_pak_player WHERE Tid = "${Tid}" AND Pid="${Pid}"`;

	database.query(query, function(error, data){

		response.render('team_pak_player', {title: 'Edit MySQL Table Data', action:'edit', team_pak_playerData:data[0]});

	});

});
router.post('/edit/:Tid/:Pid', function(request, response, next){

	var Tid = request.params.Tid;
    var Pid = request.params.Pid;
	var query = `
	UPDATE team_pak_player 
	SET Pid = "${request.body.Pid}"  
	WHERE Tid = "${Tid}" AND Pid="${Pid}" 
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/team_pak_player');
		}

	});

});
router.get('/delete/:Tid/:Pid', function(request, response, next){

	var Tid = request.params.Tid;
    var Pid = request.params.Pid;
	var query = `
	DELETE FROM team_pak_player WHERE Tid = "${Tid}" AND Pid="${Pid}" 
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/team_pak_player");
		}

	});

});
module.exports = router; 