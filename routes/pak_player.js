var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM pak_player order by Pid" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('pak_player', {title:'Node.js MySQL CRUD Application', action:'list', pak_playerData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("pak_player", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_pak_player", function(request, response,next){ 
    
    var query = `INSERT INTO pak_player(Pid,First_Name,Player_Name,Last_Name,Address,Sid,type_id,Age,Date_Of_Birth) 
    VALUES("${request.body.Pid}", "${request.body.First_Name} ", "${request.body.Player_Name} ", "${request.body.Last_Name} ", "${request.body.Address} ", "${parseInt(request.body.Sid)} ", "${parseInt(request.body.type_id)} ", "${parseInt(request.body.Age)} ", "${request.body.Date_Of_Birth} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/pak_player")
        }
    });
    
});
router.get('/edit/:Pid', function(request, response, next){

	var Pid = request.params.Pid;

	var query = `SELECT * FROM pak_player WHERE Pid = "${Pid}"`;

	database.query(query, function(error, data){

		response.render('pak_player', {title: 'Edit MySQL Table Data', action:'edit', pak_playerData:data[0]});

	});

});
router.post('/edit/:Pid', function(request, response, next){

	var Pid = request.params.Pid;
	var First_Name = request.body.First_Name;
    var Player_Name=request.body.Player_Name;
    var Last_Name=request.body.Last_Name;
    var Address=request.body.Address;
    var Sid=parseInt(request.body.Sid);
    var type_id=parseInt(request.body.type_id);
    var Age=parseInt(request.body.Age);
    var Date_Of_Birth=request.body.Date_Of_Birth;

	var query = `
	UPDATE pak_player
	SET First_Name = "${First_Name}",
    Player_Name=  "${Player_Name}",
    Last_Name= "${Last_Name}",
    Address= "${Address}",
    Sid= "${Sid}",
    type_id= "${type_id}",
    Age= "${Age}",
    Date_Of_Birth= "${Date_Of_Birth}"
	WHERE Pid = "${Pid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/pak_player');
		}

	});

});
router.get('/delete/:Pid', function(request, response, next){

	var Pid = request.params.Pid; 
	var query = `
	DELETE FROM pak_player WHERE Pid = "${Pid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/pak_player");
		}

	});

});
module.exports = router; 