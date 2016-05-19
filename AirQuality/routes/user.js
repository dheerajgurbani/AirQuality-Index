var mysql = require('./mysql');

var session = require('client-sessions');


var ejs = require("ejs");
exports.ShowUserLogin = function(req, res){
  res.render('User_Login');
};

exports.ShowUserLogOutPage=function(req, res){
	req.session.destroy();
	
	  res.render('User_LogOut');
	};
exports.ShowUserSignUp=function(req,res){
	res.render('User_SignUp');
};

exports.RegisterUserDetails = function(req,res) {
	var first = req.param("user_firstname");
	var last = req.param("user_lastname");
	var phone = req.param("phone");
	var email = req.param("username");
	var pwd = req.param("password");
	var getUser = "insert into team_project_281.myAqiuser values" + " ( null,'" + email + "','" + pwd + "','" + phone + "','" + first + "','" + last + "')";
	mysql.fetchData(function(err,result){
		//console.log(insertquery.sql);
		if (err) {
			console.error(err);
			return;
		}
		res.render('User_Login');

	},getUser);

};



exports.showUserDashboard=function(req,res){
	var getUser="select * from team_project_281.myAqiuser where user_id='"+req.session.user_id+"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			//res.render(temp);
			throw err;
		}
		else 
		{
			console.log(results);
			res.render('User_Dashboard',{data:results , username : req.session.username});
		}  
	},getUser);

		//res.render('User_Dashboard');
};

exports.showUserAirQualityOverview=function(req,res){
	var getUser = "select * from team_project_281.vendor_sensor";
	
	mysql.fetchData(function(err,result){
		//console.log(insertquery.sql);
		if(err)
			console.error(err);
		
		else
	//console.log(result);
			

	var lat=[];
	var lng=[];
	var loc=[];
	var id=[];
	var readings=[];
	for(var i=0;i<result.length;i++)
		{
			lat.push(result[i].lat);
			lng.push(result[i].lng);
			loc.push(result[i].sensor_location);
		id.push(result[i].sensor_id);
		readings.push(result[i].sensor_reading);
			
		}
	//console.error(id);
  res.render('User_AirQualityOverview',{lat:lat,lng:lng,loc:loc,id:id,readings:readings});			

	},getUser);
};

exports.showUserSubscriptions=function(req,res){
	var getUser="select * from team_project_281.sensor_user";
	mysql.fetchData(function(err,results){
		if(err)
			console.error(err);
		
		else
	//console.log("dg"+result);
			

	var id=[];
	var b=[];
	var c=[];
	var type=[];
	var duartion=[];
	var location=[];
	var readings=[];
	var sensor_status=[];
	
	
	for(var i=0;i<results.length;i++)
		{
			id.push(results[i].sensor_id);
			b.push(results[i].bill_amount);
			c.push(results[i].ViewCount);
		type.push(results[i].sensor_type);
		location.push(results[i].sensor_location);
		readings.push(results[i].sensor_aqi);
		sensor_status.push(results[i].sensor_status);
		
			
		}
	console.log("readings:"+readings);
	console.error(id);
  res.render('User_Subscriptions',{id:id,b:b,c:c,type:type,location:location,readings:readings,st:sensor_status}); 
	},getUser);
	
};

exports.latlong=function(req,res){
	var getUser="select * from team_project_281.vendor_sensor where sensor_id='"+req.param("sensor_id")+"'";
	mysql.fetchData(function(err,results){
		if(err)
			console.error(err);
		
		else
			{
			lat1=results[0].lat;
			 lng=results[0].lng;
			console.log("lat1:"+lat1+" long:"+lng);
	res.send({"result":results,"lat1":lat1,"long1":lng});
	
	}

	},getUser);
	
};


/*exports.viewBill=function(req,res){
	var lat1
	var lng=0;
	console.log("laylong");
	var getUser = "update team_project_281.sensor_user set bill_amount=sensor_duration*0.1+ViewCount*2 where sensor_id='"+req.param("sensor_id")+"'and user_id='"+req.session.user_id+"'";
	var getUser1 = "select * from team_project_281.sensor_user where sensor_id='"+req.param("sensor_id")+"' and user_id='"+req.session.user_id+"'";
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			//console.log(results[0].sensor_id);
			var hi = 'Admin_VendorOverview.ejs';
			mysql.fetchData(function(err,results1){
				if(err)
				{			
					console.error(err.errorno);
				
					return;
			}
				else{
					//console.log(results1[0].sensor_id);
					var hi = 'Admin_VendorOverview.ejs';
					ejs.renderFile('./views/'+hi,{"result":results1,"bill_amount1":results1[0].bill_amount,"sensor_duration1":results1[0].sensor_duration},function(err,result1){
						if(!err)
						{
							//console.log(result1);
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
			
		}	
	},getUser);
	
	
};*/

