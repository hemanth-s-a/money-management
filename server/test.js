exports.getMe = function (req, res) {
    res.send(abc());
}

function abc () {
    return "hello";
}