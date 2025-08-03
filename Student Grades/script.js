const students=[];

function submitData() {
    const name = document.getElementById("studentName").value.trim();
    const sub = document.getElementById("subject").value.trim();
    const all_marks = parseInt(document.getElementById("marks").value);

    if (isNaN(all_marks) || all_marks < 0 || all_marks > 100) {
        alert("Please fill all the fields.");
        return;
    }


    let grade="";
    if (all_marks>=90 && all_marks<=100) grade="Grade A";
    else if (all_marks>=75 && all_marks<=89) grade="Grade B";
    else if (all_marks>=50 && all_marks<=74) grade="Grade C";
    else if (all_marks<50) grade="Fail";

    const student={name, sub, all_marks, grade};
    students.push(student);

    document.getElementById("record").innerText = `Name: ${name}\nSubject: ${sub}\nMarks: ${all_marks}\n${grade}`;
    document.getElementById("total").innerText = `Total Students: ${students.length}`;

    console.clear();
    console.table(students);
    console.log(`Record:\nName: ${name}\nSubject: ${sub}\nMarks: ${all_marks}\nGrade: ${grade}`);

    document.getElementById("studentName").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("marks").value = "";

}


function clearAll() {
    students.length=0;
    document.getElementById("studentName").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("record").innerText = "";
    document.getElementById("total").innerText = "";
    console.clear();
    alert("All student details cleared!");
}