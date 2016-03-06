exports.saveExpense = function(connection) {
	return function(request, response) {
		var queryString = prepareSaveExpense(),
			expenseData = prepareExpenseData(request.body);
		connection.query(queryString, expenseData, function(error, rows, fields) {
			if (error) {
				console.log(error);
				response.status(500).send("Server error");
			} else {
				console.log(rows);
				response.status(200).send({
					"status": 0
				});
			}
		});
	};
};

exports.getExpenseTypes = function(connection) {
	return function(request, response) {
		var queryString = prepareGetExpenseTypes();
		connection.query(queryString, function(error, rows, fields) {
			if (error) {
				console.log(error);
				response.status(500).send("Server error");
			} else {
				console.log(rows);
				response.status(200).send({
					"status": 0,
					"data": rows
				});
			}
		});
	};
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