/*exports.viewBill = function(req, res){
	var lat1
	var lng=0;
	console.log("laylong");
	
	var q=c.query("update team_project_281.sensor_user set bill_amount=sensor_duration*0.1+ViewCount*2 where sensor_id='"+req.param("sensor_id")+"'and user_id=1",function(err,result){
		console.log(q.sql);	
			if(err)
		console.error(err);
		else
			
			{
	console.log("update bill anmt");
			}
	});
	
	var q1=c.query("select * from team_project_281.sensor_user where sensor_id='"+req.param("sensor_id")+"' and user_id=1 ",function(err,result){
		console.log(q1.sql);	
			if(err)
		console.error(err);
		else
			
			{
			console.log(result);
	console.log("select bill anmt");
	console.log("bill_amount1:"+result[0].bill_amount)
	res.send({"result":result,"bill_amount1":result[0].bill_amount,"sensor_duration1":result[0].sensor_duration});
	
		
			}	
			
			
			});
		
};*/

exports.ShowBill=function(req,res){
	var lat1
	var lng=0;
	console.log("laylong");
	var getUser="update team_project_281.sensor_user set bill_amount=sensor_duration*0.1+ViewCount*2 where sensor_id='"+req.param("sensor_id")+"'and user_id='"+req.session.user_id+"'";
	mysql.fetchData(function(err,results){
		if(err)
		console.error(err);

else 
	console.log(results);
	},getUser);
	
};

/*exports.updateEndTime=function(req,res){
	console.log("updateEndTime");
	var x=req.param("sensor_id");
	var x1=req.param("sensor_status");
	console.log(x1+"sensor ka staus kya hai")
	var r=0;
	if(x1==true)
		r=1;
							//console.log(req.body.x);
	console.log("kjhdjk"+x);
	var getUser="update team_project_281.sensor_user  set sensor_end_time=CURRENT_TIMESTAMP,sensor_status='"+r+"' where sensor_id='"+x+"'and user_id='"+req.session.user_id+"'";
	mysql.fetchData(function(err,results){
			
		if(err)
	console.error(err);
	else
		
		
console.log("4rr");
		
	},getUser);
	
};
*/

exports.showUserBillingOverview=function(req,res){
	res.render('User_BillingOverview');
};

exports.checkUserDetails=function(req,res){
	console.log("Inside the checkUserDetails function");
	var pwd = req.param("password");
	console.log(req.param("email")+""+pwd);
	var getUser="select * from team_project_281.myAqiuser where username='"+req.param("email")+"' and password='" + pwd +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			
			throw err;
		}
		else 
		{
			console.log(results);
			if (results.length > 0) 
            {
				console.log("valid Login");
               console.log(results[0].user_id);
                req.session.user_id = results[0].user_id;
                req.session.username = results[0].user_firstname;
                
                console.log("sessionsss implemented for user and User id is "+req.session.user_id);
                
                res.render('User_Dashboard',{userId : req.session.user_id,data:results});
            }
            else 
            {
                
            	res.render('temp');
            }
		}  
	},getUser);

	//res.render('User_Dashboard');
};

exports.refreshData=function(req,res){
	
	var getUser="update  team_project_281.sensor_user set sensor_aqi='"+req.param("breezometer_aqi")+"',ViewCount=ViewCount+1 where sensor_id='"+req.param("sensor_id")+"'";
	mysql.fetchData(function(err,results){
		if(err)
			console.error(err);
	
	else
		console.log(results);

		res.send({"status":"OK"});

	},getUser);
	
};

exports.list12=function(req,res){
	console.log("list12");
	var x=req.param("sensor_location");
	
	console.log("kjhdjk"+x);
	var getUser="insert into team_project_281.sensor_user values ('"+req.session.user_id+"','"+req.session.username+"','"+req.param("sensor_id")+"','"+req.param("bill_amount")+"','"+req.param("ViewCount")+"','"+req.param("vendor_id")+"','"+req.param("sensor_type")+"',CURRENT_TIMESTAMP,'"+req.param("sensor_end_time")+"','"+req.param("sensor_duration")+"','"+req.param("sensor_location")+"','"+req.param("sensor_aqi")+"',1)";
	mysql.fetchData(function(err,results){
		if(err)
			console.error(err);
			else
		console.log("4rr");

	},getUser);
	
};

