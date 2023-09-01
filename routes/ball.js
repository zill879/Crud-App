var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM ball order by Ball_id" ;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('ball', {title:'Node.js MySQL CRUD Application', action:'list', ballData:data});
		}

	});
});
router.get("/add", function(request,response,next){

    response.render("ball", {title: 'Insert Data into MYSQL', action:'add'});
});
router.post("/add_ball", function(request, response,next){ 
    
    var query = `INSERT INTO ball(Ball_id,Baller,Best_Bowling_Figures,Wickets,Fid) 
    VALUES("${request.body.Ball_id}", "${request.body.Baller} ","${request.body.Best_Bowling_Figures} ","${parseInt(request.body.Wickets)} ","${request.body.Fid} ")`;

    database.query(query, function(error, data){
        if (error){
            throw error
        }
        else 
        {
            response.redirect("/ball")
        }
    });
    
});
router.get('/edit/:Ball_id', function(request, response, next){

	var Ball_id = request.params.Ball_id;

	var query = `SELECT * FROM ball WHERE Ball_id = "${Ball_id}"`;

	database.query(query, function(error, data){

		response.render('ball', {title: 'Edit MySQL Table Data', action:'edit', ballData:data[0]});

	});

});
router.post('/edit/:Ball_id', function(request, response, next){

	var Ball_id = request.params.Ball_id;
	var Baller = request.body.Baller;
    var Best_Bowling_Figures = request.body.Best_Bowling_Figures;
    var Wickets = parseInt(request.body.Wickets);
    var Fid = request.body.Fid;
	var query = `
	UPDATE ball 
	SET Baller = "${Baller}",
    Best_Bowling_Figures = "${Best_Bowling_Figures}",
    Wickets = "${Wickets}",
    Fid = "${Fid}"  
	WHERE Ball_id = "${Ball_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/ball');
		}

	});

});
router.get('/delete/:Ball_id', function(request, response, next){

	var Ball_id = request.params.Ball_id; 
	var query = `
	DELETE FROM ball WHERE Ball_id = "${Ball_id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/ball");
		}

	});

});
module.exports = router; 