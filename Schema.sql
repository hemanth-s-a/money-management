CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(20) NOT NULL UNIQUE,
    name varchar(200) NOT NULL,
    email varchar(200) DEFAULT NULL,
    password varchar(64) NOT NULL,
    gender int NOT NULL DEFAULT 0,
    income double DEFAULT NULL
);

CREATE TABLE ExpenseType (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    description varchar(200),
    parentId int DEFAULT NULL,
    FOREIGN KEY(parentId) REFERENCES ExpenseType(id) ON UPDATE cascade ON DELETE cascade
);

CREATE TABLE Expenses (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    amount double NOT NULL,
    amount_after_credits NOT NULL,
    date datetime NOT NULL DEFAULT NOW(),
    credit_debit int NOT NULL,
    transaction_name varchar(200) DEFAULT 'Unknown',
    description varchar(1000) DEFAULT NULL,
    user int NOT NULL,
    FOREIGN KEY(user) REFERENCES User(id) ON UPDATE cascade ON DELETE no action,
    type int,
    FOREIGN KEY(type) REFERENCES ExpenseType(id) ON UPDATE cascade ON DELETE no action,
    deleted int DEFAULT 0,
    deleted_date datetime DEFAULT NULL
);

CREATE TABLE Credit (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    amount double NOT NULL,
    date datetime NOT NULL DEFAULT NOW(),
    remaining_amount NOT NULL,
    user int NOT NULL,
    FOREIGN KEY(user) REFERENCES User(id) ON UPDATE cascade ON DELETE no action
);

CREATE TABLE CreditType (
    credit bigint NOT NULL,
    FOREIGN KEY(credit) REFERENCES Credit(id) ON UPDATE cascade ON DELETE cascade,
    type int,
    FOREIGN KEY(type) REFERENCES ExpenseType(id) ON UPDATE cascade ON DELETE no action,
    PRIMARY KEY(credit, type)
);

CREATE TABLE CreditsApplied (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    amount double NOT NULL,
    date datetime NOT NULL DEFAULT NOW(),
    deleted int DEFAULT 0,
    deleted_date datetime DEFAULT NULL,
    credit bigint NOT NULL,
    FOREIGN KEY(credit) REFERENCES Credit(id) ON UPDATE cascade ON DELETE no action,
    expense bigint NOT NULL,
    FOREIGN KEY(expense) REFERENCES Expenses(id) ON UPDATE cascade ON DELETE no action
);

