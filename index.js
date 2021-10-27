const db = require("./db");
const {prompt} = require("inquirer");
const { createEmployee, queryAllDepartments, createDepartment } = require("./db");
const ctable = require("console.table");
const art = require("ascii-art");
const mysql2 = require("mysql2");
const inquirer = require("inquirer");


start();
async function start() {
  try {
    const rendered = await art.font("Employee Manager", "doom").completed();
    console.log(rendered);
    return mainPrompt();
  } catch (err) {
    console.log(err);
  }
}


function mainPrompt() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?',
            choices: [
                {
                    name:"View all employees",
                    value:"All_Employee_Information",

                },
                {
                    name:"View all departments",
                    value:"All_Department_Information"
                },
                {
                    name:"Add a department",
                    value:"Add_Department",
                },
                {
                    name: "View Employees by Manager",
                    value: "View_Employees_Manager",

                },
                {
                    name: "View Employees",
                    value: "View_Employees",
                },
                {
                    name: "Add Employee",
                    value: "Add_Employee",
                }
            ]

        }
    ]).then(res => {
        let option = res.option;
        switch(option) {
            case
            "All_Employee_Information": viewAllEmployees();
            break;
            case
            "View_All_Departments": viewAllDepartments();
            break;
            case
            "Add_Department": createDepartment();
            break;
            case 
            "View_Employees_Manager": viewEmployeesManager();
            break;
            case 
            "Add_Employee": createEmployee();
            break;
            default:
              return exit();

        }
    })
}


function viewAllEmployees() {
    db.queryAllEmployees()
    .then(([rows]) => {
        let employee = rows;
        console.table(employee);
    }).then(() => mainPrompt())

}
function viewAllDepartments() {
    db.queryAllDepartments()
    .then(([rows]) => {
        let department = rows;
        console.table(department);
    }).then(() => mainPrompt())
}
 function addDepartment() {
  inquirer.prompt({
    name:"addDepartment",
    type:"input",
    message:"What is the name of the new department",
  })
    db.createDepartment()
    .then(([rows]) => {
        let department = rows;
        console.table(department);
    }).then(() => mainPrompt())
}

function viewEmployeesManager() {
    db.findAllPossibleManagers()
    .then(([rows]) => {
      let employee = rows;
      console.table(employee);
    }).then(() => mainPrompt())
}

function addEmployee() {
  inquirer.prompt([
    {
    type:"input",
    message:"What is the new employee first name?",
    name: "first_name",
  },
  {
    type:"input",
    message:"What is the employees last name?",
    name:"last_name",
  },
  {
    type:"input",
    message:"What is the employees role?",
    name:"role_id"
  }]
  )
  .then(function (response) {
    console.log (response);
    db.query("INSERT INTO employee SET ?",
    {
      first_name: response.first_name, last_name: response.last_name, role_id: response.role_id
    }, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("The employee has been added.")
      mainPrompt()
    })
  });
}


function exit() {
  
}
  
