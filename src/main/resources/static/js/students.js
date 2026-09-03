const form = document.getElementById("student_form");


// ADD STUDENT
if (form) {

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = form.elements["full_name"].value;
        const email = form.elements["email"].value;
        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email.");
            return;
        }

        try {

            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            });

            if (!response.ok) {
                throw new Error("Server returned: " + response.status);
            }

            const student = await response.json();

            alert("Student added successfully!\nID: " + student.id);

            form.reset();

        } catch (error) {

            console.error("ERROR:", error);
            alert("Cannot connect to Spring Boot server.");

        }

    });

}


// DISPLAY STUDENTS
async function loadStudents() {

    const table = document.getElementById("studentTable");

    if (!table) {
        return;
    }

    try {

        const response = await fetch("/api/students");

        if (!response.ok) {
            throw new Error("Server returned: " + response.status);
        }

        const students = await response.json();

        for (let i = 0; i < students.length; i++) {

            const student = students[i];

            const row = table.insertRow();

            row.insertCell(0).textContent = student.id;
            row.insertCell(1).textContent = student.name;
            row.insertCell(2).textContent = student.email;

            const actionCell = row.insertCell(3);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            
            editButton.onclick = function() {
                editStudent(student.id);
            };
            
            actionCell.appendChild(editButton);
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            
            deleteButton.onclick = function() {
                deleteStudent(student.id);
            };
            
            actionCell.appendChild(deleteButton);
        }
        const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchValue = searchInput.value.toLowerCase();

        const rows = table.getElementsByTagName("tr");

        for (let i = 1; i < rows.length; i++) {

            const name = rows[i].cells[1].textContent.toLowerCase();

            if (name.includes(searchValue)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }

        }

    });

}

    } catch (error) {

        console.error("ERROR:", error);
        alert("Cannot load students.");

    }
}


// DELETE STUDENT
async function deleteStudent(id) {

    try {

        const response = await fetch("/api/students/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("Student deleted successfully!");

        location.reload();

    } catch (error) {

        console.error("ERROR:", error);
        alert("Cannot delete student.");

    }
}


// LOAD STUDENTS
async function editStudent(id) {

    const name = prompt("Enter new name:");

    if (name === null) {
        return;
    }

    const email = prompt("Enter new email:");

    if (email === null) {
        return;
    }

    try {

        const response = await fetch("/api/students/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }

        alert("Student updated successfully!");

        location.reload();

    } catch (error) {

        console.error("ERROR:", error);
        alert("Cannot update student.");
    }
}
loadStudents();
