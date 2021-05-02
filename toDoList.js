const formToDoList = document.querySelector(".js-formToDoList"),
  inputTask = formToDoList.querySelector("input"),
  ulToDoList = document.querySelector(".js-ulToDoList");

const LS_TODOS = "toDos";
let arrToDos = [];
const delBtn_UNCHECKED = "far fa-circle";
const delBtn_CHECKED = "fas fa-check-circle";

function deleteTask(event) {
  const selectedIcon = event.target;
  const selectedBtn = event.target.parentNode;
  const selectedLi = selectedBtn.parentNode;
  selectedBtn.querySelector("i").classList.remove();
  selectedBtn.querySelector("i").className = delBtn_CHECKED;
  window.setTimeout(function () {
    ulToDoList.removeChild(selectedLi);
  }, 500);

  const cleanToDos = arrToDos.filter(function (task) {
    return task.id !== parseInt(selectedLi.id);
  });
  arrToDos = cleanToDos;
  saveToDos();
  if (arrToDos.length === 5) {
    console.log("sss");
    window.setTimeout(function () {
      ulToDoList.classList.remove("columnTwo");
    }, 600);
  }
}

function saveToDos() {
  localStorage.setItem(LS_TODOS, JSON.stringify(arrToDos));
}

function paintTask(txt) {
  const newId = arrToDos.length + 1;
  if (newId > 10) {
    console.log("you have reached to maximum li");
    const username = localStorage.getItem(LS_USERNAME);
    inputTask.placeholder = `Ten is maximum.  Don't forget to rest ${username}`;
    return;
  } else {
    inputTask.placeholder = "Type task!";
  }
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");
  checkIcon.className = delBtn_UNCHECKED;
  delBtn.appendChild(checkIcon);
  span.innerText = txt;
  checkIcon.addEventListener("click", deleteTask);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  ulToDoList.appendChild(li);
  const objToDo = {
    text: txt,
    id: newId,
  };
  arrToDos.push(objToDo);
  saveToDos();
  if (li.id > 5) {
    ulToDoList.classList.add("columnTwo");
  }
}

function handleSubmit() {
  event.preventDefault();
  const receivedTask = inputTask.value;
  paintTask(receivedTask);
  inputTask.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(LS_TODOS);
  if (loadedToDos !== null && loadedToDos !== "") {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (task) {
      paintTask(task.text);
    });
  }
}

function init() {
  loadToDos();
  formToDoList.addEventListener("submit", handleSubmit);
}

init();
