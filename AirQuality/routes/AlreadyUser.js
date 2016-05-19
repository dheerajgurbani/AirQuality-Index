/**
 * http://usejsdoc.org/
 */
//var mysql = require("mysql");

var mysql = require('./mysql');

var session = require('client-sessions');

var ejs = require("ejs");
//var mysql = require('./mysql');
var crypto = require("crypto");
exports.signupcomplete = function(req, res) {
	
	var usertype = req.body.selectpicker;
	var first = req.param("first_name");
	var last = req.param("last_name");
	//var usertype = req.param("selectpicker.value");

	var location = req.param("location");
	var email = req.param("email");
	var pwd = req.param("password");
	
	console.log(usertype);
	//conn.connect();
	
	var getUser = "insert into team_project_281.vendor values" + " ( null,'" + first + "','" + last + "','" + usertype + "','" + location + "','" + email + "','" + pwd + "')";
	
	mysql.fetchData(function(err,result){
		//console.log(insertquery.sql);
		if (err) {
			console.error(err);
			return;
		}
		res.render('vendorSignIn');

	},getUser);
	
	

};

exports.vendorAlreadyUser = function(req,res){
	res.render('vendorSignIn');
};

/*exports.vendorsignin = function(req,res){
	
	var mysql = require("mysql");
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'mobilesensorclouddb1',
		port : 3306
	});
	conn.connect();
	var email = req.param("email");
	var pwd = req.param("password");
	var page1;
	var usertype=req.param('usertype'); 
	var email  ;
	if(usertype=='admin')
		page1='admin.ejs';
	
	else if(usertype=='user')
		page1='user.ejs';
	else
		
		//page1='vendor_homepage.ejs';
		page1='VendorAddSensor.ejs';
		var selectquery=conn.query("SELECT COUNT(vendor_email) AS count from vendor where vendor_email= '"+email+"' and vendor_password='"+pwd+"'",function(err,results){
		
		console.log(selectquery.sql);	
		if(err)
		{			
			console.error(err);
			
			return;
	}
		else{
			//console.log(results);
				if(results[0].count>=0)
				{
					console.log("sbdhjbsjcbjwcjknnnsd cn");
					res.render('googleMaps');
					console.log(results);
					//console.log("11111111111111111111111sbdhjbsjcbjwcjknnnsd cn");
					res.end(results);
				}
			else
				{
				res.render('temp');
				console.log(results[0].count);
				console.log(err);
				
				return;
				}
			
		}
				
		});
	
};*/

exports.vendorHome = function (req,res) {
	
	res.render('VendorHome');
};

exports.VendorRegister = function (req,res) {
	
	res.render('vendorSignUp');
};

exports.vendorDetails = function (req,res) {
	var vendorprofile='vendor_homepage.ejs';
	var getuser = "Select * from  mobilesensorclouddb1.userinformation where email= '"+email+"' and password='"+pwd+"'";
	mysql.fetchData(function(err,results){
	
		if(err)
		{			
			console.error(err);
			console.log(abc);
			return;
	}
		else{
			ejs.renderFile('./views/'+vendorprofile,{data:results},function(err,result){
				if(!err)
				{
					console.log("sbdhjbsjcbjwcjknnnsd cn");
					console.log(results);
					//console.log("11111111111111111111111sbdhjbsjcbjwcjknnnsd cn");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err);
				}
			});
		}
				
	},getuser);
};

/*exports.vendorDetails = function (req,res) {
	
//	conn.connect();
	var email = req.param("email");
	var pwd = req.param("password");
	
	//var usertype=req.param('usertype'); 
	//var email;
	
		
		//page1='vendor_homepage.ejs';
		var vendorprofile='vendor_homepage.ejs';
		var insertquery=conn.query("Select * from  mobilesensorclouddb1.userinformation where email= '"+email+"' and password='"+pwd+"'",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err);
			console.log(abc);
			return;
	}
		else{
			ejs.renderFile('./views/'+vendorprofile,{data:results},function(err,result){
				if(!err)
				{
					console.log("sbdhjbsjcbjwcjknnnsd cn");
					console.log(results);
					//console.log("11111111111111111111111sbdhjbsjcbjwcjknnnsd cn");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err);
				}
			});
		}
				
		});

};*/

