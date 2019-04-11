var sass;
var userid;
var usertype;
var Domain = "localhost:5000"
module.exports = {
    logout : (req,res)=>{
        req.session.destroy();
         usertype ='undefined';
		 userid='undefined';
        res.render('index.ejs', {

            title: "Welcome to BSR | Home page",
            usertype: usertype
        });
    },
    gethomeuserpage: (req, res) => {
        saas = req.session;

        var userid = saas.userid;
        var usertype = saas.usertype;
        res.render('customer.ejs', {

            title: "Welcome to BSR | Home page",
            usertype: usertype
        });
    },
    officerhomepage: (req, res) => {
        saas = req.session;

        var userid = saas.userid;
        var usertype = saas.usertype;
         let getuser = "select u_id,u_name from userinfo where u_type=2";

                db.query(getuser, (err, userres) => {

                    res.render('officer.ejs', {

                        title: "Welcome to BSR Officer",
                        userdata: userres,
                        usertype: usertype,

                    });
                });
    },
    verifyuser: (req, res) => {
        saas = req.session;

        var userid = saas.userid;
        var usertype = saas.usertype;
        console.log('came');
        var username = req.body.username;

        var pass = req.body.password;
        let loginquery = "SELECT * FROM `userinfo` where u_name ='" + username + "' and u_pass= '" + pass + "' and u_type<>1";

        db.query(loginquery, (err, result) => {

            console.log("error " + err);
            if (err) {
                res.redirect('loginoff.ejs', {
                    message: "Userid or password Wrong",
                    usertype: usertype
                });
            }

            console.log("reuslt.length = " + result.length);
            if (result.length == 0) {

                message = "username or password worng";

                res.render('loginoff.ejs', {
                    message: message,
                    title: "Welcome to BSR ",
                    usertype: usertype

                });

            } else {

                saas = req.session;

                saas.userid = result[0].u_id;
                saas.usertype = result[0].u_type;
                var userid = saas.userid;
                var usertype = saas.usertype;
				
			if (usertype == 2){
					let userdataquery= "SELECT * from loaninfo where u_id='"+ userid +"' and is_active = 1";
					  db.query(userdataquery, (err, userdata) => {
						  
						  console.log(userdata);
					values=[];
					var d = new Date();
							
					 for ( input in userdata ){
								 
								 d1=userdata[input].install_date;
								 
								// var d1 = new Date(d);
								 console.log(d1+"here");
								 date_install = new Date(d1);
								 
								dformat = [(date_install.getFullYear()),
									date_install.getMonth() + 1, date_install.getDate()
										].join('-');
														 
										console.log(dformat + 'newdatae');														 
											
											dformat1 = [(d.getFullYear()),
												d.getMonth() + 1, "01"
													].join('-') + ' ' + ["09",
														"00",
														"00"
													].join(':');	
			
											//	console.log(userdata[input].loan_type);
												//console.log(dformat1);
												
										var dt1 = new Date(dformat1);
										var dt = new Date(dformat);
										console.log(dt);
								if(userdata[input].loan_type=='weekly'){
			
						timediff=Math.abs(dt1.getTime()-dt.getTime());
						var diffweek=(timediff/(1000*3600*24*7));
							var actualpayment=diffweek*userdata[input].payment_type;
							
							console.log('in weekly');
						 userdata[input]["actualpayment"] = actualpayment;
					
						//console.log(userdata);
						 
						//converted.push(userdata[input].install_date);
					 }
					 else if(userdata[input].loan_type=="daily") {
						
						timediff= Math.abs(dt1.getTime()- dt.getTime());
						console.log(timediff);
						
						var diffdays=(timediff/(1000*3600*24));
						//console.log(diffdays);
							var actualpayment=diffdays*userdata[input].payment_type;
							console.log(actualpayment);		
						
						 userdata[input]["actualpayment"] = actualpayment;
						// values.push(userdata[input].l_paied);
						//console.log(userdata);
					 }
                     else if(userdata[input].loan_type=="Monthly")
                     {
                        timediff=Math.abs(dt1.getTime()-dt.getTime());
                        var diffweek=(timediff/(1000*3600*24*31));
                            var actualpayment=diffweek*userdata[input].payment_type;
                            
                            
                         userdata[input]["actualpayment"] = actualpayment;
                        // values.push(userdata[input].l_paied);
                        ///console.log(userdata);
                         
                     }
					 else if(userdata[input].loan_type=="Fortnight")
					 {
					 	timediff=Math.abs(dt1.getTime()-dt.getTime());
						var diffweek=(timediff/(1000*3600*24*15));
							var actualpayment=diffweek*userdata[input].payment_type;
							
							
						 userdata[input]["actualpayment"] = actualpayment;
						// values.push(userdata[input].l_paied);
						///console.log(userdata);
						 
					 }
					 else {
					 console.log("something went worng");
					 
					 }
					  }
					  	  console.log(userdata);

                    res.render('customer.ejs', {

                        title: "Welcome to BSR  Customer",
                        usertype: usertype,
						userdata:userdata
						
						
                    });
					  });
				}	
            }
            if (usertype == 3) {
                let getuser = "select u_id,u_name from userinfo where u_type=2";

                db.query(getuser, (err, userres) => {

                    res.render('officer.ejs', {

                        title: "Welcome to BSR Officer",
                        userdata: userres,
                        usertype: usertype,

                    });
                });


            }


        });

    },

    addcollectionbyofficer: (req, res) => {

		saas = req.session;

        var collector_id = saas.userid;
        var usertype = saas.usertype;
        var userid = req.body.username;

        var money = parseInt(req.body.amount);
        var loan_title = req.body.loan_title;
        var laon_id = "";
       

		
if(money==null && loan_title== null && userid== null && userid== null){
		
                                    res.render('addcolleaction.ejs', {

                                        title: "add client| BSR admn portal",
                                        userdata: result,
                                        message: "please enter correct info",
										usertype
                                    });
			}
			else {

        let sle = "select loan_id from loaninfo where loan_title='" + loan_title + "' and u_id = '" + userid + "' and is_active = 1";

        db.query(sle, (err, getloanid) => {

            console.log(getloanid);
            laon_id = getloanid[0].loan_id;
		let colname= "select u_name from userinfo where u_id ='"+collector_id+"'";

			console.log(colname);
			 db.query(colname, (err, name) => {
				console.log(err);
				var collectername= name[0].u_name;
				
            let addcol = "insert into collaction (amount,customer_id,collector_id,col_name,loan_id) values ('" +
                money + "','" +
                userid + "','" + collector_id + "','" + collectername + "','" +
                laon_id + "')";

            db.query(addcol, (err, responsecol) => {
                console.log(err);
                if (responsecol) {

                    let getmoneyandpaid = "select l_remain, l_paied from loaninfo where loan_id='" + laon_id + "' ";
                    db.query(getmoneyandpaid, (err, getvalues) => {
                        console.log(err);
                        console.log(getvalues);
                        remain = parseInt(getvalues[0].l_remain);
                        paid = parseInt(getvalues[0].l_paied);
                       // console.log(remain);
                        //console.log(paid);
                        //console.log(money);
                        remain = remain - money;
                        paid = paid + money;
                        //console.log(remain);
                        //console.log(paid);
                        let updatelo = "UPDATE loaninfo set l_paied=" + paid + "  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";

                        db.query(updatelo, (err, updatecol) => {});

                        if (remain == 0) {
                            let is_inactive = "UPDATE loaninfo set is_active=0  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";
                            db.query(is_inactive, (err, updatecol) => {});

                            let is_active = "UPDATE loaninfo set is_complete=1  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";

                            db.query(is_active, (err, updatecol) => {});
                        }


                        let updateloan = "UPDATE loaninfo set l_remain=" + remain + "  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";

                        db.query(updateloan, (err, updatecol) => {
                            console.log(err);
                            if (updateloan) {

                                let checkuser = "select u_name,u_id from userinfo where u_type = 2";

                                db.query(checkuser, (err, result) => {



                                    res.render('officer.ejs', {

                                        title: "add client| BSR officer portal",
                                        userdata: result,
                                        message: "Collection Added",
										usertype
                                    });
                                });


                            } else {

                                let checkuser = "select u_name,u_id from userinfo where u_type = 2";

                                db.query(checkuser, (err, result) => {



                                    res.render('officer.ejs', {

                                        title: "add client| BSR admn portal",
                                        userdata: result,
                                        message: "something Wrong Try Agian",
                                    });
                                });
							
			


                            }
						
                        });
                    });
				}
                 else {
                    let checkuser = "select u_name,u_id from userinfo where u_type = 2";

                    db.query(checkuser, (err, result) => {

                        res.render('officer.ejs', {

                            title: "add client| BSR admn portal",
                            userdata: result,
                            message: "something Wrong Try Agian",
                        });
                    });


                }
			});

            });
        });
	}	
    },
    home: (req, res) => {
        saas = req.session;


        var userid = saas.userid;
        var usertype = saas.usertype;
        ////checkSession(req,res);
        res.render('index.ejs', {


            title: "Welcome to BSR | Admin panal",
            usertype: usertype

        });
    },

    getloginpage: (req, res) => {
        saas = req.session;


        var userid = saas.userid;
        var usertype = saas.usertype;


        res.render('login.ejs', {

            title: "Welcome to BSR | Admin panal",
            usertype: usertype

        });
    },

    loginpage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        res.render('loginoff.ejs', {

            title: "Welcome to BSR | Officer penal",
            usertype: usertype,

        });

    },

    homepage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        console.log(userid);
        console.log(usertype);
        console.log("che");
        var username = req.body.username;
        var pass = req.body.password;
        var message = "";
        console.log(username + "" + pass);
        let loginquery = "SELECT * FROM `userinfo` where u_name ='" + username + "' and u_pass= '" + pass + "'";
        db.query(loginquery, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('login.ejs', {
                    message: "Userid or password Wrong",
                    usertype: usertype
                });
            }

            if (result.length == 0) {

                message = "username or password worng";

                res.render('index.ejs', {
                    message: message,
                    title: "Welcome to BSR ",
                    usertype: usertype

                });

            } else {

                console.log(result);
                saas = req.session;

                saas.userid = result[0].u_id;
                saas.usertype = result[0].u_type;
                var userid = saas.userid;
                var usertype = saas.usertype;
                if (usertype == 2)

                    res.render('customer.ejs', {

                        title: "Welcome to BSR  Customer",
                        usertype: usertype,

                    });
            }
            if (usertype == 3) {
                res.render('officer.ejs', {

                    title: "Welcome to BSR Officer",
                    usertype: usertype,

                });
                console.log(result);
            }


        });

    },
	showclient:(req,res)=>{
	 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
		//var id = req.body.password;	
		 res.render('clientdata.ejs', {
                    title: "Welcome to BSR | Admin panal",
                    userid,
                    usertype: usertype,
                    saas


                });
	},
	
