require('./models/db');
const Bcrypt = require("bcryptjs");

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose=require('mongoose');
const employeeController = require('./controllers/employeeController');
const { use } = require('./controllers/employeeController');
var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.post("/employee/aa", async (request, response) => {});
app.post("/employee/login", async (request, response) => {});

app.get("/dump", async (request, response) => {
    try {
        var result = await employeeModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/employee/aa", async (request, response) => {
    try {
        
        var user = new employeeModel(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/employee/login", async (request, response) => {
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

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
app.use(express.static('views/employee')); 
app.use('/employee', employeeController);
