// import findIndex from "array-findindex";

class Task {
  id: number;
  name: string;
  completed: boolean;

  constructor(name: string) {
    this.id = Date.now();
    this.name = name;
    this.completed = false;
  }
}

class TodoApp {
  private tasks: Task[] = [];

  private addTaskForm: HTMLFormElement =
    document.querySelector("#addTaskForm")!;
  private newTaskInput: HTMLInputElement =
    document.querySelector("#newTaskInput")!;
  private taskList: HTMLElement = document.querySelector("#taskList")!;
  private noTasksMessage: HTMLElement =
    document.querySelector("#noTasksMessage")!;
  private totalTasksCount: HTMLElement =
    document.querySelector("#totalTasksCount")!;
  private completedTasksCount: HTMLElement = document.querySelector(
    "#completedTasksCount"
  )!;

  constructor() {
    this.addTaskForm.addEventListener("submit", this.addTaskHandler.bind(this));
    this.taskList.addEventListener("click", this.taskListHandler.bind(this));
  }

  private addTaskHandler(event: Event) {
    event.preventDefault();

    // Get the task name from the input field
    const taskName = this.newTaskInput.value;

    if (!taskName) {
      alert("Please enter a task name");
      return;
    }

    // Create a new task
    const task = new Task(taskName);

    // Add the task to the task list
    this.tasks.push(task);

    // Update the UI
    this.updateUI();
  }

  private taskListHandler(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.classList.contains("delete-task")) {
      // Find the task by its ID and remove it from the list
      const taskId = Number(target.dataset.taskId);
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      this.tasks.splice(taskIndex, 1);

      // Update the UI
      this.updateUI();
    } else if (target.classList.contains("edit-task")) {
      // Find the task by its ID and update its name
      const taskId = Number(target.dataset.taskId);
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        alert("Task not found");
        return;
      }

      const newTaskName = prompt(
        "Enter the new task name",
        this.tasks[taskIndex].name
      );

      if (!newTaskName) {
        return;
      }

      this.tasks[taskIndex].name = newTaskName;

      // Update the UI
      this.updateUI();
    } else if (target.classList.contains("complete-task")) {
      // Find the task by its ID and mark it as completed or incomplete
      const taskId = Number(target.dataset.taskId);
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        alert("Task not found");
        return;
      }

      this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;

      // Update the UI
      this.updateUI();
    }
  }

  private updateUI() {
    // Display or hide the "No tasks to display" message
    if (this.tasks.length === 0) {
      this.noTasksMessage.style.display = "block";
    } else {
      this.noTasksMessage.style.display = "none";
    }

    // Clear the task list
    this.taskList.innerHTML = "";

    // Add each task to the task list
    this.tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.innerHTML = `
      <div class="input-group mb-3 ">
        <div class="input-group-text justify-content-between align-items-center w-100  ">
          <input type="checkbox" class="complete-task me-2" ${
            task.completed ? "checked" : ""
          } data-task-id="${task.id}">
          <input type="text" class="form-control me-4" value="${
            task.name
          }" disabled>
          <button type="button" class="btn btn-secondary edit-task me-2" data-task-id="${
            task.id
          }">Edit</button>
          <button type="button" class="btn btn-danger delete-task me-2" data-task-id="${
            task.id
          }">Delete</button>
        </div>
      </div>
    `;

      this.taskList.appendChild(taskItem);
    });

    // Update the task count
    this.totalTasksCount.textContent = this.tasks.length.toString();
    const completedTasksCount = this.tasks.filter(
      (task) => task.completed
    ).length;
    this.completedTasksCount.textContent = completedTasksCount.toString();
  }
}

// Instantiate the app
const app = new TodoApp();
