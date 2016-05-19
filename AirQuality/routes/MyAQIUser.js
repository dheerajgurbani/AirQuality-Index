/**
 * New node file
 */

//var mysql = require("mysql");
var mysql = require('./mysql');

var session = require('client-sessions');

exports.UserMaps = function(req,res) {
	
	var getUser = "select * from team_project_281.vendor_sensor";
	
	

	
	mysql.fetchData(function(err,results){
		if(err){
			//res.render(temp);
			throw err;
		}
		else 
		{
			
			var lat=[];
			var lng=[];
			var loc=[];
			var id=[];
			for(var i=0;i<results.length;i++)
				{
					lat.push(results[i].lat);
					lng.push(results[i].lng);
					loc.push(results[i].sensor_location);
				id.push(results[i].sensor_id);
					
				}
			console.log(results);
			if (results.length > 0) 
            {
				
                console.log("valid latitude and Longitude for users");
               
                
               
                res.render('UserMaps' , {lat:lat,lng:lng,loc:loc,id:id});
            }
            else 
            {
              
            	res.render('temp');
            }
		}  
	},getUser);

	//res.render('UserMaps');
};