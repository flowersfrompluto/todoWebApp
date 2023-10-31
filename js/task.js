let taskName = document.getElementById("taskName");
// let newTask = document.getElementById("newTask");
let newTask = document.querySelectorAll("#newTask") ;
let taskStatus = document.getElementById("status");
let category = document.getElementById("category");
let priority = document.getElementById("priority");
let dueDate = document.getElementById("dueDate");
let dueTime = document.getElementById("dueTime");
let error = document.getElementById("error");
let addTaskBtn = document.getElementById("addTaskBtn");
let saveTaskBtn = document.getElementById("saveTaskBtn");
let deleteBtn = document.getElementById("deleteBtn");
let tasksCard = document.getElementById("tasksCard");
let priorityColor = document.getElementById("priorityColor");
let task = document.getElementById("lists");
let date = new Date().toLocaleString().replace('/', '-').replace('/', '-');
let card = document.getElementById("card")
let taskCreated = []
console.log("today is " + date);
showTasks()

addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault()
    addElement()
});
saveTaskBtn.addEventListener("click", function (e) {
    e.preventDefault()
    validateTask()
});

function addElement() {
    let newTask = document.createElement("input")
    newTask.placeholder = "Type Task"
    newTask.setAttribute("id", "newTask")
    task.appendChild(newTask)
}

// function removeElement() {
//     let addedTask = document.removeElement("input")
//     // let newTask = document.createElement("input")
//     newTask.placeholder = "Type Task"
//     newTask.setAttribute("id", "newTask")
//     task.appendChild(newTask)
// }

function taskSuccess() {
    if (taskName.value != "" &&
        newTask.value != "" &&
        taskStatus.value != "" &&
        category.value != "" &&
        priority.value != "" &&
        dueDate.value != "" &&
        dueTime.value != "") {
        let listTask = newTask.value
        taskCreated.push(listTask)
        console.log(listTask);
        return true;
    }
};

function taskFailed() {
    if (taskName.value == "" &&
        newTask.value == "" &&
        taskStatus.value == "" &&
        category.value == "" &&
        priority.value == "" &&
        dueDate.value == "" &&
        dueTime.value == "") {
        return true;
    }
};

function clearField() {
    taskName.value = ""
    newTask.value = ""
    taskStatus.value = ""
    category.value = ""
    priority.value = ""
    dueDate.value = ""
    dueTime.value = ""
};

function createTask() {
    const task = {
        user_id: "",
        title: taskName.value,
        tasks: taskCreated,
        status: taskStatus.value,
        category: category.value,
        priority: priority.value,
        due_date: dueDate.value,
        due_time: dueTime.value,
        created_at: date
    }
    fetch("https://6538e362a543859d1bb22212.mockapi.io/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            alert("Task Creation Failed!")
        }
    }).then(data => {
        alert("Task Created", data)
        showTasks()
    }).catch(error => {
        console.log("error", error)
    })
}

function validateTask(created, failed) {
    created = taskSuccess()
    failed = taskFailed

    if (created) {
        createTask()
        clearField()
    } else if (failed) {
        error.innerText = "All fields required"
    }
}

this.deleteBtn.addEventListener("click", function () {

    let siteId = window.location.search;
    let siteIdParam = new URLSearchParams(siteId);
    let id = siteIdParam.get("id");

    fetch("https://6538e362a543859d1bb22212.mockapi.io/todos" + id, {
        method: "DELETE",

    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            alert("Delete Task Unsuccessful!")
        }
    }).then(data => {
        alert("Delete Task Unsuccessful!", data)
    }).catch(error => {
        console.log("error", error)
    })
})

async function showTasks() {
    const response = await fetch(
        "https://6538e362a543859d1bb22212.mockapi.io/todos"
    );
    if (response.ok) {
        const data = await response.json();
        data.forEach((taskData) => {
            tasksCard.innerHTML += `
                <div class="taskBody">
                    <p>Date Created: ${taskData.created_at} </p>
                    <h2>TITLE: ${taskData.title}</h2>
                    <div class="background">
                        <div>
                            <h3>TASKS CREATED:</h3>
                            <div>
                            <p>${taskData.tasks}</p>
                            </div>
                        </div>
                    </div>
                    <h3>TASK STATUS: ${taskData.status}</h3>
                    <h3>TASK CATEGORY: ${taskData.category}</h3>
                    <h3>TASK PRIORITY: <span id="priorityColor">${taskData.priority}</span></h3>
                    <h3>DUE DATE: ${taskData.due_date}</h3>
                    <h3>DUE TIME: ${taskData.due_time}</h3>
                    <div class="actions flex">
                        <div class="btn">
                            <button id="deleteBtn">Delete Task</button>
                            <button id="editBtn">Edit Task</button>
                        </div>
                        <div class="checked">
                            <label for="">TASK COMPLETED</label>
                            <input type="checkbox" name="" id="checked">
                        </div>
                    </div>
                </div>`

                card.appendChild(tasksCard)
        });
    } else {
        alert("Unable to get data")
    }
}
