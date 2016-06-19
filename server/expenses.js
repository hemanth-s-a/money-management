var mysql = require('./db');
var transactionsBL = require('./bl/transactions');

exports.saveExpense = function() {
	return function(request, response) {
		var queryString = prepareSaveExpense(),
			expenseData = prepareExpenseData(request.body);
		// connection.connect();
		console.log("Inserting expenses");
		mysql.query(queryString, expenseData, function(error, rows, fields) {
			if (error) {
				console.log(error);
				console.log("Error adding expense");
				response.status(500).send("Server error");
			} else {
				console.log(rows);
				console.log("Expense added");
				response.status(200).send({
					"status": 0
				});
			}
		});
	};
};

exports.getExpenses = function() {
	return function(request, response) {
		transactionsBL.getExpenses(request.query.userId, (error, rows, fields) => {
			if (error) {
				console.log(error)
				response.status(500).send("Server error");
			} else {
				response.status(200).send({
					"expenses": rows
				});
			}
		});
	};
};

exports.getExpenseTypes = function() {
	return function(request, response) {
		var queryString, queryData = [];
		queryString = prepareGetExpenseTypes(request.query.parentId);
		// connection.connect();
		if (request.query.parentId) {
			queryData = [request.query.parentId];
		}
		console.log(queryString, queryData);
		mysql.query(queryString, queryData, function(error, rows, fields) {
			if (error) {
				console.log(error);
				response.status(500).send("Server error");
			} else {
				console.log(rows);
				response.status(200).send({
					"status": 0,
					"expenseTypes": rows
				});
			}
		});
	};
};

function prepareGetExpenseTypes(subType) {
	return subType ? 
		'SELECT * FROM ExpenseType WHERE parentId=?' :
		'SELECT * FROM ExpenseType WHERE parentId IS NULL';
};

function prepareSaveExpense() {
	return 'INSERT INTO Expenses SET ?';
};

/*
 * parameters:
 *  expenseType
 *  amount
 *  date
 *  creditDebit
 *  transactionName
 *  description
 *  userId
 */
function prepareExpenseData(parameters) {
	var data = {
		"type": parameters.expenseType,
		"amount": parameters.amount,
		"credit_debit": parameters.creditDebit,
		"user": parameters.userId
	};

	if (parameters.date) {
		data.date = parameters.date;
	}

	if (parameters.transactionName) {
		data.transaction_name = parameters.transactionName;
	}

	if (parameters.description) {
		data.description = parameters.description;
	}

	return data;
};
