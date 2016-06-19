import mysql from '../db';
import BigDecimal from 'big-decimal';

let self = this;

/**
 * Get a list of expenses for a user
 * @param  {long}   userId   User ID
 * @param  {error, rows, fields} callback data is in rows
 */
exports.getExpenses = function(userId, callback) {
    if (!userId) {
        callback("UserID not specified");
        return;
    }
    let queryAndData = prepareGetExpense(userId);
    console.log("Getting expenses");
    mysql.query(queryAndData.query, queryAndData.data, callback);
};

/**
 * Get a single transaction for a user
 * @param  {long}   userId        User ID
 * @param  {long}   transactionId
 * @param  {error, rows, fields} callback      data is in rows
 */
exports.getExpense = function(userId, transactionId, callback) {
    if (!userId || !transactionId) {
        callback("Missing UserID or TransactionID");
        return;
    }
    let queryAndData = prepareGetExpense(userId, transactionId);
    console.log("Getting expense");
    mysql.query(queryAndData.query, queryAndData.data, callback);
};

exports.addCredit = function(userId, transactionId, creditAmount, credit, creditOn, date, callback) {
    self.getExpense(userId, transactionId, (error, rows, fields) => {
        if (error || rows.length < 1) {
            callback(error);
            return;
        }
        let expense = rows[0],
            BDTotalRemaining,
            BDCreditAmount;
        try {
            BDTotalRemaining = new BigDecimal(expense.total_remaining.toString());
            BDCreditAmount = new BigDecimal(creditAmount.toString());
        } catch(error) {
            callback("Error converting to big-decimal");
            return;
        }
        if (BDTotalRemaining.compareTo(BDCreditAmount) === -1) {
            callback("Credit amount greater than remaining amount");
            return;
        }

        mysql.transaction((error, connection) => {
            if (error) {
                callback(error);
                return;
            }
            let queryString = prepareApplyCreditQuery(),
                data = prepareApplyCreditData(request.body, false);
            console.log("Applying credits");
            mysql.transactionQuery(connection, queryString, data, (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    response.status(500).send("Server error");
                } else {
                    console.log("Credit applied");
                    adjustAvailableCredits(request, response, connection);
                }
            });
        });
    });
};

function saveCredit(creditAmount, credit, creditOn, callback) {
    let queryString = prepareSaveCredit(),
        creditData = prepareCreditData(creditAmount, credit, creditOn, date);
    console.log("Inserting credits");
    /**
     * Insert the credit transaction
     */
    mysql.transactionQuery(connection, queryString, creditData, (error, rows, fields) => {
        if (error) {
            callback(error);
        } else {
            console.log("Credit added");
            applyCredits(request, response, connection);
        }
    });
};

function applyCredits(request, response, connection) {
            let queryString = prepareApplyCreditQuery(),
                data = prepareApplyCreditData(request.body, false);
            console.log("Applying credits");
            mysql.transactionQuery(connection, queryString, data, (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    response.status(500).send("Server error");
                } else {
                    console.log("Credit applied");
                    adjustAvailableCredits(request, response, connection);
                }
            });
};

function prepareSaveCredit() {
    return 'INSERT INTO Credits SET ?';
};

function prepareCreditData(parameters) {
    let data = {
        "amount": parameters.amount,
        "credit": parameters.credit,
        "credit_on": parameters.creditOn
    };

    if (parameters.date) {
        data.date = parameters.date;
    }

    return data;
};

function prepareApplyCreditQuery() {
    return 'UPDATE Expenses SET ? WHERE ?';
};

function prepareApplyCreditData(parameters, credit) {
    return [{
        "total_remaining": parameters.expense.total_remaining - parameters.amount
    }, {
        "id": credit ? parameters.credit : parameters.creditOn
    }];
};

function prepareGetExpense(userId, transactionId) {
    var query, data = [];

    query = 'SELECT * FROM Expenses WHERE ?';
    data.push({
        "user": userId
    });

    if (!transactionId) {
        query += ' AND ?';
        data.push({
            "credit_debit": 1
        });
    } else {
        query += ' and ?';
        data.push({
            "id": transactionId
        });
    }

    return {
        "query": query,
        "data": data
    };
};
