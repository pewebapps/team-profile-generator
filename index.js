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
let team = [];

const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is their name?',
        validate: function (name) {
            return emptyStringValidation(name, "name");
        }
    },
    {
        type: 'number',
        name: 'id',
        message: 'employee id?',
        default: "",
        validate: function (id) {
            return numberValidation(id, "employee id")
        },
    },
    {
        type: 'input',
        name: 'team_manager_email',
        message: 'email address?',
        validate: function (email) {
            return emptyStringValidation(email, "email address");
        }
    }
]

const teamManagerQuestions = [
    {
        type: 'number',
        name: 'office_number',
        message: 'office number?',
        default: "",
        validate: function(officeNumber) {
           return numberValidation(officeNumber, "office number")
        }
    }
]

const teamOptionsQuestion = [
    {
        type: 'list',
        name: 'team_options',
        message: 'team menu',
        choices: [
            'Add an engineer',
            'Add an intern',
            'Finish building the team'
        ]
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'github',
        message: 'GitHub username?',
        validate: function(username) {
            return emptyStringValidation(username, "GitHub username");
        }
    }
]

const internQuestion = [
    {
        type: 'input',
        name: 'school',
        message: 'What school do you go to?',
        validate: function(school) {
            return emptyStringValidation(school, "school");
        }
    }
]

const numberValidation = (value, inputField) => {
    if (typeof value !== 'number' || isNaN(value)) {
        console.log(`\nPlease enter a valid number for ${inputField}.`);
        return false;
    } else {
        return true;
    }
} 

const emptyStringValidation = (string, inputField) => {
    if (string) {
        return true;
    } else {
        console.log(`Invalid ${inputField}. Please enter a ${inputField} with at least one character.`);
        return false;
    }
}

const teamManagerPrompt = () => {
    const questions = employeeQuestions.concat(teamManagerQuestions);

    inquirer
        .prompt(questions)
        .then((answers) => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.office_number
            );
            team.push(manager);

            teamOptionsPrompt();
        })
}

const teamOptionsPrompt = () => {
    inquirer
        .prompt(teamOptionsQuestion)
        .then((answers) => {
            switch (answers.team_options) {
                case 'Add an engineer':
                    engineerPrompt();
                    break;
                case 'Add an intern':
                    internPrompt();
                    break;
                case 'Finish building the team':
                    console.log("Render HTML")
                    break;
            }
        })
}

const engineerPrompt = () => {
    const questions = employeeQuestions.concat(engineerQuestions);
    inquirer
        .prompt(questions)
        .then((answers) => {
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
            );
            team.push(engineer);

            teamOptionsPrompt();
        })

}

const internPrompt = () => {
    const questions = employeeQuestions.concat(internQuestion);

    inquirer
        .prompt(questions)
        .then((answers) => {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            team.push(intern);

            teamOptionsPrompt();
        })
}

teamManagerPrompt();