exports.vendorMySensor = function (req,res) {
	console.log("list2");
	var getuser = "select * from team_project_281.vendor_sensor ";
	mysql.fetchData(function(err,results){
		if(err)
			console.error(err);
		
		else
	//console.log(result);
			

	var lat=[];
	var lng=[];
	var loc=[];
	var id=[];
	for(var i=0;i<result.length;i++)
		{
			lat.push(result[i].lat);
			lng.push(result[i].lng);
			loc.push(result[i].sensor_location);
		id.push(result[i].sensor_id);
			
		}
	//console.error(id);
  res.render('vendorMySensor',{lat:lat,lng:lng,loc:loc,id:id});
	},getuser);
};


/*exports.vendorMySensor = function (req,res) {
	console.log("list2");
	var q=conn.query("select * from team_project_281.vendor_sensor ",function(err,result){
		console.log(q.sql);	
		if(err)
			console.error(err);
		
		else
	//console.log(result);
			

	var lat=[];
	var lng=[];
	var loc=[];
	var id=[];
	for(var i=0;i<result.length;i++)
		{
			lat.push(result[i].lat);
			lng.push(result[i].lng);
			loc.push(result[i].sensor_location);
		id.push(result[i].sensor_id);
			
		}
	//console.error(id);
  res.render('vendorMySensor',{lat:lat,lng:lng,loc:loc,id:id});			
	});
};*/


exports.list = function(req, res){
	console.log("succsdec");
	var x=req.param("sensor_location");
	//console.log(req.body.x);
	console.log("kjhdjk"+x);

	var getUser = "insert into team_project_281.vendor_sensor values (null,'"+req.param("sensor_location")+"','"+req.param("sensor_date")+"','"+req.param("sensor_start")+"','"+req.param("sensor_end")+"','"+req.param("sensor_duration")+"','"+req.param("sensor_active")+"','"+req.param("sensor_vendor_id")+"','"+req.param("sensor_reading")+"','"+req.param("sensor_type")+"','"+req.param("lat")+"','"+req.param("lng")+"')";
	mysql.fetchData(function(err,results){
		
		if(err)
			console.error(err);
	
	else
	console.log("succesffully inserted sensor details in vendor_sensor table");
		
	},getUser);
	
		
		
		
		};
		
		

/*exports.list = function(req, res){
	console.log("succsdec");
	var x=req.param("sensor_location");
	//console.log(req.body.x);
	console.log("kjhdjk"+x);


var q=conn.query("insert into team_project_281.vendor_sensor values (null,'"+req.param("sensor_location")+"','"+req.param("sensor_date")+"','"+req.param("sensor_start")+"','"+req.param("sensor_end")+"','"+req.param("sensor_duration")+"','"+req.param("sensor_active")+"','"+req.param("sensor_vendor_id")+"','"+req.param("sensor_reading")+"','"+req.param("sensor_type")+"','"+req.param("lat")+"','"+req.param("lng")+"')",function(err,result){
		console.log(q.sql);	
		if(err)
				console.error(err);
		
		else
		console.log("succesffully inserted sensor details in vendor_sensor table");
			
});
		
		
		};*/
		
		
		
		
exports.vendorsignin =	function(req,res)
		{
		
			console.log("Inside the afterSignIn function");
			//var decipher = crypto.createDecipher('aes-256-ctr', 'd6F3Efeqwerty')
			//var hash = decipher.update(req.param("password"),'utf8','hex')
			//hash += decipher.final('hex');
			var pwd = req.param("password");
			// check user already exists
			console.log(req.param("email")+""+pwd);
			var getUser="select * from team_project_281.vendor where vendor_email='"+req.param("email")+"' and vendor_password='" + pwd +"'";
			console.log("Query is:"+getUser);
			
			mysql.fetchData(function(err,results){
				if(err){
					//res.render(temp);
					throw err;
				}
				else 
				{
					console.log(results);
					if (results.length > 0) 
		            {
						//req.session.Email=req.param("inputEmail");
		                console.log("valid Login");
		                //json_responses = {"statusCode": 200};
		                //res.send(json_responses);
		                console.log(results[0].vendor_id);
		                req.session.vendorID = results[0].vendor_id;
		                
		                console.log("sessionsss implemented"+req.session.vendorID);
		                
		                res.render('googleMaps',{vendorId : req.session.vendorID});
		            }
		            else 
		            {
		                //json_responses = {"statusCode": 401};
		                //res.send(json_responses);
		            	res.render('temp');
		            }
				}  
			},getUser);
		};
		
