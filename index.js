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
                return 'Excellence';
            case studentGpa >= 6.5:
                return 'Good';
            case studentGpa >= 5:
                return 'Pass';
            case studentGpa < 5:
                return 'Not pass';
        }
    };
}


$(document).ready(function () {
    // Main function process submit button
    $("button").click(function getInfoStudent() {

        try {
            const name = $("#name").val();
            Validator.validateName(name);
            const mathGrade = parseFloat($("#math").val());
            Validator.validateMathGrade(mathGrade);
            const physGrade = parseFloat($("#phys").val());
            Validator.validatePhysicalGrade(physGrade);
            const chemGrade = parseFloat($("#chem").val());
            Validator.validateChemistryGrade(chemGrade);

            $("button").animate({
                height: "40px",
                width: "120px",
                backgroundColor: "yellow",
            }).animate({
                height: "30px",
                width: "100px",
            });

            $("h1").animate({
                fontSize: "50px",
            }, "slow").animate({
                fontSize: "35px",
            }, "slow");

            // Condition checking data after create an Student object

            const student = new Student();

            const studentGpa = student.calculateGpa(mathGrade, physGrade, chemGrade);

            const studentRanking = student.ranking(studentGpa);

            // Showing GPA
            $("#gpa").text(studentGpa);

            // Showing Rank
            $("#rank").text(studentRanking);

            // Display title of rows
            $("#student-table").fadeIn("slow");

            // Pushing information student object to a list
            studentList.push({
                name: name,
                rank: studentRanking,
                gpa: studentGpa
            });

            // Display notification for add a new student to the table
            $("p").animate({
                fontSize: "15px",
            }, "slow").fadeIn("slow").fadeOut("slow");

            // Showing list in table
            studentsAdd(name, studentRanking, studentGpa);

            resetForm();

            return student;

        }
        catch (error) {
            switch (error.type) {
                case 'Empty':
                    alert(error.message);
                    break;
                case "Invalid":
                    alert(error.message);
                    break;
            }
        }

    });
});

// Function reset Grade Point Average form
function resetForm() {
    $("input").val("");
}

// Function add student to the table 
function studentsAdd(name, rank, gpa) {

    if ($("#student-table tbody").length == 0) {
        $("#student-table").append("<tbody></tbody>");
    }

    $("#student-table tbody").append(
        "<tr>" +
        "<td>" + name + "</td>" +
        "<td>" + rank + "</td>" +
        "<td>" + gpa + "</td>" +
        "</tr>"
    );
}

class Validator {

    // Function checking valid student name
    static validateName(name) {

        const regexName = /^[a-zA-Z ]+$/;

        if (!name) {
            const error = new Error("Please enter student name");
            error.type = "Empty";
            throw error;
        }

        if (!regexName.test(name)) {
            const error = new Error("Please enter a valid student name");
            error.type = "Invalid";
            throw error;
        }
    }

    // Function checking valid student grade (re-use)
    static isValidGrade(grade) {

        const regexGrade = /^\d+$/;

        if (!grade) {
            return false;
        }

        if (!regexGrade.test(grade)) {
            return false;
        }

        if (grade < 0 || grade > 10) {
            return false;
        }

        return true;
    }

    // Function checking valid student math grade
    static validateMathGrade(grade) {

        if (!grade) {
            const error = new Error("Please enter Math grade");
            error.type = "Empty";
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error("Please enter a valid Math grade");
            error.type = "Invalid";
            throw error;
        }

    }

    // Function checking valid student physical grade
    static validatePhysicalGrade(grade) {

        if (!grade) {
            const error = new Error("Please enter Physical grade");
            error.type = "Empty";
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error("Please enter a valid Physical grade");
            error.type = "Invalid";
            throw error;
        }
    }

    // Function checking valid student chemistry grade
    static validateChemistryGrade(grade) {

        if (!grade) {
            const error = new Error("Please enter Chemistry grade");
            error.type = "Empty";
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error("Please enter a valid Chemistry grade");
            error.type = "Invalid";
            throw error;
        }

    }

}



