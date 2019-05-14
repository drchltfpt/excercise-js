let studentList = [];
const studentListDisplay = [];

// Class define student object
class Student {

    constructor(name) {
        this.Name = name;
    }

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
    $(".student-submit").click(() => {
        $.post("/index", function (data, status) {
            studentList = data[0].data;
            try {
                for (i = 1; i < studentList.length; i++) {

                    const name = studentList[i][0];
                    Validator.validateName(name);
                    const mathGrade = parseFloat(studentList[i][1]);
                    Validator.validateMathGrade(mathGrade);
                    const physGrade = parseFloat(studentList[i][2]);
                    Validator.validatePhysicalGrade(physGrade);
                    const chemGrade = parseFloat(studentList[i][3]);
                    Validator.validateChemistryGrade(chemGrade);

                    // Condition checking data after create an Student object
                    const student = new Student();

                    const studentGpa = student.calculateGpa(mathGrade, physGrade, chemGrade);

                    const studentRanking = student.ranking(studentGpa);

                    // Pushing information student object to a list
                    studentListDisplay.push({
                        name: name,
                        rank: studentRanking,
                        gpa: studentGpa
                    });


                }

                h1Animation();

                // Display title of rows
                $("#student-table").fadeIn("slow");

                // Display notification for add a new student to the table
                $("#notify-upload").fadeOut("slow");

                notifySuccessAni();

                buttonAnimation();
                studentsAdd(studentListDisplay);
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
    $(".student-choose").click(() => {
        $.post("/upload", function (data, status) {
            console.log(data);
        });
    });
});

async function notifySuccessAni() {
    await $("#notify-success").animate({
        fontSize: "15px",
    }, "slow");
    await $("#notify-success").fadeIn("slow");
    await $("#notify-success").fadeOut("slow");
}

async function h1Animation() {
    await $("h1").animate({
        fontSize: "50px",
    }, "slow");
    await $("h1").animate({
        fontSize: "35px",
    }, "slow");
}

async function buttonAnimation() {
    await $(".student-submit").animate({
        height: "40px",
        width: "120px",
        backgroundColor: "yellow",
    });
    await $(".student-submit").animate({
        height: "30px",
        width: "100px",
    });
    await $(".student-submit").attr("disabled", true);
}

// Function add student to the table 
function studentsAdd(studentList) {

    if ($("#student-table tbody").length == 0) {
        $("#student-table").append("<tbody></tbody>");
    }

    for (i = 0; i < studentList.length; i++) {
        $("#student-table tbody").append(
            "<tr>" +
            "<td>" + studentList[i].name + "</td>" +
            "<td>" + studentList[i].rank + "</td>" +
            "<td>" + studentList[i].gpa + "</td>" +
            "</tr>"
        );
    }

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




