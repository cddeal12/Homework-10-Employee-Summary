const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this team's manager?",
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

function addOthers() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of team member will you add?",
            name: "typeToAdd",
            choices: ["Engineer", "Intern"]
        },
    ]).then(function(response) {
        if (response.typetoAdd === "Engineer") {
            addEngineer();
        } else {
            addIntern();
        };
    });
}

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


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
        };
    });
};

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
