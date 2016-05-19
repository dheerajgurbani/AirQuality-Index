var mysql = require('./mysql');

var session = require('client-sessions');

var sessionid;


var vendorname;

var ejs = require("ejs");

exports.ShowVendorLogin = function(req, res){
  res.render('Vendor_Login');
};

exports.vendorSignUp = function(req,res){
	//var usertype = req.body.selectpicker;
	var first = req.param("first_name");
	var last = req.param("last_name");
	//var usertype = req.param("selectpicker.value");

	var location = req.param("location");
	var email = req.param("email");
	var pwd = req.param("password");
	
	//console.log(usertype);
	//conn.connect();
	
	var getUser = "insert into team_project_281.vendor values" + " ( null,'" + first + "','" + last + "','" + location + "','" + email + "','" + pwd + "')";
	
	mysql.fetchData(function(err,result){
		//console.log(insertquery.sql);
		if (err) {
			console.error(err);
			return;
		}
		res.render('Vendor_Login');

	},getUser);
	
	

};

exports.ShowVendorSignUp=function(req,res){
	res.render('Vendor_SignUp');
};

exports.showVendorDashboard= function(req, res){
	var getUser="select * from team_project_281.vendor where vendor_id='"+req.session.vendorID+"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			//res.render(temp);
			throw err;
		}
		else 
		{
			console.log(results);
			res.render('Vendor_Dashboard',{data:results , vendorId : req.session.vendorID , vendorname : req.session.vendorname});
		}  
	},getUser);
	//	res.render('Vendor_Dashboard' , {vendorname : req.session.vendorname});

  
};
exports.showVendorMySensors= function(req, res){
	var getUser = "select * from team_project_281.vendor_sensor where sensor_vendor_id='"+req.session.vendorID+"'";
	
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
  res.render('Vendor_MySensors',{lat:lat,lng:lng,loc:loc,id:id,readings:readings,vendorname:vendorname});			


	},getUser);
	
};


exports.showVendorAddSensor= function(req, res){

 res.render('Vendor_AddSensor',{vendorname:vendorname});
};


exports.VendorAddingSensors = function(req,res) {
	var getUser = "insert into team_project_281.vendor_sensor values (null,'"+req.param("sensor_location")+"','"+req.param("sensor_date")+"',CURRENT_TIMESTAMP,'"+req.param("sensor_end")+"','"+req.param("sensor_duration")+"','"+req.param("sensor_active")+"','"+req.session.vendorID+"','"+req.param("sensor_reading")+"','"+req.param("sensor_type")+"','"+req.param("lat")+"','"+req.param("lng")+"')";
	
	mysql.fetchData(function(err,results){
		if(err)
		{			
			console.error(err.errorno);
			console.log('Sensor Not added');
			return;
	}
		else{
			console.log('sensor added');
		}
	},getUser);
		
				
		

};

exports.showVendorRemoveSensor= function(req, res){
  res.render('Vendor_RemoveSensor',{vendorname:vendorname});
};

exports.showVendorRevenueOverview= function(req, res){
	var getUser="select * from team_project_281.sensor_user where vendor_id='"+req.session.vendorID+"'";
	
	mysql.fetchData(function(err,results){
		
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'Vendor_RevenueOverview.ejs';
			res.render("Vendor_RevenueOverview",{data:results,vendorname : vendorname} );
			
		}
		
	},getUser);


	//res.render('Vendor_RevenueOverview',{vendorname:vendorname});
};

exports.checkVendorDetails=function(req,res){

	console.log("Inside the checkVendorDetails function");
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
				
                console.log("valid Login");
               
                console.log(results[0].vendor_id);
                sessionid = req.session.vendorID;
                console.log(sessionid+"Here is your session id in global variable");
                req.session.vendorID = results[0].vendor_id;
                req.session.vendorname = results[0].vendor_name;
                vendorname = req.session.vendorname;
                
                console.log("sessionsss implemented"+req.session.vendorID);
                
                res.render('Vendor_Dashboard',{data:results , vendorId : req.session.vendorID , vendorname : req.session.vendorname});
            }
            else 
            {
                
            	res.render('temp');
            }
		}  
	},getUser);

	//res.render('Vendor_Dashboard');
};

exports.ShowVendorLogOutPage=function(req, res){
	
	req.session.destroy();
	  res.render('Vendor_LogOut');
	};
	
	
exports.vendortable = function(req,res) {
	console.log("sessionsss implemented"+req.session.vendorID);
var getUser="select * from team_project_281.vendor where vendor_id=1";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			//res.render(temp);
			throw err;
		}
		else 
		{
			console.log(results);
			res.render('table',{data:results});
		}  
	},getUser);
	
	
};