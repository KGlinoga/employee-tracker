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

// query database placeholder for initial code build
// db.query('SELECT * FROM depts', function (err, results){
//     console.log(results);
// });

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
            choices: ["View all departments","View all roles", "View all employees", "Add a department", "Add a role", "Add an employee"]
        }
    ])
    .then((answers) => {
        if(answers.firstChoice=== "View all departments"){
            db.query('SELECT * FROM depts', function (err, results){
            console.table(results);
            });
        }
    })
};

startMgr();
