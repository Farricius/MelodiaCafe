const inputBox = document.getElementById("input-box");
const button = document.getElementById("addTask");
const list = document.getElementById("list-container");

function createExampleTaskItem(text) {
  let li = document.createElement("li");
  li.innerHTML = text;
  li.classList.add("draggable-true");
  li.setAttribute("draggable", true);
  let span = document.createElement("span");
  span.innerHTML = "❌";
  li.appendChild(span);
  list.appendChild(li);
}

export function createExampleTasksIfEmpty() {
  createExampleTaskItem("Click to finish or delete a task!");
}

export function createExampleTipIfEmpty() {
  createExampleTaskItem("Drag & drop to reorder tasks!");
}

export const addNewTask = () => {
  let emptyTaskBlocker = inputBox.value.trim();
  if (inputBox.value === "") {
    alert("Please, write a text!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    inputBox.value = "";
    li.classList.add("draggable-true");
    li.setAttribute("draggable", true);
    let span = document.createElement("span");
    span.innerHTML = "❌";
    li.appendChild(span);
    list.appendChild(li);
  }
  saveTasks();
};

// Drag and Drop
let draggingItem;

list.addEventListener("dragstart", (e) => {
  draggingItem = e.target;
});

list.addEventListener("dragover", (e) => {
  e.preventDefault();

  const items = [...list.querySelectorAll("li")];
  const closestItem = items.find(
    (item) => item !== draggingItem && e.clientY < item.offsetTop + item.offsetHeight / 2
  );

  // Adjudicado al más cercano o lo último
  if (closestItem) {
    list.insertBefore(draggingItem, closestItem);
  } else {
    list.appendChild(draggingItem);
  }
});

list.addEventListener("drop", () => {
  draggingItem = null;
});

// Working OK, creamos 2 tareas al cliente para que vea como usar la app
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    if (list.children.length === 0) {
      createExampleTasksIfEmpty();
      createExampleTipIfEmpty();
    }
  }, 1000);
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTasks();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveTasks();
  }
});

function saveTasks() {
  localStorage.setItem("data", list.innerHTML);
}

function showTasks() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    list.innerHTML = savedData;
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") addNewTask();
}

inputBox.addEventListener("keypress", handleKeyPress);
button.addEventListener("click", addNewTask);
window.addEventListener("load", showTasks);
