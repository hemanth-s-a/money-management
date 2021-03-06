var mysql = require('mysql'),
    sqlConfig = require(process.env.RUN_ENV === 'prod' ? '../../sql' : '../../sql_dev'),
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
    console.log(mysql.format(query, data));
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

exports.transaction = function(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            callback(error);
        }
        connection.beginTransaction((error) => {
            callback(error, connection);
        });
    });
};

exports.endTransaction = function(connection) {
    connection.commit((error) => {
        if (error) {
            connection.rollback();
            console.log(error);
        } else {
            connection.release();
        }
    });
};

exports.transactionQuery = function(connection, query, data, callback) {
    connection.query(query, data, (error, rows, fields) => {
        if (error) {
            console.error("MySQL query: " + query + "data: " + data);
            connection.rollback(() => {
                callback(error);
            });
        }
        callback(error, rows, fields);
    });
};
