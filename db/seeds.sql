INSERT INTO depts (id, dept_name)
VALUES (001, "Management"),
    (002, "Front of House"),
    (003, "Back of House"); 

INSERT INTO roles (id, title, salary, dept_id)
VALUES (001, "Chef", 25, 001),
    (002, "Server", 20, 002),
    (003, "Cook", 17, 003),
    (004, "Dishwasher", 20, 003); 

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Bob", "Belcher", 001, 1),
    (002, "Linda", "Belcher", 002, 1),
    (003, "Tina", "Belcer", 003, 1); 