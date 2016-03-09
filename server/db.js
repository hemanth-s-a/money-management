var mysql = require('mysql'),
    sqlConfig = require('../sql'),
    pool = mysql.createPool(sqlConfig);

exports.getQuery = function(query, data, callback) {
    pool.getConnection(function(error, connection) {
        connection.release();
        if (error) {
            console.error("MySQL query: " + query + "data: " + data);
            callback(error);
        } else {
            connection.query(query, data, callback);
        }
    });
};

exports.query = function(query, data, callback) {
    pool.getConnection(function(error, connection) {
        connection.release();
        if (error) {
            console.error("MySQL query: " + query + "data: " + data);
            callback(error);
        } else {
            connection.query(query, data, callback);
        }
    });
};