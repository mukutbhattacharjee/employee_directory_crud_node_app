var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db.js');
var routes = require('./routes.js');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

app.get('/employees',routes.getEmployees)
app.post('/employee',routes.addOrUpdateEmployee)
app.delete('/employee/:employee_id',routes.deleteEmployee)
app.get('/employee/:employee_id',routes.getEmployeeById)

var port = process.env.npm_package_config_port;

app.listen(process.env.PORT || port,()=>{
	console.log("listening on port "+port);
});
