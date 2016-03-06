/*
 * Register status:
 * 0 - Success
 * 1 - Username doesn't exist (login)
 * 2 - Username exists
 * 3 - Incorrect password
 */
 exports.login = function(connection) {
    return function(request, response) {
        var queryString = prepareFetchUsername();
        connection.query(queryString, [request.body.username], function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
            } else {
                if (rows && rows.length > 0) {
                    matchPasswords(rows, request.body.password, response);
                } else {
                    response.status(400).send({
                        "status": 1,
                        "message": "Username doesn't exist"
                    });
                }
            }
        });
    };
};

function matchPasswords(data, password, response) {
    console.log(data);
    if (password === data[0].password) {
        console.log("Login Success");
        response.status(200).send({
            "status": 0,
            "data": {
                "id": data[0].id,
                "name": data[0].name
            }
        });
    } else {
        console.log("incorrect password");
        response.status(400).send({
            "status": 3,
            "message": "Incorrect password"
        });
    }
};

function prepareFetchUsername() {
    return 'SELECT * FROM User WHERE username=?';
};