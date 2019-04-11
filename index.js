
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session= require('express-session');

const {showclientdetails,showclient,getmonthly,getclienttop,getdashboarddaily,getdashboardmonth,contactus,contactweb,aboutus,services,product,getdashboard,logout,officerhomepage,gethomeuserpage,showconatact,addcollectionbyofficer,verifyuser,home,homepage,getMoneyInfo,getLoanTitle, getLoneType,getloginpage, getHomePage,getdashboarddata,getrequests,addclient,addclientpage,addcollectionpage,addcollection,generateloanpage,dailyreport,generateloan,monthlyreport,createofficer,createofficerpage,clienthistory,clienthistorypage,loginpage,getclientprofilepage,clientprofile,getUsername } = require('./routes/index');

/*const{}=require('./routes/officer');

const{}=require('./routes/users');
*/
//const{}=require('./routes/users');

// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');


const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'bsrinfo'
});

// connect to database
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(session({secret:'sessionsec',saveUninitializes:false,resave:false}));
app.use(fileUpload()); // configure fileupload
app.use('/required', express.static('required'));
// routes for the app

//admin routes
app.get('/admin', getloginpage);
app.get('/addclient',addclientpage);
app.get('/admindashboard', getdashboard);
app.get('/addcollectionpage',addcollectionpage);
app.get('/generateloanpage',generateloanpage);
app.get('/dailyreport',dailyreport);
app.get('/monthlyreport',monthlyreport);
app.get('/createofficer',createofficerpage);
app.get('/clienthistorypage',clienthistorypage);
app.get('/product',product)//k
app.get('/contact',contactus);//k
app.get('/about',aboutus);//k
app.get('/service',services);//k
app.get('/getallcontatct',showconatact);//k
app.get('/getclientprofilepage',getclientprofilepage);//k
app.get('/request',getrequests);
app.get('/showclient',showclient);
//app.get('/showofficer',showofficer);


app.post('/admin',getHomePage);
app.post('/addclient',addclient);
app.post('/addcollection',addcollection);
app.post('/generateloan',generateloan);
app.post('/clienthistorypage',clienthistory);
app.post('/createofficer',createofficer);
app.post('/getLoneType',getLoneType);
app.post('/getUsername',getUsername);//k
app.post('/getLoanTitle',getLoanTitle);
app.post('/getMoneyInfo',getMoneyInfo);
app.post('/clienthistory',clienthistory);
app.post('/contact',contactweb);
app.post('/clientprofile',clientprofile);//k
app.post('/showclientdetails',showclientdetails);
//app.post('/showoffpass',showoffpass);
//officer routes
app.get('/addoffcolleaction',addcollectionbyofficer);
app.get('/officer',officerhomepage);

app.post('/addoffcolleaction',addcollectionbyofficer);
app.post('/verifyuser',verifyuser);
app.post('/getdashboardmonth',getdashboardmonth);//k
app.post('/getclienttop',getclienttop);//k
//client routes
app.get('/customer',gethomeuserpage);

app.post('/getdashboarddaily',getdashboarddaily);//k
app.post('/getmonthly',getmonthly);//k


//home page routes
app.get('/',home);
app.get('/loginpage',loginpage);//officer and user
app.get('/logout',logout);
app.post('/loginpage',homepage);//officer and user


//app.get('/getclientorifiepage',getclientorifiepage);


//app.post('/',getHomePage);




// set the app to listen on the port
app.listen(port, function () {
	console.log(`Server running on port: ${port}`);
});
