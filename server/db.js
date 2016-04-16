var mysql = require('mysql'),
    sqlConfig = require('../sql'),
    pool = mysql.createPool(sqlConfig);

exports.getQuery = function(query, data, callback) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.error("MySQL query: " + query + "data: " + data);
            callback(error);
        } else {
            connection.query(query, data, function(error, rows, fields) {
                connection.release();
                callback(error, rows, fields);
            });
        }
    });
};

exports.query = function(query, data, callback) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.error("MySQL query: " + query + "data: " + data);
            callback(error);
        } else {
            connection.query(query, data, function(error, rows, fields) {
                connection.release();
                callback(error, rows, fields);
            });
        }
    });
};