var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
var EmployeeModel = mongoose.model('EmployeeModel');

exports.getEmployees = (req,res) => {
    var employees = [];
    EmployeeModel.find({},{_id:false},(err,employeesArray)=>{
        if(err){
            console.log("error in fetching employee list from db")
        }else{
            if(employeesArray.length > 0){
                employeesArray.forEach( x => {
                    var dob = x.dob;
                    var dobArr = dob.split('-');
                    var today = new Date();
                    var diff = (today.getFullYear() - dobArr[0]);
                    var aEmployee = {
                        name: x.name,
                        email: x.email,
                        dob: x.dob,
                        gender: x.gender,
                        dept: x.dept,
                        age:diff,
                        id:x.id
                    }
                    employees.push(aEmployee);
                })
            }
            res.send(JSON.stringify(employees));
        }
    })
}

exports.addOrUpdateEmployee = (req, res) => {
    var employeeId = req.body.id;
    if(employeeId){
        console.log("Will update employee with id: %s",employeeId);
        EmployeeModel.findOneAndUpdate({id: employeeId}, 
                                       {$set:{
                                        name : req.body.name,
                                        email : req.body.email,
                                        dob : req.body.dob,
                                        gender : req.body.gender,
                                        dept : req.body.dept }}, function(err, doc){
            if(err){
                console.log("Couldnot update employee. Reason: %s",JSON.stringify(err));
                res.send(JSON.stringify({'success':false}))
            }else{
                console.log("Updated employee");
                res.send(JSON.stringify({'success':true}))
            }
        });
    }else{
        console.log("Will create new employee");
        var newEmployee = new EmployeeModel();
        newEmployee.id = uuidv4();
        newEmployee.name = req.body.name;
        newEmployee.email = req.body.email;
        newEmployee.dob = req.body.dob;
        newEmployee.gender = req.body.gender;
        newEmployee.dept = req.body.dept;

        newEmployee.save((err, savedEmployee) => {
            if(err){
                console.log("Couldnot save employee in db. Reason: "+err);
            }else{
                console.log("Saved employee in db successfully");
                res.send(JSON.stringify({'success':true}));
            }
        })
    }
}

exports.deleteEmployee = (req,res) =>{
    var employeeId = req.params.employee_id;
    if(!employeeId){
        console.log("bad request: no employee id found in request")
        res.send(JSON.stringify({'success':false}))
    }
    console.log("will delete employee with id: %s",employeeId);
    EmployeeModel.remove({id:employeeId},(err) => {
        if(err){
            console.log("Couldnot delete employee with id: %s, Reason: %s",employeeId,JSON.stringify(err));
            res.send(JSON.stringify({'success':false}))
        }else{
            console.log("Deleted employee with id: %s",employeeId);
            res.send(JSON.stringify({'success':true}))
        }
    })
}

exports.getEmployeeById = (req,res) => {
    var employeeId = req.params.employee_id;
    if(!employeeId){
        console.log("bad request: no employee id found in request")
        res.send(JSON.stringify({'success':false}))
    }
    EmployeeModel.findOne({id:employeeId},(err,employee)=>{
        if(err){
            console.log("Couldnot find employee with id: %s, Reason: %s",employeeId,JSON.stringify(err));
            res.send(JSON.stringify({'success':false}))
        }else{
            res.send(JSON.stringify({'success':true,'employee':employee}))
        }
    })
}