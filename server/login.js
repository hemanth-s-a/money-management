exports.login = function(connection) {
    return function(request, response) {
        var queryString = prepareFetchUsername();
        connection.query(queryString, [request.body.username], function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
            } else {
                if (rows && rows.data && rows.data.length > 0) {
                    matchPasswords(rows.data, request.body.password, response);
                } else {
                    response.status(200).send({
                        "status": 1
                    });
                }
            }
        });
    };
};

function matchPasswords(data, password) {
    console.log(data);
    if (password === data) {
        console.log("Login Success");
        response.status(200).send({
            "status": 0
        });
    } else {
        console.log("incorrect password");
        response.status(200).send({
            "status": 3
        });
    }
};

function prepareFetchUsername() {
    return 'SELECT * FROM User WHERE username=?';
};