const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Employee Appraisal Management System"
    });
});
router.get('/', (req, res) => {
    res.render("employee/", {
        viewTitle: "Employee Appraisal Management System"
    });
});

router.get('/', (req, res) => {
    res.render("employee/two_buttons", {
        viewTitle: "Select"
    });
});

router.get('/', (req, res) => {
    res.render("employee/login", {
        viewTitle: "Login"
    });
});
router.get('/', (req, res) => {
    res.render("employee/aa", {
        viewTitle: "Sign Up"
    });
});
router.get('/', (req, res) => {
    res.render("employee/getStarted", {
        viewTitle: "Sign Up"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var employee = new Employee();
    employee.email = req.body.email;
    employee.password = req.body.password;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/login');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/login", {
                    viewTitle: "Login",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}
function insertRecord(req, res) {
    var employee = new Employee();
    employee.email = req.body.email;
    employee.password = req.body.password;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/two_buttons');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/two_buttons", {
                    viewTitle: "Select",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}
function insertRecord(req, res) {
    var employee = new Employee();
    employee.email = req.body.email;
    employee.password = req.body.password;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/aa');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/aa", {
                    viewTitle: "Sign Up",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/aa", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/aa", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/login', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/login", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

router.get('/aa', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/aa", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

router.get('/two_buttons', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/two_buttons", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/aa", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

router.post("/employee/aa", async (request, response) => {});
router.post("/employee/login", async (request, response) => {});

router.get("/dump", async (request, response) => {
    try {
        var result = await employeeModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/employee/aa", async (request, response) => {
    try {
        
        var user = new employeeModel(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/employee/login", async (request, response) => {
    try {
        var user = await employeeModel.findOne({ fileName: request.body.fileName }).exec();
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" });
        }
        user.comparePassword(request.body.password, (error, match) => {
            if(!match) {
                return response.status(400).send({ message: "The password is invalid" });
            }
        });
        response.send({ message: "The username and password combination is correct!" });
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;
