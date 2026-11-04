
// ==========================================
// 1. Student Class & Constructor
// ==========================================

class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // Calculate Average using reduce
    calculateAverage() {
        let total = this.grades.reduce((sum, grade) => {
            return sum + grade;
        }, 0);

        return total / this.grades.length;
    }

    // Get Student Grade
    getGrade(average) {
        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // Check Final Result using &&
    getFinalResult(average) {
        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}


// ==========================================
// 2. Create Students Objects Array
// ==========================================

let studentsList = [

    new Student(101, "Ahmed", [90, 85, 95], 90),

    new Student(102, "Sara", [45, 48, 42], 80),

    new Student(103, "Omar", [70, 75, 80], 85),

    new Student(104, "Mona", [40, 45, 48], 70)

];


// ==========================================
// 3. Students Reports
// ==========================================

console.log("========== ALL STUDENTS REPORT ==========");

let studentsTable = document.getElementById("studentsTable");

studentsList.forEach(student => {

    let average = student.calculateAverage();

    let grade = student.getGrade(average);

    let result = student.getFinalResult(average);

    console.log("------------------------------");
    console.log("Student Name:", student.name);
    console.log("Average:", average.toFixed(2));
    console.log("Grade:", grade);
    console.log("Final Result:", result);

    studentsTable.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.grades.join(" - ")}</td>
            <td>${student.attendance}%</td>
            <td>${average.toFixed(2)}</td>
            <td>${grade}</td>
            <td class="${result === "ناجح" ? "passed" : "failed"}">
                ${result}
            </td>
        </tr>
    `;
});


// ==========================================
// 4. Filter Students Needing Mercy Marks
// ==========================================

let studentsNeedingMercy = studentsList.filter(student => {

    let average = student.calculateAverage();

    return average >= 40 && average <= 49;

});


// ==========================================
// 5. Add 5 Mercy Marks using map
// ==========================================

let mercyStudents = studentsNeedingMercy.map(student => {

    let oldAverage = student.calculateAverage();

    let newAverage = oldAverage + 5;

    return {
        id: student.id,
        name: student.name,
        oldAverage: oldAverage,
        newAverage: newAverage
    };

});


// ==========================================
// 6. Calculate Total using reduce
// ==========================================

let totalNewAverages = mercyStudents.reduce((sum, student) => {

    return sum + student.newAverage;

}, 0);


// ==========================================
// 7. Calculate Mercy Average
// ==========================================

let mercyAverage = mercyStudents.length > 0
    ? totalNewAverages / mercyStudents.length
    : 0;


// ==========================================
// 8. Display Mercy Committee in HTML
// ==========================================

let mercyTable = document.getElementById("mercyTable");

if (mercyStudents.length > 0) {

    mercyStudents.forEach(student => {

        mercyTable.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.oldAverage.toFixed(2)}</td>
                <td>${student.newAverage.toFixed(2)}</td>
            </tr>
        `;

    });

} else {

    mercyTable.innerHTML = `
        <tr>
            <td colspan="4">No students need mercy marks.</td>
        </tr>
    `;

}


// ==========================================
// 9. Display Academic Summary in HTML
// ==========================================

document.getElementById("totalStudents").textContent =
    studentsList.length;

document.getElementById("mercyCount").textContent =
    mercyStudents.length;

document.getElementById("mercyAverage").textContent =
    mercyAverage.toFixed(2);


// ==========================================
// 10. Console Logging
// ==========================================

console.log("========== MERCY COMMITTEE ==========");

console.log("Students who received mercy marks:");

console.table(mercyStudents);

console.log(
    "Average after mercy marks:",
    mercyAverage.toFixed(2)
);

console.log(
    "Total number of mercy students:",
    mercyStudents.length
);

console.log("========== END OF REPORT ==========");
