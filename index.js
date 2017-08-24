/**
 * Module dependencies.
 */
var express        = require( 'express' );
var http           = require( 'http' );
var jsforce        = require('jsforce');

var app            = express();
app.set( 'port', process.env.PORT || 3001 );
app.get('/', function (req, res) {
  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com'
  });
  var username = 'vlad.petrishin1@softheme.com';
  var password = '123456asnaebtfFW3AxD6TNrQ94IFl5epgE8';
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
    res.send('JSForce Connect Successed!');
  });
  //res.send('Hello World');
});

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});