class Person {
    constructor(initKey, initFirstName, initLastName) {
        this.key = initKey;
        this.firstName = initFirstName;
        this.lastName = initLastName;
    }
    
    toString() {
        return this.firstName + " " + this.lastName;
    }
}

class Employee extends Person {
    constructor(initKey, initFirstName, initLastName, initSalary) {
        super(initKey, initFirstName, initLastName);
        this.salary = initSalary;
    }

    toString() {
        return super.toString() + " ($" + this.salary.toLocaleString() + ")";
    }
}

class Student extends Person {
    constructor(initKey, initFirstName, initLastName, initGPA) {
        super(initKey, initFirstName, initLastName);
        this.gpa = initGPA;
    }

    toString() {
        return super.toString() + " (" + this.gpa.toFixed(1) + " GPA)";
    }
}

class Undergraduate extends Student {
    constructor(initKey, initFirstName, initLastName, initGPA, initStanding) {
        super(initKey, initFirstName, initLastName, initGPA);
        this.standing = initStanding;
    }

    toString() {
        return this.firstName + " " + this.lastName + " (" + this.standing + " - " + this.gpa.toFixed(1) + " GPA)";
    }
}

export {Person, Employee, Student, Undergraduate};