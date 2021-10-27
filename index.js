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
        let employees = rows;
        console.table(employee);
    }).then(() => mainPrompt())

}
function viewAllDepartments() {
    db.queryAllDepartments()
    .then(([rows]) => {
        let departments = rows;
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
}
function addEmployee() {
  inquirer.prompt({
    name:"addEmployee",
    type:"input",
    message:"What is the new employee name?"
  })
    db.createEmployee()
    .then(([rows]) => {
        let employee = rows;
        console.table(employee);
    }).then(() => mainPrompt())
}
  


function exit() {

}
