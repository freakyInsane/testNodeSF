/**
 * Module dependencies.
 */
var express        = require( 'express' );
var http           = require( 'http' );
var jsforce        = require('jsforce');
var credentials	   = require('./credentials.js');
var conn;

var app            = express();
app.set( 'port', process.env.PORT || 3001 );
app.get('/', function (req, res) {
  conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com'
  });
  var username = credentials.getUsername();
  var password = credentials.getPassword();
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    //console.log(conn.accessToken);
    //console.log(conn.instanceUrl);
    //console.log("User ID: " + userInfo.id);
    //console.log("Org ID: " + userInfo.organizationId);
    res.send('JSForce Connect Successed!');
  });
});


app.get('/accs', function (req, res) {
  var records = [];
  conn.query("SELECT Id, Name FROM Account", function(err, result) {
    if (err) { return console.error(err); }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
  });

});


http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});