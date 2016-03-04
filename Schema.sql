CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(200) NOT NULL,
    email varchar(200) DEFAULT NULL,
    gender int NOT NULL,
    income double DEFAULT NULL
);

CREATE TABLE Expenses (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    amount double NOT NULL,
    date datetime NOT NULL,
    transaction_type int NOT NULL,
    credit_debit int NOT NULL,
    transaction_name varchar(200) DEFAULT 'Unknown',
    description varchar(1000) DEFAULT NULL,
    user int NOT NULL,
    FOREIGN KEY(user) REFERENCES User(id) ON UPDATE cascade ON DELETE no action
);