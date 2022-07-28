DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE depts (
    id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES depts(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    -- need self-referential KEY here (so the manager_id row here refs the id row here)
);
