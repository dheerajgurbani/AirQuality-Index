/**
 * New node file
 */
var ejs= require('ejs');
var mysql = require('mysql');

//var pool = require('./pool');


function fetchData(callback, sqlQuery){
	
	console.log("\nSqlquery:: "+ sqlQuery );
	var connection = mysql.createConnection({
		host : 'ec2-54-200-218-121.us-west-2.compute.amazonaws.com',
		user : 'dheeraj',
		password : 'root',
		database : 'team_project_281',
		port : 3306
	});
	
		connection.query(sqlQuery, function(err, rows, fields){
			if(err){
				console.log("ERROR: " + err.message);
			}
			else{
			//	console.log("DB Results:"+"hellllloooooo");   
				callback(err, rows);
			}
		});
		//pool.releaseConnection(connection);
	
}


exports.fetchData = fetchData;