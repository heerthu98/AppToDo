// import findIndex from "array-findindex";
var Task = /** @class */ (function () {
    function Task(name) {
        this.id = Date.now();
        this.name = name;
        this.completed = false;
    }
    return Task;
}());
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        this.tasks = [];
        this.addTaskForm = document.querySelector("#addTaskForm");
        this.newTaskInput = document.querySelector("#newTaskInput");
        this.taskList = document.querySelector("#taskList");
        this.noTasksMessage = document.querySelector("#noTasksMessage");
        this.totalTasksCount = document.querySelector("#totalTasksCount");
        this.completedTasksCount = document.querySelector("#completedTasksCount");
        this.addTaskForm.addEventListener("submit", this.addTaskHandler.bind(this));
        this.taskList.addEventListener("click", this.taskListHandler.bind(this));
    }
    TodoApp.prototype.addTaskHandler = function (event) {
        event.preventDefault();
        // Get the task name from the input field
        var taskName = this.newTaskInput.value;
        if (!taskName) {
            alert("Please enter a task name");
            return;
        }
        // Create a new task
        var task = new Task(taskName);
        // Add the task to the task list
        this.tasks.push(task);
        // Update the UI
        this.updateUI();
    };
    TodoApp.prototype.taskListHandler = function (event) {
        var target = event.target;
        if (target.classList.contains("delete-task")) {
            // Find the task by its ID and remove it from the list
            var taskId_1 = Number(target.dataset.taskId);
            var taskIndex = this.tasks.findIndex(function (task) { return task.id === taskId_1; });
            this.tasks.splice(taskIndex, 1);
            // Update the UI
            this.updateUI();
        }
        else if (target.classList.contains("edit-task")) {
            // Find the task by its ID and update its name
            var taskId_2 = Number(target.dataset.taskId);
            var taskIndex = this.tasks.findIndex(function (task) { return task.id === taskId_2; });
            if (taskIndex === -1) {
                alert("Task not found");
                return;
            }
            var newTaskName = prompt("Enter the new task name", this.tasks[taskIndex].name);
            if (!newTaskName) {
                return;
            }
            this.tasks[taskIndex].name = newTaskName;
            // Update the UI
            this.updateUI();
        }
        else if (target.classList.contains("complete-task")) {
            // Find the task by its ID and mark it as completed or incomplete
            var taskId_3 = Number(target.dataset.taskId);
            var taskIndex = this.tasks.findIndex(function (task) { return task.id === taskId_3; });
            if (taskIndex === -1) {
                alert("Task not found");
                return;
            }
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
            // Update the UI
            this.updateUI();
        }
    };
    TodoApp.prototype.updateUI = function () {
        var _this = this;
        // Display or hide the "No tasks to display" message
        if (this.tasks.length === 0) {
            this.noTasksMessage.style.display = "block";
        }
        else {
            this.noTasksMessage.style.display = "none";
        }
        // Clear the task list
        this.taskList.innerHTML = "";
        // Add each task to the task list
        this.tasks.forEach(function (task) {
            var taskItem = document.createElement("div");
            taskItem.innerHTML = "\n      <div class=\"input-group mb-3 \">\n        <div class=\"input-group-text justify-content-between align-items-center w-100  \">\n          <input type=\"checkbox\" class=\"complete-task me-2\" ".concat(task.completed ? "checked" : "", " data-task-id=\"").concat(task.id, "\">\n          <input type=\"text\" class=\"form-control me-4\" value=\"").concat(task.name, "\" disabled>\n          <button type=\"button\" class=\"btn btn-secondary edit-task me-2\" data-task-id=\"").concat(task.id, "\">Edit</button>\n          <button type=\"button\" class=\"btn btn-danger delete-task me-2\" data-task-id=\"").concat(task.id, "\">Delete</button>\n        </div>\n      </div>\n    ");
            _this.taskList.appendChild(taskItem);
        });
        // Update the task count
        this.totalTasksCount.textContent = this.tasks.length.toString();
        var completedTasksCount = this.tasks.filter(function (task) { return task.completed; }).length;
        this.completedTasksCount.textContent = completedTasksCount.toString();
    };
    return TodoApp;
}());
// Instantiate the app
var app = new TodoApp();
