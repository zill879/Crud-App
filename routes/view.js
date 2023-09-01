var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = `Select p.First_Name,p.Player_Name,tpp.Tid,p.Last_Name,p.Address,s.State_Name,t.Type_Name,p.Age,p.Date_Of_Birth,ba.baller,ba.Best_Bowling_Figures,ba.Wickets,ba.Fid,bt.Batsman,bt.Best_Runs,bt.Runs 
    from pak_player as p,state as s,type as t,team_pak_player as tpp,ball as ba,pak_player_stats as pps,bat as bt where tpp.Pid=p.Pid AND p.Sid=s.Sid AND p.type_id=t.type_id AND p.Pid=pps.Pid AND pps.Ball_id=ba.Ball_id AND p.Pid=pps.Pid AND pps.Bat_id=bt.Bat_id `;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('view', {title:'Node.js MySQL CRUD Application', action:'list', viewData:data});
		}

	});
});
router.post("/add_view", function(request, response, next){

	var query = `Select p.First_Name,p.Player_Name,tpp.Tid,p.Last_Name,p.Address,s.State_Name,t.Type_Name,p.Age,p.Date_Of_Birth,ba.baller,ba.Best_Bowling_Figures,ba.Wickets,ba.Fid,bt.Batsman,bt.Best_Runs,bt.Runs 
    from pak_player as p,state as s,type as t,team_pak_player as tpp,ball as ba,pak_player_stats as pps,bat as bt where tpp.Pid=p.Pid AND p.Sid=s.Sid AND p.type_id=t.type_id AND p.Pid=pps.Pid AND pps.Ball_id=ba.Ball_id 
	AND p.Pid=pps.Pid AND pps.Bat_id=bt.Bat_id AND (p.First_Name="${request.body.search}" OR p.Player_Name="${request.body.search}" OR p.Last_Name="${request.body.search}") `;

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('view', {title:'Node.js MySQL CRUD Application', action:'list', viewData:data});
		}

	});
});
module.exports = router;