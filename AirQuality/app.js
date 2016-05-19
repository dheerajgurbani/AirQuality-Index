
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'),
  session = require('client-sessions')
    , admin = require('./routes/admin')
  , vendor = require('./routes/vendor')
    , billing = require('./routes/billing');


var app = express();
var AlreadyUser = require('./routes/AlreadyUser');
var MyAqiUser = require('./routes/MyAQIUser');


app.use(session({   
	 
	cookieName: 'session',    
	secret: 'cmpe273_0107058_test_string',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/users', AlreadyUser.list);
app.get('/vendorHome', AlreadyUser.vendorHome);
app.get('/VendorRegister', AlreadyUser.VendorRegister);
app.get('/VendorSignIn', AlreadyUser.vendorsignin);
app.get('/vendorAlreadyUser',AlreadyUser.vendorAlreadyUser);
app.post('/AlreadyUser' , AlreadyUser.signupcomplete);
app.post('/VendorSignInComplete' , AlreadyUser.vendorsignin);
app.get('/mysensors', AlreadyUser.vendorMySensor);
//app.post('/getusers', user.list);
app.get('/UserLogin',MyAqiUser.UserMaps);
app.post('/hiechart',AlreadyUser.hiechart);
app.get('/morrisgraph',AlreadyUser.morrisgraph);
app.post('/morrisDatabase',AlreadyUser.morrisDatabase);
app.get('/postbutton' , AlreadyUser.button);
app.post('/viewCount' , AlreadyUser.viewCount);
app.get('/frontpage' , AlreadyUser.frontpage);


app.get('/hiechar2' , AlreadyUser.hiechar2);

app.post('/vendor_sensor_viewcount' , AlreadyUser.vendor_sensor_viewcount);

app.post('/AdminSensor' , AlreadyUser.AdminSensor);

app.get('/getvalue' , AlreadyUser.getvalue);

app.post('/Admin_vendor' , AlreadyUser.Admin_vendor);

app.post('/vendor_sensors' , AlreadyUser.vendor_sensors);

app.post('/vendor_revenue' , AlreadyUser.vendor_revenue);


// Integration Main

app.get('/LoginMain',routes.ShowLoginPage);

app.get('/AboutUs',routes.ShowAboutUsPage);



//Admin
app.get('/Admin_Login',admin.ShowAdminLogin);
app.get('/Admin_Dashboard',admin.showAdminDashboard);
app.get('/Admin_VendorOverview',admin.showAdminVendorOverview);
app.get('/Admin_SensorOverview',admin.showAdminSensorOverview);
app.get('/Admin_BillingOverview',admin.showAdminBillingOverview);
app.get('/AdminLogOut',admin.ShowAdminLogOutPage);

app.post('/Admin_CheckLogin',admin.checkAdminDetails);



//Vendor
app.get('/Vendor_Login',vendor.ShowVendorLogin);
app.get('/Vendor_SignUp',vendor.ShowVendorSignUp);
app.get('/Vendor_Dashboard',vendor.showVendorDashboard);
app.get('/Vendor_MySensors',vendor.showVendorMySensors);
app.get('/Vendor_AddSensor',vendor.showVendorAddSensor);
app.get('/Vendor_RemoveSensor',vendor.showVendorRemoveSensor);
app.get('/Vendor_RevenueOverview',vendor.showVendorRevenueOverview);
app.get('/VendorLogOut',vendor.ShowVendorLogOutPage);

app.post('/Vendor_SignUp',vendor.vendorSignUp);
app.post('/Vendor_CheckLogin',vendor.checkVendorDetails);

app.post('/vendorAddingSensors',vendor.VendorAddingSensors);


app.get('/vendortable' , vendor.vendortable);


//User
app.get('/User_Login',user.ShowUserLogin);
app.get('/User_SignUp',user.ShowUserSignUp);
app.get('/User_Dashboard',user.showUserDashboard);
app.get('/User_AirQualityOverview',user.showUserAirQualityOverview);
app.get('/User_Subscriptions',user.showUserSubscriptions);
app.get('/User_BillingOverview',user.showUserBillingOverview);
app.get('/UserLogOut',user.ShowUserLogOutPage);
app.post('/RegisterUserDetails' , user.RegisterUserDetails);

app.post('/User_CheckLogin',user.checkUserDetails);



app.post('/updateEndTime' , billing.updateEndTime);
app.post('/latlong' , user.latlong);
app.post('/ShowBill' , user.ShowBill);
app.get('/myAllSensors', user.showUserSubscriptions);
//app.post('/viewBill' , user.viewBill);
app.post('/refreshData', user.refreshData);

app.post('/addUserSensor',user.list12);


//billing
app.post('/viewBill',billing.viewBill);
app.post('/deleteSensor' , billing.deleteSensor);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