showclientdetails:(req,res)=>	{
	 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
		var phonenum=req.body.phone;
		
 let loginquery = "SELECT u_pass FROM `userinfo` where mobile ='" + phonenum + "'";		 
db.query(loginquery, (err, result) => {
            if (result) {
				console.log(result);
                res.render('clientdata.ejs', {
                    usertype: usertype,
                    title: "Welcome to BSR | Admin panal",
					userdata:result	
                });
            }
})
},
         

    getHomePage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        console.log(userid);
        console.log(usertype);
        console.log("che");
    

        var username = req.body.username;
        var pass = req.body.password;
        var message = "";
        console.log(username + "" + pass);
        let loginquery = "SELECT * FROM `userinfo` where u_name ='" + username + "' and u_pass= '" + pass + "' and u_type=1";
        db.query(loginquery, (err, result) => {
            if (err) {


                res.render('login.ejs', {
                    usertype: usertype,
                    title: "Welcome to BSR | Admin panal"

                });
            }

            if (result.length == 0) {

                message = "username or password worng";

                res.render('login.ejs', {
                    usertype: usertype,
                    message: message,
                    title: "Welcome to BSR | Admin panal"

                });

            } else {

                console.log(result);
                saas = req.session;

                saas.userid = result[0].u_id;
                saas.usertype = result[0].u_type;
                var userid = saas.userid;
                var usertype = saas.usertype;

                // console.log(saas.userid);

                res.render('admindashboard.ejs', {
                    title: "Welcome to BSR | Admin panal",
                    userid,
                    usertype: usertype,
                    saas


                });
            }
        });
    },
    getdashboard : (req,res)=>
    {
         saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        res.render('admindashboard.ejs', {

            title: "Welcome to BSR | Admin penal",
            usertype: usertype,

        });
    },
	
    getdashboarddaily: (req, res) => {

        //checkSession(req,res);
        var d = new Date();
        // console.log(dateresult);
        //console.log(result);
        dformat = [(d.getFullYear()),
            d.getMonth() + 1, d.getDate()
        ].join('-') + ' ' + ["09",
            "00",
            "00"
        ].join(':');


        let dailyquery = "SELECT sum(amount) as 'collection' FROM collaction where col_time >='" + dformat + "'";
        db.query(dailyquery, (err, dailyres) => {
            if (err) {
                message = "dailtquery error";
                // res.redirect('login.ejs');
            }
            dailycollection = dailyres[0]['collection'];
			console.log(dailycollection);
			 res.json(dailycollection);
        });
	},
	
 getdashboardmonth: (req, res) => {
	  
	         var d = new Date();
        dformat = [(d.getFullYear()),

            d.getMonth() + 1, "01"
        ].join('-') + ' ' + ["09",
            "00",
            "00"
        ].join(':');
        let monthqueryreport = "SELECT sum(amount) as 'collection' FROM collaction where col_time>='" + dformat + "'";
        db.query(monthqueryreport, (err, monthlyres) => {
            if (err) {
                message = "dailtquery error";
                // res.redirect('login.ejs');
            }
            monthconsup = monthlyres[0]['collection'];

            var month = monthconsup;
            res.json(month);
        });
 },
	
 getclienttop: (req, res) => {
	  var  d = new Date();
	  df = [(d.getFullYear()),
            "01" , "01"
        ].join('-') + ' ' + ["09",
            "00",
            "00"
        ].join(':');
		
        let monthqueryreport = "SELECT amount as 'y',col_time as 'x' FROM collaction where col_time>='" + df + "'";
        db.query(monthqueryreport, (err, monthlyres) => {
            if (err) {
                message = "dailtquery error";
                // res.redirect('login.ejs');
            }
            //onthconsup = monthlyres[0]['collection'];
			console.log(monthlyres);
            var month = monthlyres;
            res.json(month);
        });
 },

 
       getmonthly: (req, res) => {
	
        let monthlyreportquey = "select sum(c.amount) as 'high',u.`u_name` from userinfo u, collaction c where c.customer_id=u.u_id GROUP BY u.u_id ORDER by u.u_id DESC LIMIT 10";
		
       // console.log(monthlyreportquey)
        
        db.query(monthlyreportquey, (err, monthlyres) => {
            if (err) {
                message = "dailtquery error";
                // res.redirect('login.ejs');
            }
            var month = monthlyres;
            res.json(month);
        });

    },
	
	getrequests: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        let query = "SELECT * FROM `requestloan`"; // query database to get all the request

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result);
            res.render('requestloan.ejs', {
                title: "request loan | BSR admn portal",
                requests: result,
                usertype: usertype
            });
        });
    },
    addclientpage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        res.render('addclient.ejs', {

            title: "add client| BSR admn portal",
            usertype: usertype
        });


    },

    addclient: (req, res) => {
        //checkSession(req,res);
		 saas = req.session;
        //var userid = saas.userid;
        var usertype = saas.usertype;
		
        var name = req.body.username;
        var pass = req.body.passwo;
        var mob = req.body.mob;
        var address = req.body.add;

        var ref = req.body.ref;
        var che = req.body.che;
        var bank = req.body.bank;
        var maxid = 0;

        var type = 0;

        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = name + '.' + fileExtension;



        let addclient = "SELECT * FROM `userinfo` where u_name ='" + name + "' and u_pass= '" + pass + "'";

        db.query(addclient, (err, result) => {
            if (err) {

                res.redirect('login.ejs');
            }
			message="user already exist";

            if (result.length != 0) {
					 res.render('addclient.ejs', {

                                title: "add client| BSR admn portal",
                                message,
								usertype
                            });

			
                console.log('');
            } else {

                type = 2;

                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {


                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });
                    console.log("address is=" + address)
                    let inserclient = "INSERT INTO `userinfo` (u_name, u_pass,u_type,cheque_num,reference,adhar_proof,bank_name,mobile,u_address) VALUES ( '" + name + "', '" + pass + "', '" + type + "','" + che + "','" + ref + "','" + image_name + "','" + bank + "', '" + mob + "','" + address + "')";
                    db.query(inserclient, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        } else {
                            message = "user created";
                            //alert('user created');
                            res.render('addclient.ejs', {

                                title: "add client| BSR admn portal",
                                message,
								usertype
                            });



                        }
                        //  res.redirect('/');
                    });
                }
            }

        });
    },

    //add collaction by admin
    addcollectionpage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
		
        //checkSession(req,res);

		
        let checkuser = "select u_name,u_id from userinfo where u_type = 2";

        db.query(checkuser, (err, result) => {



            res.render('addcolleaction.ejs', {

                title: "add client| BSR admn portal",
                usertype: usertype,
                userdata: result
            });
        });

    },
	
	getUsername:(req, res) => {
        //checkSession(req,res);
        var userid = req.body.userid;

        let checkuser = "select u_name from userinfo where u_id = '" + userid + "'";

        db.query(checkuser, (err, result) => {

            console.log(result);
            var username = result;
            res.json(username);
			
			
        });


    },
	
    getLoneType: (req, res) => {
        //checkSession(req,res);
        var userid = req.body.userid;

        let checkuser = "select loan_type from loaninfo where u_id = '" + userid + "' and is_active=1 ";

        db.query(checkuser, (err, result) => {

            console.log(result);
            var loantype = result;
            res.json(loantype);
        });


    },
	
    getLoanTitle: (req, res) => {
        //checkSession(req,res);
        var userid = req.body.userid;
        var loan_type = req.body.loan_type;
        let checkuser = "select loan_title from loaninfo where u_id = '" + userid + "' and loan_type='" + loan_type + "' and is_active=1 ";

        db.query(checkuser, (err, result) => {

            console.log(result);
            var loan_title = result;
            res.json(loan_title);
        });


    },

    getMoneyInfo: (req, res) => {
        //checkSession(req,res);
        var userid = req.body.userid;
        var loan_type = req.body.loan_type;
        var loan_title = req.body.loan_title
        let checkuser = "select l_remain,l_paied from loaninfo where u_id = '" + userid + "' and loan_type='" + loan_type + "' and loan_title='" + loan_title + "' and is_active=1 ";

        db.query(checkuser, (err, result) => {

            console.log(result);
            var moneyInfo = {};
            moneyInfo["l_remain"] = result[0].l_remain;
            moneyInfo["l_paied"] = result[0].l_paied;
            res.json(moneyInfo);
        });


    },
	
    addcollection: (req, res) => {
        //checkSession(req,res);
		 saas = req.session;
        var adminid = saas.userid;
        var usertype = saas.usertype;
				
        var userid = req.body.username;

        var money = parseInt(req.body.amount);
        var loan_title = req.body.loan_title;
        var laon_id = "";
        var collector_id =adminid;
		
			if(money==null && loan_title== null && userid== null && userid== null){
		
                                    res.render('addcolleaction.ejs', {

                                        title: "add client| BSR admn portal",
                                        userdata: result,
                                        message: "please enter correct info",
										usertype
                                    });
			}
			else {

        let sle = "select loan_id from loaninfo where loan_title='" + loan_title + "' and u_id = '" + userid + "' and is_active = 1";

        db.query(sle, (err, getloanid) => {

            console.log(getloanid);
            laon_id = getloanid[0].loan_id;

			let colname= "select u_name from userinfo where u_id ='"+collector_id+"'";

			console.log(colname);
			 db.query(colname, (err, name) => {
				console.log(err);
				var collectername= name[0].u_name;
				
            let addcol = "insert into collaction (amount,customer_id,collector_id,col_name,loan_id) values ('" +
                money + "','" +
                userid + "','" + collector_id + "','" + collectername + "','" +
                laon_id + "')";

            db.query(addcol, (err, responsecol) => {
                console.log(err);
                if (responsecol) {


                    let getmoneyandpaid = "select l_remain, l_paied from loaninfo where loan_id='" + laon_id + "' ";
                    db.query(getmoneyandpaid, (err, getvalues) => {
                        console.log(err);
                        console.log(getvalues);
                        remain = parseInt(getvalues[0].l_remain);
                        paid = parseInt(getvalues[0].l_paied);
                        //console.log(remain);
                        ///console.log(paid);
                        //console.log(money);
                        remain = remain - money;
                        paid = paid + money;
                        //console.log(remain);
                        //console.log(paid);
                        let updatelo = "UPDATE loaninfo set l_paied=" + paid + "  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";

                        db.query(updatelo, (err, updatecol) => {});

                        if (remain == 0) {
                            let is_inactive = "UPDATE loaninfo set is_active=0  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";


                            db.query(is_inactive, (err, updatecol) => {});

                            let is_active = "UPDATE loaninfo set is_complete=1  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";


                            db.query(is_active, (err, updatecol) => {});
                        }


                        let updateloan = "UPDATE loaninfo set l_remain=" + remain + "  WHERE loan_title='" + loan_title + "' and u_id='"+userid +"'";


                        db.query(updateloan, (err, updatecol) => {
                            console.log(err);
                            if (updateloan) {

                                let checkuser = "select u_name,u_id from userinfo where u_type = 2";

                                db.query(checkuser, (err, result) => {

                                    res.render('addcolleaction.ejs', {

                                        title: "add client| BSR admn portal",
                                        userdata: result,
                                        message: "Collection Added",
										usertype
                                    });
                                });


                            } else {

                                let checkuser = "select u_name,u_id from userinfo where u_type = 2";

                                db.query(checkuser, (err, result) => {



                                    res.render('addcolleaction.ejs', {

                                        title: "add client| BSR admn portal",
                                        userdata: result,
                                        message: "something Wrong Try Agian",
										usertype
                                    });
                                });




                            }
                        });
                    });
                } else {
                    let checkuser = "select u_name,u_id from userinfo where u_type = 2";

                    db.query(checkuser, (err, result) => {



                        res.render('addcolleaction.ejs', {

                            title: "add client| BSR admn portal",
                            userdata: result,
                            message: "something Wrong Try Agian",
							usertype
                        });
                    });


                }

            });
        });
		});

			}

    },

    generateloanpage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        let checkuser = "select u_name,u_id from userinfo where u_type = 2";

        db.query(checkuser, (err, result) => {



            res.render('generateloan.ejs', {
                usertype: usertype,
                title: "add client| BSR admn portal",
                userdata: result
            });
        });

	},

    

    generateloan: (req, res) => {
			 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        var updateid = req.body.c_id;
        var id = updateid.replace('bsr', '');
        console.log(id);

        var laondate = new Date(req.body.Loan_date);
        var payment_type = req.body.payment_type;
		//var hafto_type = req.body.hafto_type;
        var type = Number(req.body.laon_type);
		console.log(type);
        var amount = Number(req.body.Amount);
        //var term = req.body.Term;
        var intstall_date = new Date(req.body.Install_date);
        var Due_date = new Date(req.body.Due_date); 
		
	

        newduedate = [(Due_date.getFullYear()),
            Due_date.getMonth() + 1, Due_date.getDate()
        ].join('-') + ' ' + [Due_date.getHours(),
            Due_date.getMinutes(),
            Due_date.getSeconds()
        ].join(':');

        newlaondate = [(laondate.getFullYear()),
            laondate.getMonth() + 1, laondate.getDate()
        ].join('-') + ' ' + [laondate.getHours(),
            laondate.getMinutes(),
            laondate.getSeconds()
        ].join(':');

        newintstall_date = [(intstall_date.getFullYear()),
            intstall_date.getMonth() + 1, intstall_date.getDate()
        ].join('-') + ' ' + [intstall_date.getHours(),
            intstall_date.getMinutes(),
            intstall_date.getSeconds()
        ].join(':');

		var allo = 1;
       var title="";
		var loanuserid="";
		 var loanusername="";
		var newcount=0;
		let checknewuser="select count(*) as 'count' from loaninfo where u_id=" + id + "";
		console.log(checknewuser);
		 db.query(checknewuser, (err, checknewuser) => {
		 newcount = checknewuser[0]['count'];
			console.log(newcount);
			
            if (newcount==0){
				title="a";
				 allo=1;
				console.log(title);
			}
			
		 else if (newcount > 3) {
                console.log('here maximum allocated');
                 allo = 0;
				message="maximum loan allocated";
                // alert('maximum loan allocated');
            } 
			else if (newcount == 2) {
				
                 title = "c";
				allo =1;
				
				
            } 
			else if (newcount == 3) {
                title = "d";
				allo =1;
				
            } 
			else if (newcount == 1) {
                  title = "b";
				allo = 1;
                console.log('hii');
            } 
			else {
               allo = 0;
            }
	
          
         if (allo == 1) 
		 {
			console.log('came');
                var l_paied = 0;
                var is_active = 1;
                let insertloan = "insert into loaninfo (loan_type,loan_title,loan_amount,payment_type,duedate,loan_date,u_id,l_remain,install_date,l_paied,is_active) VALUES ('" +
                    payment_type + "','" +
                    title + "','" +
                    amount + "','" +
                    type + "','" +
                    newduedate + "','" +
                    newlaondate + "','" +
                    id + "','" +
                    amount + "','" +
                    newintstall_date + "','" +
                    l_paied + "','" +is_active + "')";
	//console.log(insertloan);
                db.query(insertloan, (err, insertloan) => {

                    if (insertloan) {
						
						 let checkuser = "select u_name,u_id from userinfo where u_type = 2";

        db.query(checkuser, (err, result) => {

                    res.render('generateloan.ejs', {

                        title: "add Loan| BSR admn portal",
                        message: "Loan Generated Successfully",
						usertype,
						userdata:result
                    });
						console.log('suss');
						
                        //alert('loan suscessfully added');
		});
					}
							
					else {
                        console.log('erro' + err);
                    }
                });
				}
            });
		 
		 
	},
		 
   


    dailyreport: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        var officerarry = [];


        var d = new Date;
        dformat = [(d.getFullYear()),

            d.getMonth() + 1, d.getDate()
        ].join('-') + ' ' + ["09",
            "00",
            "00"
        ].join(':');

        console.log("date formate" + dformat);

        let dailyreportquey = "SELECT c.col_id,c.amount,c.customer_id,c.col_name,c.`col_time`,c.`collector_id`,c.`loan_id`, u.u_id, u.u_name FROM userinfo u, collaction c WHERE c.customer_id= u.u_id AND c.col_time >='" + dformat + "'";
      console.log("dailyreportquey:-" + dailyreportquey);

        db.query(dailyreportquey, (err, dailyresult) => {
		console.log(dailyresult);
                    res.render('dailyreports.ejs', {
                        title: "dailyreport | bsr admin report",
                       
					   dailyres: dailyresult,
                        usertype: usertype,
                       

                    });
                
            });
	},

    monthlyreport: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        var officermontharry = [];
        var newarray = [];
        var d = new Date();


        df = [(d.getFullYear()),

            d.getMonth() + 1, "01"
        ].join('-') + ' ' + ["09",
            "00",
            "00"
        ].join(':');

        let monthlyreportquey = "SELECT c.col_id,c.amount,c.customer_id,c.col_name, c.`col_time`,c.`collector_id`,c.`loan_id`, u.u_id, u.u_name FROM userinfo u, collaction c WHERE c.customer_id= u.u_id AND c.col_time >='" + df + "'";
        console.log(monthlyreportquey)
        db.query(monthlyreportquey, (err, monthlyresult) => {
		
           // console.log(monthlyresult);

                res.render('monthlyreport.ejs', {
                    title: "monthly Report | bsr admin report",
                    result: monthlyresult,
                    usertype: usertype,
                    

                });
            });


        },

    createofficerpage: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        console.log(usertype);
        //checkSession(req,res);
        res.render('createofficer.ejs', {

            title: "add officer| BSR admn portal",
            usertype: usertype

        });

    },

    createofficer: (req, res) => {
        //checkSession(req,res);
		 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
       
        console.log('in officer');

        var name = req.body.offname;
        var password = req.body.password;
        var address = req.body.address;
        var phone = req.body.phone;

        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = name + '.' + fileExtension;

        var type = 3;

        let checkoff = "select u_name from userinfo where u_name='" + name + "'and u_pass='" + password + "'";
        console.log(checkoff);
        db.query(checkoff, (err, checkoffres) => {

            if (checkoffres.length != 0) {
                 res.render('createofficer.ejs', {

                                title: "add officer| BSR admn portal",
								usertype

                            });
            } else {

                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {

                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });
//console.log('in officer3');


                    let offquery2 = "insert into userinfo (u_name  ,u_pass,u_type,id_proof,u_address,mobile)VALUES('" +
                        name + "','" + password + "','" + type + "','" + image_name + "','" + address + "','" + phone + "')";
                    db.query(offquery2, (err, offresult2) => {

                        if (err) {

                            return res.status(500).send(err);
							
                        }

                        if (offresult2) {

                            //console.log('officer inserted');

                            res.render('createofficer.ejs', {

                                title: "add officer| BSR admn portal",
								usertype

                            });
                        }


                    });


                } else {
                    message = "please select jpeg,gif,png format";
                }
            }
			
        });

    },

    clienthistory: (req, res) => {
        saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        //checkSession(req,res);
        var cleintid = req.body.username;

        console.log(cleintid);

        let clienthistory = "SELECT l.`loan_type`,l.`loan_title`,l.`loan_amount`,u.u_id,u.u_name,u.mobile,l.`payment_type`,l.`duedate`,l.`loan_date`,l.`l_remain`,l.`install_date`,l.`l_paied`,l.`is_active`,l.`is_complete` FROM `loaninfo` l ,userinfo u where u.u_id=l.`u_id` and l.u_id ='" + cleintid + "'";
        console.log(clienthistory);
        let checkuser = "select u_name,u_id from userinfo where u_type = 2";
        db.query(checkuser, (err, result) => {
            db.query(clienthistory, (err, historyresult) => {
                console.log(historyresult);
                res.render('clienthistory.ejs', {

                    title: "add officer| BSR admn portal",
                    clienthis: historyresult,
                    userdata: result,
                    usertype: usertype

                });
            });
        });
    },

    clienthistorypage: (req, res) => {
        //checkSession(req,res);
		 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
       
        let checkuser = "select u_name,u_id from userinfo where u_type = 2";

        db.query(checkuser, (err, result) => {

            res.render('clienthistory.ejs', {

                title: "client history| BSR admn portal",
                userdata: result,
				usertype
            });

        });
    },
	
    getclientprofilepage: (req, res) => {
        //checkSession(req,res);
		 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
       
        let checkuser = "select u_name,u_id from userinfo where u_type = 2";

        db.query(checkuser, (err, result) => {
			
			console.log(result);
			
            res.render('client_profile.ejs', {
				title: "client history| BSR admn portal",
                userdata: result,
				usertype
            });

        });
    },
	
	clientprofile: (req, res) => {
        //checkSession(req,res);
		 saas = req.session;
        var userid = saas.userid;
        var usertype = saas.usertype;
        var cleintid = req.body.username;

        console.log(cleintid);
		let cleintprof="SELECT `u_id`,`u_name`,'u.u_pass',`cheque_num`,`reference`,`adhar_proof`,`bank_name`,`mobile`,`u_address` from userinfo where u_id='"+ cleintid +"'";
         let checkuser = "select u_name,u_id from userinfo where u_type = 2";
		db.query(checkuser, (err, result) => {
            db.query(cleintprof, (err, profileresult) => {
                console.log(profileresult);
                res.render('client_profile.ejs', {

                    title: "profile page | BSR admn portal",
                    clientprof: profileresult,
                    userdata: result,
                    usertype: usertype

                });
            });
        });
    },

 
    //checkSession: checkSession