exports.hiechart = function(req,res) {
	
	var getUser="SELECT sensor_id,sensor_reading as totalquery FROM team_project_281.vendor_sensor where sensor_id is not null group by sensor_id order by totalquery desc";
	
	mysql.fetchData(function(err,results){
		
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'hieChart.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
		
	},getUser);
};
		
		
		
		/*exports.hiechart = function(req,res) {
			var conn = mysql.createConnection({
				host : 'localhost',
				user : 'root',
				password : '',
				database : 'team_project_281',
				port : 3306
			});
			conn.connect();
			
			
			
			var insertquery=conn.query("SELECT sensor_id,sensor_reading as totalquery FROM team_project_281.vendor_sensor where sensor_id is not null group by sensor_id order by totalquery desc",function(err,results){
				console.log(insertquery.sql);	
				if(err)
				{			
					console.error(err.errorno);
				
					return;
			}
				else{
					var hi = 'hieChart.ejs';
					ejs.renderFile('./views/'+hi,{data:results},function(err,result){
						if(!err)
						{
							console.log("abc");
							res.end(result);
						}
					else
						{
						res.end('An error occured');
						console.log(err.errorno);
						}
					});
				}
						
				});
			conn.end();
			
		};*/

exports.morrisgraph = function (req,res) {
	res.render('morris');
};


exports.button = function (req,res) {
	res.render('postbutton');
};

exports.morrisDatabase = function(req,res) {
	var getUser="SELECT user_id,bill_amount as totalquery,username,ViewCount FROM team_project_281.sensor_user";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'Graph.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		},getUser);

	};

/*exports.morrisDatabase = function(req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'team_project_281',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT user_id,bill_amount as totalquery,username,ViewCount FROM team_project_281.sensor_user",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'Graph.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};*/

	exports.viewCount = function(req,res) {
		
		var getUser = "SELECT ViewCount,username as totalquery FROM team_project_281.sensor_user";
		mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'morris.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
		},getUser);		
	};
		
		
		

/*exports.viewCount = function(req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'team_project_281',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT ViewCount,username as totalquery FROM team_project_281.sensor_user",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'morris.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};*/
	
exports.hiechar2 = function(req,res){
	
var getUser = "SELECT * from sensor_user where vendor_id=1";

mysql.fetchData(function(err,results){
	if(err)
	{			
		console.error(err.errorno);
	
		return;
}
	else{
		var hi = 'hiechart2.ejs';
		ejs.renderFile('./views/'+hi,{data:results},function(err,result){
			if(!err)
			{
				console.log("abc");
				res.end(result);
			}
		else
			{
			res.end('An error occured');
			console.log(err.errorno);
			}
		});
	}
},getUser);
};
		

/*exports.hiechar2 = function(req,res){
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'team_project_281',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT * from sensor_user where vendor_id=1",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'hiechart2.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};*/

exports.vendor_sensor_viewcount = function(req,res) {
	var getUser ="select * from sensor_user where vendor_id=1";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = 'vendor_sensor_viewcount.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
	},getUser);
};

/*exports.vendor_sensor_viewcount = function(req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'team_project_281',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("select * from sensor_user where vendor_id=1",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = 'vendor_sensor_viewcount.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};
*/

exports.AdminSensor = function(req,res) {
	var getUser = "select * from sensor_user";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = '3d.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}	
	},getUser);
};


/*exports.AdminSensor = function(req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'team_project_281',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("select * from sensor_user",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = '3d.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};*/

exports.getvalue = function(req,res) {
	var a = req.param("Type");
	console.log(a);
};

exports.Admin_vendor = function(req,res) {
	var getUser = "SELECT vendor_name , sensor_vendor_id, count(sensor_vendor_id)  as noOfSensors from vendor_sensor JOIN vendor  on vendor_id=sensor_vendor_id group by sensor_vendor_id";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = 'Admin_Vendor.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
	},getUser);
};



exports.vendor_revenue = function(req,res) {
	var getUser = "select vendor_id , sum(bill_amount) as bill from sensor_user group by vendor_id";
		mysql.fetchData(function(err,results){
			if(err)
			{			
				console.error(err.errorno);
			
				return;
		}
			else{
				console.log(results[0].sensor_id);
				var hi = 'vendor_revenue.ejs';
				ejs.renderFile('./views/'+hi,{data:results},function(err,result){
					if(!err)
					{
						console.log(result);
						res.end(result);
					}
				else
					{
					res.end('An error occured');
					console.log(err.errorno);
					}
				});
			}	
		},getUser);
	};


exports.vendor_sensors = function(req,res) {
var getUser = "SELECT vendor_name , sensor_vendor_id, count(sensor_vendor_id)  as noOfSensors from vendor_sensor JOIN vendor  on vendor_id=sensor_vendor_id group by sensor_vendor_id";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = 'vendor_sensors.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}	
	},getUser);
};

exports.frontpage = function(req,res) {
	res.render('index');
}