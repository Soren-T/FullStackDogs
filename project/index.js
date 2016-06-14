var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var dogs = require('./dogs');
var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pirates')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var startDB = new Promise(function(resolve, reject) {
	db.once('open', function(){
		resolve(true)
	})
})


startDB
.then(function(){
	var pirateSchema = mongoose.Schema({
		name: String
	});
	var Pirate = mongoose.model('Pirate', pirateSchema)
	
	
	app.get('/pirates', function(req, res){
		Pirate.find(function (err, pirates) {
			if (err) return console.error(err);
			console.log(pirates);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(pirates))
		})
	})
	app.post('/pirates', function(req, res){
		var newPirate = new Pirate({name:req.body.name})
		newPirate.save(function (err, pirate) {
			if (err) return console.error(err);
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(pirate))
		});
	})
	app.delete('/pirates', function(req, res){
		Pirate.remove({ name: req.body.name }, function (err, returnValue) {
			if (err) return console.error(err);
			console.log(returnValue)
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		});
		console.log('recieved a DELETE request')
	})
	app.put('/pirates/:name', function(req, res){
		var query = { name: req.params.name};
		Pirate.findOneAndUpdate(query, { name: req.body.newName }, function (err, returnValue) {
			if (err) return console.error(err);
			console.log(returnValue)
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		})
		console.log('recieved a PUT request')
	})

	app.listen(3000, 'localhost', function(){
		console.log('server running ' + dogs)
	})

	return Promise.resolve(10)
})

.catch(function(err){
	console.err()
})


















