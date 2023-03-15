var path = require('path');
var fs = require('fs')
var express = require('express');
var exphbs = require('express-handlebars')
var userData = require('./userData.json');
var userWorkout = require('./workout.json')
const { ppid } = require('process');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json())

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/login', function (req, res, next) {
    res.status(200).render('login')
})

app.get('/friends', function (req, res, next){
    res.status(200).render('friends', {useData: true, userData})
})

app.get('/settings', function (req, res, next){
    res.status(200).render('settings')
})

app.get('/', function (req, res, next){
  res.status(200).render('index', {useWorkouts: true, userWorkout})
})

app.get('/month', function (req, res, next){
  res.status(200).render('month', {useWorkouts: true, userWorkout})
})

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.post('/login', function(req, res)  {
  let jData = fs.readFileSync('userData.json');
  let json = JSON.parse(jData); //json is now a javascript object of userData contents

  let inputData = { Name: req.body.Name, Age: req.body.Age, Bio: req.body.Bio}; //store the user input into the var inputData, which is temporary, aka let
  json.push(inputData); //the javascript object of the json file now has the new input
  fs.writeFileSync('userData.json', JSON.stringify(json, null, 2)); //the null, 2 arguments make it so that its not all on one line
  console.log(json)
  res.status(200).json(json)
});

app.post('/', function(req,res){
  let jData = fs.readFileSync('workout.json');
  let json = JSON.parse(jData); //json is now a javascript object of workout contents 

  let inputData = { Name: req.body.Name, Description: req.body.Description}; //store the user input into the var inputData, which is temporary, aka let
  json.push(inputData); //the javascript object of the json file now has the new input
  fs.writeFileSync('workout.json', JSON.stringify(json, null, 2)); //the null, 2 arguments make it so that its not all on one line
  console.log(json)
  res.status(200).json(json)
})

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});