const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const questions = [
    {
        type: 'input',
        name: 'team_manager_name',
        message: 'You will first fill out information about the team manager.\n What is their name?'
    },
    {
        type: 'number',
        name: 'team_manager_id',
        message: 'employee id?'
    },
    {
        type: 'input',
        name: 'team_manager_email',
        message: 'email address?'
    },
    {
        type: 'number',
        name: 'office_number',
        message: 'office number?'
    }
]

inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
    })
