// importing packages
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const displayTable = require('console.table');

// dynamic port
const PORT = process.env.PORT || 3001;
// instance of express
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database:'business_db'
    },
    console.log(`Connected to the business_db database.`)
);

// default responst for other requests
app.use((req,res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// start inquirer
// display/ask questions 

function startMgr() {
    inquirer.prompt([
        {
            type: "list",
            name: "firstChoice",
            message: "What would you like to manage?",
            choices: [
                "View all departments",
                "View all roles", 
                "View all employees", 
                "Add a department", 
                "Add a role", 
                "Add an employee"
            ]
        }
    ])
    .then((answers) => {
        if(answers.firstChoice=== "View all departments"){
            db.query('SELECT * FROM depts', function (err, results){
            console.table(results);
            });
        } else if(answers.firstChoice=== "View all roles"){
            db.query('SELECT * FROM roles', function (err, results){
            console.table(results);
            });
        } else if(answers.firstChoice=== "View all employees"){
            db.query('SELECT * FROM employees', function (err, results){
            console.table(results);
            });
        } else if(answers.firstChoice=== "Add a department"){
            inquirer.prompt([
                {
                    type:'input',
                    message: "Department Name:",
                    name: 'deptName'
                },
            ])
            .then(ans=>{
                console.log(ans)
                db.query('INSERT INTO depts(dept_name) VALUES(?)', [ans.deptName], (err,results)=>{
                    if(err)
                        throw err
                    db.query('SELECT * FROM depts', (err,results)=>{
                        if(err)
                            throw err
                        console.table('\n', results)}
                    )})
            })
        } else if(answers.firstChoice=== "Add a role"){
            inquirer.prompt([
                {
                    type:'input',
                    message: "Title:",
                    name: 'roleTitle'
                },
                {
                    type:'input',
                    message: "Salary:",
                    name: 'roleSalary'
                },
                {
                    type:'input',
                    message: "Department ID(#):",
                    name: 'roleID'
                },
            ])
            .then(ans=>{
                console.log(ans)
                db.query('INSERT INTO roles(title, salary, dept_id) VALUES(?, ?, ?)', [
                    ans.roleTitle, 
                    ans.roleSalary, 
                    ans.roleID
                ], 
                (err,results)=>{
                    if(err)
                        throw err
                    db.query('SELECT * FROM roles', (err,results)=>{
                        if(err)
                            throw err
                        console.table('\n', results)}
                    )})
            })
        } else if(answers.firstChoice=== "Add an employee"){
            inquirer.prompt([
                {
                    type:'input',
                    message: "First Name:",
                    name: 'firstName'
                },
                {
                    type:'input',
                    message: "Last Name:",
                    name: 'lastName'
                },
                {
                    type:'input',
                    message: "Role ID:",
                    name: 'empRoleID'
                },
                {
                    type:'input',
                    message: "Manager ID:",
                    name: 'manID'
                },
            ])
            .then(ans=>{
                console.log(ans)
                db.query('INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', 
                [
                    ans.firstName, 
                    ans.lastName, 
                    ans.empRoleID, 
                    ans.manID
                ], 
                (err,results)=>{
                    if(err)
                        throw err
                    db.query('SELECT * FROM employees', (err,results)=>{
                        if(err)
                            throw err
                        console.table('\n', results)}
                    )})
            })
        }
    })
}


startMgr();
