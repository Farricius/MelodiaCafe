const inputBox = document.getElementById("input-box");
const button = document.getElementById("addTask");
const list = document.getElementById("list-container");

export function createExampleTaskIfEmpty() {
  let li = document.createElement("li");
  li.innerHTML = "Click to finish or delete a task!";
  list.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "❌";
  li.appendChild(span);
}

export const addNewTask = () => {
  if (inputBox.value === "") {
    alert("Please, write a text!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "❌";
    li.appendChild(span);
  }
  saveTasks();
};

// Working OK, crea tarea al cliente para que vea como usar app
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    if (list.children.length === 0) createExampleTaskIfEmpty();
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
