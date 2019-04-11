const pool = require('../db.js');

const saltRounds = 10;
const jwt = require('jsonwebtoken');

var resultsNotFound = {
  "errorCode": "0",
  "errorMessage": "Operation not successful.",
  "rowCount": "0",
  "data": ""
};
var resultsFound = {
  "errorCode": "1",
  "errorMessage": "Operation successful.",
  "rowCount": "1",
  "data": ""
};
module.exports = {
 
  loginUser: function (req, res) {

  	
    pool.getConnection(function (err, connection) {
      if (err) 
      {
      	console.log(err);
      	throw err;	
      		

      }
       // not connected!

        var name=req.body.username;
        var pass=req.body.password;
      var values = { 'name': req.body.username, 'pass': req.body.password }
        console.log(name);
         console.log(pass);
        
        console.log("contt");
        
        return true;
//        var sql = 'SELECT * FROM bsrinfo' WHERE `u_name` = ?' and u_pass'=;
//      var values = [input]
//        ///Use the connection
//        connection.query(sql, values, function (error, results, fields) {
//          if (error) {
//            resultsNotFound["errorMessage"] = "Something went wrong with Server.";
//            return res.send(resultsNotFound);
//          }
//          if (results =="") {
//            resultsNotFound["errorMessage"] = "User Id not found.";
//            return res.send(resultsNotFound);
//          }
//          resultsFound["data"] = results[0];
//          console.log(resultsFound);
//           res.send(resultsFound);
//          // When done with the connection, release it.
//          connection.release(); // Handle error after the release.
//          if (error) throw error; // Don't use the connection here, it has been returned to the pool.*/
        });
  }
/* createClient: function (req, res) {

    
    pool.getConnection(function (err, connection) {
      if (err) 
      {
        console.log(err);
        throw err;  
          

      }
      

      
        });
  }

 createClient: function (req, res) {

    
    pool.getConnection(function (err, connection) {
      if (err) 
      {
        console.log(err);
        throw err;  
          

      }
      

      
        });
  }
 requestloan: function (req, res) {

    
    pool.getConnection(function (err, connection) {
      if (err) 
      {
        console.log(err);
        throw err;  
          

      }
      

      
        });
  }
 dailyreport: function (req, res) {

    
    pool.getConnection(function (err, connection) {
      if (err) 
      {
        console.log(err);
        throw err;  
          

      }
      

      
        });
  }
 clienthistory: function (req, res) {

    
    pool.getConnection(function (err, connection) {
      if (err) 
      {
        console.log(err);
        throw err;  
          

      }
      

      
        });
  }

}
      //});
  //}
//};
*/
}