import mysql from './db';
import expenses from './expenses';

exports.saveCredit = () => {
    return (request, response) => {
        mysql.transaction((error, connection) => {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
            } else {
                let queryString = prepareSaveCredit(),
                    creditData = prepareCreditData(request.body);
                console.log("Inserting credits");
                /**
                 * Insert the credit transaction
                 */
                mysql.transactionQuery(connection, queryString, creditData, (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        response.status(500).send("Server error");
                    } else {
                        console.log("Credit added");
                        applyCredits(request, response, connection);
                    }
                });
            }
        });
    };
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

function adjustAvailableCredits(request, response, connection) {
    let queryString = prepareApplyCreditQuery(),
        data = prepareApplyCreditData(request.body, true);
    console.log("Adjusting credit available");
    mysql.transactionQuery(connection, queryString, data, (error, rows, fields) => {
        if (error) {
            console.log(error);
            response.status(500).send("Server error");
        } else {
            console.log("Credit adjusted");
            response.status(200).send({
                "status": 0
            });
            mysql.endTransaction(connection);
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
