const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { validate } = require("@babel/types");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const questions = [
    {
        type: 'input',
        name: 'team_manager_name',
        message: 'You will first fill out information about the team manager.\n What is their name?',
        validate: function (name) {
            if (name) {
                return true;
            } else {
                console.log("Invalid name. Please enter a name with at least one character.");
                return false;
            }
        }
    },
    {
        type: 'number',
        name: 'team_manager_id',
        message: 'employee id?',
        default: "",
        validate: function (id) {
            if (isNaN(id)) {
                console.log("Please enter a valid number for employee id.");
                return false;
            } else {
                return true;
            }
        },
    },
    {
        type: 'input',
        name: 'team_manager_email',
        message: 'email address?'
    },
    {
        type: 'number',
        name: 'office_number',
        message: 'office number?',
        default: "",
        validate: function(officeNumber) {
            if (isNaN(officeNumber)) {
                console.log("Please enter a valid number for office number.");
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: 'list',
        name: 'team_options',
        message: 'team menu',
        choices: [
            'Add an engineer',
            'Add an intern',
            'Finish building the team'
        ]
    },
    {
        type: 'input',
        name: 'engineer_name',
        message: 'name of engineer?',
        when: function(answer) {
            if (answer.team_options === 'Add an engineer') {
                return true;
            } else {
                return false;
            }
        }
    }
]

inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
    })
