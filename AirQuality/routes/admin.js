var mysql = require('./mysql');

var session = require('client-sessions');

var ejs = require("ejs");

exports.ShowAdminLogin = function(req, res){
  res.render('Admin_Login');
};

exports.ShowAdminLogOutPage=function(req, res){
	  res.render('Admin_LogOut');
	};
exports.checkAdminDetails=function(req,res){
	res.render('Admin_Dashboard');
};

exports.showAdminDashboard=function(req,res){
	res.render('Admin_Dashboard');
};

exports.showAdminVendorOverview=function(req,res){
	var getUser = "SELECT vendor_name , sensor_vendor_id, count(sensor_vendor_id)  as noOfSensors from vendor_sensor JOIN vendor  on vendor_id=sensor_vendor_id group by sensor_vendor_id";
	var getUser1 = "select vendor_id , sum(bill_amount) as bill from sensor_user group by vendor_id";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = 'Admin_VendorOverview.ejs';
			mysql.fetchData(function(err,results1){
				if(err)
				{			
					console.error(err.errorno);
				
					return;
			}
				else{
					console.log(results1[0].sensor_id);
					var hi = 'Admin_VendorOverview.ejs';
					ejs.renderFile('./views/'+hi,{data:results,data1:results1},function(err,result1){
						if(!err)
						{
							console.log(result1);
							res.end(result1);
						}
					else
						{
						res.end('An error occured');
						console.log(err.errorno);
						}
					});
				}	
			},getUser1);
			/*
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
			});*/
		}	
	},getUser);
	
	
	//res.render('Admin_VendorOverview');
};

exports.showAdminSensorOverview=function(req,res){
var getUser="SELECT sensor_id,sensor_reading as totalquery FROM team_project_281.vendor_sensor where sensor_id is not null group by sensor_id order by totalquery";
	
	mysql.fetchData(function(err,results){
		
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'Admin_SensorOverview.ejs';
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
	//res.render('Admin_SensorOverview');
};

exports.showAdminBillingOverview=function(req,res){
	var getUser = "SELECT sensor_id,sensor_reading as totalquery FROM team_project_281.vendor_sensor where sensor_id is not null group by sensor_id order by totalquery";
	var getUser1 = "select vendor_id , sum(bill_amount) as bill from sensor_user group by vendor_id";
	var getUser2="SELECT user_id,bill_amount as totalquery,username,ViewCount FROM team_project_281.sensor_user";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			console.log(results[0].sensor_id);
			var hi = 'Admin_BillingOverview.ejs';
			mysql.fetchData(function(err,results1){
				if(err)
				{			
					console.error(err.errorno);
				
					return;
			}
				else{
					mysql.fetchData(function(err,results2){
						if(err)
						{			
							console.error(err.errorno);
						
							return;
					}
						else{
							console.log(results1[0].sensor_id);
							var hi = 'Admin_BillingOverview.ejs';
							ejs.renderFile('./views/'+hi,{data:results,data1:results1,data2:results2},function(err,result2){
								if(!err)
								{
									console.log(result2);
									res.end(result2);
								}
							else
								{
								res.end('An error occured');
								console.log(err.errorno);
								}
							});
						}	
					},getUser2);
					
				}	
			},getUser1);
			
		}	
	},getUser);
	
	
	//res.render('Admin_BillingOverview');
};
