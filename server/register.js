exports.register = function(connection) {
    return function(request, response) {
        var queryString = prepareFetchUsername();
        connection.query(queryString, [request.body.username], function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
            } else {
                if (rows && rows.data && rows.data.length > 0) {
                    matchPasswords(rows.data, request.body.password);
                } else {
                    response.status(200).send({
                        "status": 1
                    });
                }
            }
        });
    };
};