var express = require('express'),
    morgan = require('morgan'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.MONEY_PORT || 9899,
	server,
    mysql = require('mysql'),
    sqlConfig = require('./sql'),
    connection = mysql.createConnection(sqlConfig),
    // logger = require('./server/logger'),
    // log = logger.logger,

    test = require('./server/test'),
    login = require('./server/login'),
    register = require('./server/register'),
    expenses = require('./server/expenses');

process.stdin.resume();

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) {
        connection.end();
        console.log("exiting...");
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

app.use(cors());
app.use(morgan(':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));
app.use(bodyParser.json());

connection.connect();

app.use("/scripts", express.static(__dirname + "/bower_components"));

app.use("/", express.static(__dirname + "/client"));

app.get("/test", test.getMe);

app.post("/login", login.login(connection));

app.post("/register", register.register(connection));

app.get("/expenseTypes", expenses.getExpenseTypes(connection));
app.post("/expense", expenses.saveExpense(connection));

console.log("Starting...");

server = app.listen(port, function () {

});