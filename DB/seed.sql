use work_db;

insert into department(name)
VALUES
("service"),
("tech"),
("RandD"); 

insert into role (title, salary, department_id)
  VALUES 
    ("programmer", 80000, 1),
    ("developer", 40000, 2),
    ("supervisor",100000, 3);

insert into employee (first_name, last_name, role_id, manager_id)
  VALUES 
    ("Ivo", "Gatzinski", 1, null),
    ("Bridgette", "Quiambao", 2, null),
    ("John", "Desrosiers", 3, 1),
    ("Erica", "Snyder", 3, 1),
    ("Elena", "Liu", 3, 2);
