var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	app = express(),
	port = 9899,
	server;

app.use(cors());
app.use(bodyParser.json());

app.use("/scripts", express.static(__dirname + "/bower_components"));

app.use("/", express.static(__dirname + "/client"));

server = app.listen(port, function () {

});