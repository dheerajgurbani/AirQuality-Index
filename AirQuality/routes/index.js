
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('AQI_Welcome');
};


exports.ShowLoginPage=function(req, res){
  res.render('LoginMain');
};


	
exports.ShowAboutUsPage=function(req, res){
		  res.render('AQI_AboutUs');
		};