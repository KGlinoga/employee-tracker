DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE depts (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES depts(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
    -- need self-referential KEY here (so the manager_id row here refs the id row here)
    -- also we have in the class repo vsc we ahve the README For this challenge, schema.sql from folder 15, server.js from folder 11 connect node, and index.js from wk5 folder 19 INquirer demo and schema.sql form Foreign Primary Key 
);

-- DESCRIBE depts;
-- DESCRIBE roles;
-- DESCRIBE employees;

SOURCE seeds.sql;

-- SELECT * FROM depts;
-- SELECT * FROM roles;
-- SELECT * FROM employees;