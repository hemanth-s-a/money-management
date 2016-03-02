CREATE TABLE User (
    id int PRIMARY KEY,
    name varchar(200) NOT NULL,
    email varchar(200) DEFAULT NULL,
    gender int NOT NULL,
    income double DEFAULT NULL
);

CREATE TABLE Expenses (
    id bigint PRIMARY KEY,
    expense double NOT NULL,
    date int NOT NULL
);