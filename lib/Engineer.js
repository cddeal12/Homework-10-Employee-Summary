const Employee = require("./Employee");

class Engineer extends Employee {
    // Just like constructor functions, classes can accept arguments
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {return "Engineer"};

    getGithub() {return this.github};
  }

module.exports = Engineer;