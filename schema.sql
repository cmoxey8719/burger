### Schema
CREATE DATABASE quotes_db;
USE quotes_db;

CREATE TABLE quotes
(
	id int NOT NULL AUTO_INCREMENT,
	burger varchar(255) NOT NULL,
	PRIMARY KEY (id)
);