//index pages 
	product: (req,res)=>{
		 saas = req.session;
    var userid = saas.userid;
        var usertype = saas.usertype;
  res.render('product.ejs', {

                title: "client history| BSR admn portal",
				usertype	
			
            });


},

	services: (req,res)=>{
		 saas = req.session;
    var userid = saas.userid;
        var usertype = saas.usertype;
  res.render('services.ejs', {

                title: "Services | BSR admn portal",
				usertype	
			
            });


},

	aboutus: (req,res)=>{
		 saas = req.session;
    var userid = saas.userid;
        var usertype = saas.usertype;
  res.render('aboutus.ejs', {

                title: " About us | BSR admn portal",
				usertype	
			
            });

},

	contactus: (req,res)=>{
		 saas = req.session;
    var userid = saas.userid;
        var usertype = saas.usertype;
  res.render('contact.ejs', {

                title: "contact Us| BSR admn portal",
				usertype	
			
            });
},

	contactweb: (req,res)=> {
		 saas = req.session;
		var userid = saas.userid;
        var usertype = saas.usertype;
		var name= req.body.name;
		var email=req.body.email;
		var p_phone=parseInt(req.body.p_phone);
		var message = req.body.message;
		var msg="";
		  let insertcom = "insert into comment (con_name,con_email,con_phone,con_mes) VALUES('" +
                        name + "','" + email + "','" + p_phone + "','" + message + "')";
		  
        db.query(insertcom, (err, result) => {
			console.log(err);
			if(!err){
             res.render('contact.ejs', {
            title: "Welcome to BSR | contact page",
			usertype,
			message:msg
           
			});
		}
		
		
		else{
		     res.render('contact.ejs', {
            title: "Welcome to BSR | contact page",
			usertype,
			message:msg

			});
		}
		});
	
}, 
showconatact:(req,res)=> {
		 saas = req.session;
		var userid = saas.userid;
        var usertype = saas.usertype;
		let selectallcontact="select * from comment";
		 db.query(selectallcontact, (err, result) => {
		  res.render('showconatact.ejs', {
            title: "Welcome to BSR | contact page",
			usertype,
			allcontact:result
           
			})
		 
		 });
		 
		
		
}};

function checkSession(req, res) {
    saas = req.session;


    var userid = saas.userid;
    var usertype = saas.usertype;
    console.log("check");
    if (usertype == 2) {
        console.log("user 2");
        // console.log(saas.userid);
        res.render('userhome.ejs', {
            title: "Welcome to BSR | Officer page",

            userdata: saas,
        });
    } else if (usertype == 3) {
        console.log("user 3");
        res.render('officer.ejs', {
            title: "Welcome to BSR | Officer page",

            userdata: saas,

        });

    } else if (usertype == 1) {
        console.log("user 1");
        /*res.redirect('/admindashboard'); */

        window.location = Domain + "/admindashboard";
    } else {
        //res.redirect('/'); 

        window.location = Domain + "/";
    }

}