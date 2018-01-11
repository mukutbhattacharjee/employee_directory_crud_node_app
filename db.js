var mongoose = require('mongoose');

var dbURL = "mongodb://root:root@ds251277.mlab.com:51277/employees_directory";
//var dbURL = "mongodb://127.0.0.1/employees_directory";
mongoose.connect(dbURL);

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongodb database");
})

mongoose.connection.on('error',(err)=>{
    console.log("Connection error: "+err);
})

mongoose.connection.on('disconnected',()=>{
    console.log("Disconnected from mongodb");
})

var EmployeeSchema = new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    name: {type: String, required: true},
    email: {type: String, required: true,unique:true},
    dob: {type: String, required: true},
    gender: {type: String, required: true},
    dept: {type: String, required: true},
}, {collection: 'employee_collection'});


mongoose.model('EmployeeModel',EmployeeSchema); 