const inputBox = document.getElementById("input-box");
const button = document.getElementById("addTask");
const list = document.getElementById("list-container");

export function addNewTask() {
  if (inputBox.value === "") {
    alert("Por favor, escribe un texto");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "";
    li.appendChild(span);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addNewTask();
  }
}

button.addEventListener("click", addNewTask);
inputBox.addEventListener("keypress", handleKeyPress);
