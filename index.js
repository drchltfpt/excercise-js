const studentList = [];

// Class define student object
class Student {

    // Attribute calculate Student's GPA 
    calculateGpa(mathGrade, physGrade, chemGrade) {
        return ((mathGrade + physGrade + chemGrade) / 3).toFixed(2);
    };

    // Attribute get Student's rank from GPA
    ranking(studentGpa) {

        if (studentGpa >= 8) {
            return 'Excellence';
        }

        else if (studentGpa >= 6.5) {
            return 'Good';
        }

        else if (studentGpa >= 5) {
            return 'Pass';
        }

        else {
            return 'Not pass';
        }
    };
}


// class Validator {

//     static isNameValid(name) { return false; }

//     // Function checking valid student name
//     isValidName(name) {
//         const regexName = /^[a-zA-Z ]+$/;

//         if (name == "") {
//             alert("Please enter student name!");
//             return false;
//         }

//         if (regexName.test(name)) {
//             return true;
//         }

//         alert("Please enter valid student name!");
//         return false;
//     };

//     // Function checking valid student grade (re-use)
//     isValidGrade(grade) {
//         const regexNum = /^\d+$/;
//         if (!grade) {
//             return false;
//         }

//         if (!regexNum.test(grade)) {
//             return false;
//         }

//         if (grade <= 0 || grade >= 10) {
//             return false;
//         }

//         return true;
//     };

//     // Function checking valid student math grade
//     isValidMathGrade(grade) {
//         if (grade === '') {
//             alert("Please enter Math point!");
//             return false;
//         }

//         if (!this.isValidGrade(grade)) {
//             alert("Please enter Math valid point!");
//             return false;
//         }

//         return true;
//     };

//     // Function checking valid student physical grade
//     isValidPhysicalGrade(grade) {
//         if (grade === "") {
//             alert("Please enter Physical point!");
//             return false;
//         }
//         if (!this.isValidGrade(grade)) {
//             alert("Please enter Physical valid point!");
//             return false;
//         }
//         return true;
//     };

//     // Function checking valid student chemistry grade
//     isValidChemistryGrade(grade) {

//         if (grade === "") {
//             alert("Please enter Chemistry point!");
//         }

//         if (!this.isValidGrade(grade)) {
//             alert("Please enter Chemistry valid point!");
//             return false;
//         }
//         return true;
//     };

//     // Function checking valid data to create an Student object
//     isDataValid(name, mathGrade, physGrade, chemGrade) {
//         return this.isValidName(name) !== false
//             && this.isValidMathGrade(mathGrade) !== false
//             && this.isValidPhysicalGrade(physGrade) !== false
//             && this.isValidChemistryGrade(chemGrade) !== false;
//     };

// }

// Main function process submit button

class Validator {

    static validateName(name) {
        const regexName = /^[a-zA-Z ]+$/;

        if (!name) {
            const error = new Error('Please enter a student name');
            error.type = 'Empty';
            throw error;
        }

        if (regexName.test(name)) {
            const error = new Error('Please enter a valid student name');
            error.type = 'Invalid';
            throw error;
        }
    }

    
}

function getInfoStudent() {

    let name = document.getElementById("name").value;
    let mathGrade = parseFloat(document.getElementById("math").value);
    let physGrade = parseFloat(document.getElementById("phys").value);
    let chemGrade = parseFloat(document.getElementById("chem").value);


    var validator = new Validator();

    // Condition checking data after create an Student object
    if (validator.isDataValid(name, mathGrade, physGrade, chemGrade)) {

        const student = new Student();

        const studentGPA = student.calculateGpa(mathGrade, physGrade, chemGrade);

        const studentRank = student.ranking(studentGPA);

        // Showing GPA
        document.getElementById("gpa").innerText = studentGPA;
        // Showing Rank
        document.getElementById('rank').innerHTML = studentRank;

        // pushing information student object to a list
        studentList.push({
            name: name,
            rank: studentRank,
            gpa: studentGPA
        });

        // showing list in table
        addRow('student-table', studentList[studentList.length - 1]);
        console.log(studentList);

        resetForm();

        return student;

    }

}

// Function reset Grade Point Average form
function resetForm() {
    const rowId = document.querySelectorAll("#name, #math, #phys, #chem");

    rowId.forEach(element => {
        element.value = "";
    });
}

// Function add Student's information row in table
function addRow(tableId, studentListItem) {
    // Get a reference to the table
    const tableRef = document.getElementById(tableId);

    // Insert a row at the end of the table
    const newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    const cellName = newRow.insertCell(0);
    const cellRank = newRow.insertCell(1);
    const cellGPA = newRow.insertCell(2);

    // Append a text node to the cell
    const newName = document.createTextNode(studentListItem.name);
    cellName.appendChild(newName);

    const newRank = document.createTextNode(studentListItem.rank);
    cellRank.appendChild(newRank);

    const newGPA = document.createTextNode(studentListItem.gpa);
    cellGPA.appendChild(newGPA);
}




