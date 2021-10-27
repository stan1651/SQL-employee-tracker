const connection = require("./connection")


class DB {
    constructor(connection) {
        this.connection = connection;
    }

// Add sql language commands in order to find all employees
findAllPossibleManagers(employeeId) {
    return this.connection.promise().query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
    )
}
queryAllDepartments(department) {
    return this.connection.promise().query(
        "SELECT * FROM department"
    )
} 
createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department)
}
viewEmployees(employee) {
    return this.connection.promise().query("SELECT * FROM employee")
}
     

// create new employee
createEmployee(employee) {
    return this.connection.promise().query("Insert INTO employee SET ?", employee)
}

queryAllEmployees()
     {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
      }
}

module.exports = new DB(connection);