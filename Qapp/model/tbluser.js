var mysql = require('mysql');
var connection = require('../config/database');
var connect = mysql.createConnection(connection.dbconfig);
//===================================== connection ===============================
	connect.connect(function(err){
	if(!err)
	console.log("done connection");
	else
	console.log("error in connection");
	});

//===================================== new register ==============================

  exports.registerNew  = function(email,mobile,password,date,random,callback) {
		connect.query('select * from user where email="'+ email +'"',function(err, rows){
						if(err)
						{
							callback(err,null);
						}
						else if(rows.length)
						{
							callback(null, false);
						}
						else
						{
							connect.query('CALL user_register("'+ email +'","'+ mobile +'","'+ password +'","'+ date +'","'+ random +'")',function(err, data){
		                  if(!err)
		                  {
		                    callback(null, data);
		                  }
		                  else
		                  {
		                    callback(err,null);
		                  }
		          });
						}
		});
  }
//======================================== Change email ===============================
	exports.changeEmail  = function(email,callback) {
		connect.query('select * from user where email="'+ email +'"',function(err, rows ){
						if(err)
						{
							callback(err,null);
						}
						if(rows.length)
						{
							callback(null, false);
						}
						else
						{
							connect.query('UPDATE user SET email="'+ email +'" WHERE',function(err, data){
		                  if(!err)
		                  {
		                    callback(null, data);
		                  }
		                  else
		                  {
		                    callback(err,null);
		                  }
		          });
						}
		});
  }
// ============================================ Signin ==================================
	exports.signin  = function(email,password,callback) {
					connect.query('select userid,Email,Password from user where Email="'+ email +'"and Password="'+ password +'"',function(err, data){
									if(!err)
									{
													if(data.length > 0)
													{
															callback(null, data[0].userid);
													}
													else
													{
																callback(null, false);
													}

									}
									else
									{
										callback(err,null);
									}
					});
	}
// ============================================ Forgot password ==================================
		exports.signin  = function(email,callback) {
						connect.query('select userid,Email from user where Email="'+ email +'"',function(err, data){
										if(!err)
										{
														if(data.length > 0)
														{
																callback(null, data[0].Email);
														}
														else
														{
																	callback(null, false);
														}

										}
										else
										{
													callback(err,null);
										}
						});
		}
// ============================================== resend =============================================
exports.resend  = function(email,callback) {
				connect.query('select userid,Email from user where Email="'+ email +'"',function(err, data){
								if(!err)
								{
												if(data.length > 0)
												{
														callback(null, data[0].Email);
												}
												else
												{
															callback(null, false);
												}

								}
								else
								{
											callback(err,null);
								}
				});
}
