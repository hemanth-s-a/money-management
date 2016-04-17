"use strict";

var mysql = require('./db');

/**
 * Add credit that can be used for given types
 * @param {object} request  request object
 * @param {object} response response object
 */
exports.addCredit = function(request, response) {
    var queryString = prepareAddCredit(),
        addCreditData = prepareAddCreditData(request.body);
    mysql.query(queryString, addCreditData, function(error, rows, fields) {
        if (error) {
            console.log(error);
            console.log("Error adding credit");
            response.status(500).send("Server error");
        } else {
            console.log(rows);
            console.log("Credit added");
            response.status(200).send({
                "status": 0
            });
        }
    });
};

exports.addCreditTypes = function(request, response) {
    var queryString = prepareAddCreditTypes(),
        addCreditTypesData = prepareAddCreditTypesData(request.body);
    mysql.query(queryString, addCreditTypesData,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                console.log("Error applying types");
                response.status(500).send("Server error");
            } else {
                console.log(rows);
                console.log("Credit added");
                response.status(500).send({
                    "status": 0
                });
            }
        }
    );
};

exports.applyCredit = function(request, response) {
    var queryString = prepareApplyCredit(),
        applyCreditData = prepareApplyCreditData(request.body);
    mysql.query(queryString, applyCreditData,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                console.log("Error applying credit");
                response.status(500).send("Server error");
            } else {
                console.log(rows);
                console.log("Credit applied");
                response.status(500).send({
                    "status": 0
                });
            }
        }
    );
};

function prepareAddCreditTypes() {
    return "INSERT INTO CreditType SET ?";
};

function prepareAddCreditTypesData(parameters) {
    var data = {};

    return data;
};

function prepareAddCredit() {
    return "INSERT INTO Credit SET ?";
};

function prepareAddCreditData(parameters) {
    var data = {
        "amount": parameters.amount,
        "remaining_amount": parameters.amount,
        "user": parameters.userId
    };

    if (parameters.date) {
        data.date = parameters.date;
    }

    return data;
};