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
);

ALTER TABLE employees
   ADD CONSTRAINT sr_fk_emp_man 
   FOREIGN KEY (manager_id)
   REFERENCES employees(id)
;

-- DESCRIBE depts;
-- DESCRIBE roles;
-- DESCRIBE employees;

SOURCE seeds.sql;

SELECT * FROM depts;
SELECT * FROM roles;
SELECT * FROM employees;