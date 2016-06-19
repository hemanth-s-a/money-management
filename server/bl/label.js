import mysql from '../db';

let self = this;

exports.createLabel = function(userId, name, callback) {
    if (!userId) {
        callback("UserID is not specified");
        return;
    } else if (!name) {
        callback("Name for the label isn't specified");
        return;
    }
    let queryAndData = prepareCreateLabel(userId, name);
    console.log("Creating label");
    mysql.query(queryAndData.query, queryAndData.data, callback);
};

exports.getLabels = function(userId, active, callback) {
    if (!userId) {
        callback("UserID is not specified");
        return;
    }
    let queryAndData = prepareGetLabel(userId, active);
    mysql.query(queryAndData.query, queryAndData.data, callback);
};

exports.addLabels = function(transactionId, labels, callback) {
    if (!transactionId) {
        callback("TransactionID isn't specified");
        return;
    }
    if (labels.length < 1) {
        callback("No labels to be added");
        return;
    }
    let queryAndData = prepareAddLabels(transactionId, labels);
    console.log(labels.length + "labels to be added");
    mysql.query(queryAndData.query, queryAndData.data, callback);
};

function prepareAddLabels(transactionId, labels) {
    let query = 'INSERT INTO AppliedLabels (transaction, label) VALUES ?',
        data;

    data = labels.map((labelId) => {
        return [transactionId, labelId];
    });
};

function prepareGetLabel(userId, active) {
    let query, data = [];

    query = 'SELECT * FROM Labels WHERE ?';
    data.push({
        "user": userId
    });

    if (active) {
        query += ' AND ?';
        data.push({
            "active": active
        });
    }

    return {
        "query": query,
        "data": data
    };
};

function prepareCreateLabel(userId, name) {
    let query, data = {
        "name": name,
        "user": userId
    };

    query = 'INSERT INTO Labels SET ?';
    return {
        "query": query,
        "data": data
    };
};
