const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Initializes the teamMembers as an array
const teamMembers = [];

// Adds a manager, each team requires one, so this function is run first and only once.
function addManager() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Hello! This command line app will build an html file to display your development team's information.",
            name: "confirmed",
        },
        {
            type: "input",
            message: "To get started, what is the name of this team's manager?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the manager's ID number?",
            name: "managerId"
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "managerOffice"
        }
    ]).then(function(response) {
        const manager = new Manager (response.managerName, response.managerId, response.managerEmail, response.managerOffice);
        teamMembers.unshift(manager);
        addOthers();
    });
}

// Asks the user what kind of team member they will add next, gets called after the manager is created, and after the user answers yes in askForNewMember()
function addOthers() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of team member will you add next?",
            name: "typeToAdd",
            choices: ["Engineer", "Intern"]
        },
    ]).then(function(response) {
        if (response.typeToAdd === "Engineer") {
            addEngineer();
        } else {
            addIntern();
        };
    });
}

// Adds an engineer to the team array based on prompts to the user
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is the engineer's ID number?",
            name: "engineerId"
        },
        {
            type: "input",
            message: "What is the engineer's email address?",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "What is the engineer's Github username?",
            name: "engineerGithub"
        }
    ]).then(function(response) {
        var engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
        teamMembers.unshift(engineer);
        askForNewMember();
    });
}

// Adds an intern to the team array based on prompts to the user
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "internName"
        },
        {
            type: "input",
            message: "What is the intern's ID number?",
            name: "internId"
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "internEmail"
        },
        {
            type: "input",
            message: "What school did the intern attend?",
            name: "internSchool"
        }
    ]).then(function(response) {
        var intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        teamMembers.unshift(intern);
        askForNewMember();
    });
}

// Asks the user whether to add another member after each engineer and intern has been added, redirects to addOthers() if yes, writes the html if no
function askForNewMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Add another team member?",
            name: "answer",
            choices: ["Yes", "No"]
        }
    ]).then(function(response) {
        if (response.answer === "Yes") {
            addOthers();
        } else if (response.answer === "No") {
            const htmlRender = render(teamMembers);
            fs.writeFile("./output/team.html", htmlRender, function(err) {
                if (err) {
                  return console.log(err);
                }
                console.log("Successfully Wrote team.html in the output folder!")
            });
        };
    });
};

addManager();
