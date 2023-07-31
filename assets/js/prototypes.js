/**
 * Adding a filter method to the built-in String class
 */
String.prototype.filter = function (...arr) {
    if('object' === typeof arr) arr = arr.map((element, i, array) => element.toLowerCase());
    else if('string' === typeof arr) arr = arr.toLowerCase();

    const words = this.split(" "); let result = "";
    for (let index = 0; index < words.length; index++) {
        if(arr.includes(words[index].toLowerCase())) continue;
        else result += words[index]; 
        
        if(index < words.length - 1) result += " ";
    }
    return result;
}
console.log("Expected output of 'This house is not nice!'.filter('NOT') is 'This house is nice!' and  " 
+ myFunctionTest("This house is nice!", 'This house is not nice!'.filter('NOT')));

/**
 * Adding a bubblleSort method to the built-in Array class
 */
Array.prototype.bubbleSort = function () {
    for (let i = 0; i < this.length; i++) {
        for (let j = i; j < this.length; j++) {
            if(this[j] < this[i]) {
                const temp = this[j];
                this[j] = this[i];
                this[i] = temp;
            }
        }
    }
    return this;
}
console.log("Expected output of [6, 4, 0, 3, -2, 1].bubbleSort() is [-2, 0, 1, 3, 4, 6] and  " 
+ myFunctionTest([-2, 0, 1, 3, 4, 6], [6, 4, 0, 3, -2, 1].bubbleSort()));

/**
 * Inheritance with function constructor
 */
function Person(name) {
    this.name = name;
}

function Teacher(name) {
    Person.call(this, name);
    this.teach = function(subject) {
        return `${this.name} is now teaching ${subject}`;
    }
}

const teacher = new Teacher('Emmanuel');

console.log("Expected output of <<< const teacher = new Teacher('Emmanuel'); teacher.teach('WAP'); >>> using the function constructor is 'Emmanuel is now teaching WAP' and  " 
+ myFunctionTest("Emmanuel is now teaching WAP", teacher.teach('WAP')));

/**
 * Factory method
 */
function createTeacher(name) {
    Person.prototype.teach = function(subject) {
        return `${this.name} is now teaching ${subject}`;
    }
    let person = Object.create(Person.prototype);
    person.name = name;
    return person;
}

const anotherTeacher = createTeacher('Clyde Ruby');
anotherTeacher.teach('Algorithm');

console.log("Expected output of <<< const tanotherTeacher = createTeacher('Clyde Ruby'); anotherTeacher.teach('Algorithm'); >>> using the function constructor is 'Clyde Ruby is now teaching Algorithm' and  " 
+ myFunctionTest("Clyde Ruby is now teaching Algorithm", anotherTeacher.teach('Algorithm')));


/**
 * Person, Student, and Professor using Object Prototype
 */
const NewPerson = {
    name: '',
    age: 0,

    greeting: () => `Greetings, my name is ${this.name} and I am ${this.age} years old.`,
    salute: () => `Good morning!, and in case I dont see you, good afternoon, good evening and good night!`
}

const Student = Object.create(NewPerson);
Student.greeting = function() { return `Hey, my name is ${this.name} and I am studying ${this.major}.`;}

const student = Object.create(Student);
student.name = 'Emmanuel';
student.age = 32;
student.major = 'Computer Science';

const Professor = Object.create(NewPerson);
Professor.department = null;
Professor.greeting = function() { return `Good day, my name is ${this.name} and I am in the ${this.department} department.`;}

console.log("Expected output of <<< const student = Student('Emmanuel', 32, 'Computer Science'); student.greeting(); >>> using the Object prototype is 'Hey, my name is Emmanuel and I am studying Computer Science.' and  " 
+ myFunctionTest("Hey, my name is Emmanuel and I am studying Computer Science.", student.greeting()));

console.log("And the expected output of <<< student.salute(); >>> using the Object prototype is 'Good morning!, and in case I dont see you, good afternoon, good evening and good night!' and  " 
+ myFunctionTest("Good morning!, and in case I dont see you, good afternoon, good evening and good night!", student.salute()));

/**
 * Person, Student, and Professor using Constructor functions
 */
function NewPersonUsingConstructor(name, age) {
    this.name = name;
    this.age = age;

    this.greeting = () => { return `Greetings, my name is ${this.name} and I am ${this.age} years old.`; }
    this.salute = () => { return `Good morning!, and in case I dont see you, good afternoon, good evening and good night!`; }
}

function StudentUsingConstructor(name, age, major) {
    NewPersonUsingConstructor.call(this, name, age);
    this.major = major;

    this.greeting = () => {
        return `Hey, my name is ${this.name} and I am studying ${this.major}.`;
    }
}

function ProfessorUsingConstructor(name, age, department) {
    NewPersonUsingConstructor.call(this, name, age);
    this.department = department;

    this.greeting = () => {
        return `Good day, my name is ${this.name} and I am in the ${this.department} department.`;
    }
}

const professor = new ProfessorUsingConstructor('Koffy', 35, 'ComPro');

console.log("Expected output of <<< const professor = new ProfessorUsingConstructor('Koffy', 35, 'ComPro'); professor.greeting(); >>> using the Constructor functions is 'Good day, my name is Koffy and I am in the ComPro department.' and  " 
+ myFunctionTest("Good day, my name is Koffy and I am in the ComPro department.", professor.greeting()));

console.log("And the expected output of <<< professor.salute(); >>> using the Constructor functions is 'Good morning!, and in case I dont see you, good afternoon, good evening and good night!' and  " 
+ myFunctionTest("Good morning!, and in case I dont see you, good afternoon, good evening and good night!", professor.salute()));

/**
 * Test function
 */
function myFunctionTest(expected, func) {
    if(typeof expected === 'object') {
        if(expected.length !== func.length) return "TEST FAILED";
        for (let i = 0; i < expected.length; i++) {
            if(expected[i] !== func[i]) return "TEST FAILED";            
        }
        return "TEST SUCCEEDED";
    }
    if(expected === func) return "TEST SUCCEEDED";
    return "TEST FAILED";
}