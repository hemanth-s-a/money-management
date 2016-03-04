exports.register = function(connection) {
    return function(request, response) {
        var queryString = prepareFetchUsername();
        connection.query(queryString, [request.body.username], function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
            } else {
                if (rows && rows.data && rows.data.length > 0) {
                    response.status(200).send({
                        "status": 2
                    });
                } else {
                    createUser(connection, request, response);
                }
            }
        });
    };
};

function prepareFetchUsername() {
    return 'SELECT * FROM User WHERE username=?';
};

function createUser(connection, request, response) {
    var queryString = prepareCreateUser(),
        userData = prepareUserDataForCreate(request.body);
    connection.query(queryString, userData, function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.status(200).send({
                "status": 0
            });
        }
    });
};

function prepareCreateUser() {
    return 'INSERT INTO User SET ?';
};

function prepareUserDataForCreate(parameters) {
    var data = {
        "username": parameters.username
    };

    if (parameters.name) {
        data.name = parameters.name;
    }

    if (parameters.email) {
        data.email = parameters.email;
    }

    if (parameters.gender) {
        data.gender = parameters.gender;
    }

    if (parameters.income) {
        data.income = parameters.income;
    }

    return data;
};