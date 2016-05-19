/**
 * New node file
 */
var m=require("mysql");

var c=m.createConnection({

	host: 'localhost',

	user: 'root',

	password: '',

//socketPath : '/tmp/mysql.sock',

	port:3306,

	database: 'team_project_281',

	multipleStatements: true

	});

	var r;

			c.connect();



exports.viewBill = function(req, res){
							var lat1
							var lng=0;
							console.log("laylong");
							
							var q=c.query("update team_project_281.sensor_user set bill_amount=sensor_duration*0.1+ViewCount*2 where sensor_id='"+req.param("sensor_id")+"'and user_id='"+req.session.user_id+"'",function(err,result){
								console.log(q.sql);	
									if(err)
								console.error(err);
								else
									
									{
							console.log("update bill anmt");
									}
							});
							
							var q1=c.query("select * from team_project_281.sensor_user where sensor_id='"+req.param("sensor_id")+"' and user_id='"+req.session.user_id+"' ",function(err,result){
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
								
					};
					
					exports.deleteSensor=function(req,res){

						var q=c.query("delete from team_project_281.vendor_sensor where sensor_id='"+req.param("e1")+"' and sensor_vendor_id='"+req.session.vendorID+"'",function(err,result){
						console.log(q.sql);	

						if(err)
						console.error(err);
						else
						console.log("delet updated");
						});




						};
						
						

						
						exports.updateEndTime = function(req, res){
							console.log("updateEndTime");
							var x=req.param("sensor_id");
							var x1=req.param("sensor_status");
							console.log(x1+"sensor ka staus kya hai")
							var r=0;
							if(x1==true)
								r=1;
													//console.log(req.body.x);
							console.log("kjhdjk"+x);

													
							var q=c.query("update team_project_281.sensor_user  set sensor_end_time=CURRENT_TIMESTAMP,sensor_status='"+r+"' where sensor_id='"+x+"'and user_id='"+req.session.user_id+"'",function(err,result){
							console.log(q.sql);	
								if(err)
							console.error(err);
							else
								
								
						console.log("4rr");
								
							
									
								
								
								});
							
							var q1=c.query(" UPDATE  team_project_281.sensor_user SET sensor_duration= unix_timestamp(sensor_end_time)- unix_timestamp(sensor_start_time) where sensor_id='"+x+"' and user_id='"+req.session.user_id+"'",function(err1,result1){
							console.log(q1.sql);	
								if(err1)
							console.error(err1);
							else
								
								
						console.log("4rr");
								
							
									
								
								
								});
							
							
								};