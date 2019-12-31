const studentList = [];

// Class define student object
class Student {

    // Attribute calculate Student's GPA 
    calculateGpa(mathGrade, physGrade, chemGrade) {
        return ((mathGrade + physGrade + chemGrade) / 3).toFixed(2);
    };

    // Attribute get Student's rank from GPA
    ranking(studentGpa) {

        switch (true) {
            case studentGpa >= 8:
                return "Excellence";
            case studentGpa >= 6.5:
                return "Good";
            case studentGpa >= 5:
                return "Pass";
            case studentGpa < 5:
                return "Not pass";
        }
    };
}

class Validator {

    // Function checking valid student name
    static validateName(name) {
        const regexName = /^[a-zA-Z ]+$/;

        if (!name) {
            const error = new Error('Please enter a student name');
            error.type = 'Empty';
            throw error;
        }

        if (!regexName.test(name)) {
            const error = new Error('Please enter a valid student name');
            error.type = 'Invalid';
            throw error;
        }
    }

    // Function checking valid student grade (re-use)
    static isValidGrade(grade) {
        const regexNum = /^\d+$/;
        if (!grade) {
            return false;
        }

        if (!regexNum.test(grade)) {
            return false;
        }

        if (grade <= 0 || grade >= 10) {
            return false;
        }

        return true;
    };

    // Function checking valid student math grade
    static validateMathGrade(grade) {
        if (!grade) {
            const error = new Error('Please enter Math grade !!!');
            error.type = 'Empty';
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error('Please enter a valid Math grade');
            error.type = 'Invalid';
            throw error;
        }
    }

    // Function checking valid student physical grade
    static validatePhysicalGrade(grade) {
        if (!grade) {
            const error = new Error('Please enter Physical grade !!!');
            error.type = 'Empty';
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error('Please enter a valid Physical grade');
            error.type = 'Invalid';
            throw error;
        }
    }

    // Function checking valid student chemistry grade
    static validateChemicalGrade(grade) {
        if (!grade) {
            const error = new Error('Please enter Chemical grade !!!');
            error.type = 'Empty';
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error('Please enter a valid Chemical grade');
            error.type = 'Invalid';
            throw error;
        }
    }

}

// Main function process submit button
$(document).ready(function () {
    // Main function process submit button
    $("#submit").click(function getInfoStudent() {

        try {

            // Get and validate data 
            const name = document.getElementById("name").value;
            Validator.validateName(name);
            const mathGrade = parseFloat(document.getElementById("math").value);
            Validator.validateMathGrade(mathGrade);
            const physGrade = parseFloat(document.getElementById("phys").value);
            Validator.validatePhysicalGrade(physGrade);
            const chemGrade = parseFloat(document.getElementById("chem").value);
            Validator.validateChemicalGrade(chemGrade);

            const student = new Student();

            const studentGPA = student.calculateGpa(mathGrade, physGrade, chemGrade);

            const studentRank = student.ranking(studentGPA);

            // Showing GPA
            document.getElementById("gpa").innerText = studentGPA;
            // Showing Rank
            document.getElementById('rank').innerHTML = studentRank;

            // Pushing information student object to a list
            studentList.push({
                name: name,
                rank: studentRank,
                gpa: studentGPA
            });

            // Showing list in table
            addRow('student-table', studentList[studentList.length - 1]);

            // Reset form
            resetForm();

            return student;

        } catch (error) {
            switch (error.type) {
                case 'Empty':
                    alert(error.message);
                    break;
                case 'Invalid':
                    alert(error.message);
                    break;
            }
        }

    });
})

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




