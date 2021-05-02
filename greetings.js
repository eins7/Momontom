const formAskName = document.querySelector(".js-formAskName"),
  inputName = formAskName.querySelector("input"),
  greetings = document.querySelector(".js-greetings");
const toDoListWrap = document.querySelector(".js-toDoList_wrap");

const CL_REVEAL = "reveal";
const LS_USERNAME = "username";

function saveUserName(name) {
  localStorage.setItem("username", name);
}

function handleSubmit(event) {
  event.preventDefault();
  const receivedUserName = inputName.value;
  saveUserName(receivedUserName);
  formAskName.classList.remove(CL_REVEAL);
  paintGreetings(receivedUserName);
  window.setTimeout(showToDoSection, 100);
}

function askUserName() {
  formAskName.classList.add(CL_REVEAL);
}


function paintGreetings(txt) {
  greetings.innerHTML = `Hello, ${txt}!`;
  greetings.classList.add(CL_REVEAL);
}

function showToDoSection() {
  toDoListWrap.classList.add(CL_REVEAL);
}

function loadLS() {
  const currentUserName = localStorage.getItem(LS_USERNAME);
  if (currentUserName === null || currentUserName === "") {
    askUserName();
  } else {
    paintGreetings(currentUserName);
    showToDoSection();
  }
}

function init() {
  loadLS();
  formAskName.addEventListener("submit", handleSubmit);
}

init();
