import labelBL from './bl/label';

exports.createLabel = function() {
    return function(request, response) {
        labelBL.createLabel(request.body.userId, request.body.name, (error, rows, fields) => {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
                return;
            }
            console.log("Label created");
            response.status(200).send({
                "status": 0
            });
        });
    };
};

exports.getLabels = function() {
    return function(request, response) {
        labelBL.getLabels(request.query.userId, request.query.active, (error, rows, fields) => {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
                return;
            }
            response.status(200).send({
                "labels": rows
            });
        });
    };
};

exports.addLabels = function() {
    return function(request, response) {
        labelBL.addLabels(request.body.transactionId, request.body.labels, (error, rows, fields) => {
            if (error) {
                console.log(error);
                response.status(500).send("Server error");
                return;
            }
            response.status(200).send({
                "status": 0
            });
        });
    };
};
