const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const TODOS_KEY = "todos";

class LoginForm {
  constructor() {
    this.form = document.querySelector("#login-form");
    this.input = this.form.querySelector("input");
    this.greeting = document.querySelector("#greeting");
    this.username = "";
  }

  saveUsername() {
    this.username = this.input.value;
    localStorage.setItem(USERNAME_KEY, this.username);
    this.paintGreetings(this.username);
  }

  hideForm() {
    this.form.classList.add(HIDDEN_CLASSNAME);
  }

  showForm() {
    this.form.classList.remove(HIDDEN_CLASSNAME);
  }

  paintGreetings(username) {
    greeting.innerText = `Hello, ${username}!`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
  }
}

class TodoList {
  constructor() {
    this.form = document.querySelector("#todo-form");
    this.input = this.form.querySelector("input");
    this.list = document.querySelector("#todo-list");
    this.toDos = [];
  }

  saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(this.toDos));
  }

  deleteToDo(event) {
    const div = event.target.parentElement;
    console.log(div);
    console.dir(div);
    const card = div.parentElement;
    card.remove();
    this.toDos = this.toDos.filter((toDo) => toDo.id !== parseInt(card.id));
    this.saveToDos();
  }

  addTodo() {
    const inputValue = this.input.value;
    this.input.value = "";

    const newToDoObj = {
      text: inputValue,
      id: Date.now(),
    };

    this.paintToDo(newToDoObj);
    this.saveToDos();
  }

  createToDoCard(newTodoObj) {
    const div = document.createElement("div");
    div.id = newTodoObj.id;
    div.classList.add("w3-panel");
    div.classList.add("w3-card");
    div.classList.add("w3-light-grey");
    const content = `
      <div class="w3-bar w3-light-grey">
        <span class="w3-bar-item">${newTodoObj.id}</span>
        <span id="delete-btn" class="w3-bar-item w3-right w3-button w3-light-grey">X</span>
      </div>
      <p>${newTodoObj.text}</p>
    `;

    div.innerHTML = content;
    div
      .querySelector("#delete-btn")
      .addEventListener("click", this.deleteToDo.bind(this));
    return div;
  }

  paintToDo(newToDoObj) {
    const card = this.createToDoCard(newToDoObj);
    this.list.appendChild(card);
    this.toDos.push(newToDoObj);
  }

  hideTodos() {
    this.form.classList.add(HIDDEN_CLASSNAME);
    this.list.classList.add(HIDDEN_CLASSNAME);
  }

  showTodos() {
    this.form.classList.remove(HIDDEN_CLASSNAME);
    this.list.classList.remove(HIDDEN_CLASSNAME);
  }
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
const savedToDos = localStorage.getItem(TODOS_KEY);

const loginForm = new LoginForm();
const toDoList = new TodoList();

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.saveUsername();
  loginForm.hideForm();

  toDoList.showTodos();
}

function handleTodoSubmit(event) {
  event.preventDefault();
  toDoList.addTodo();
}

if (savedUsername === null) {
  loginForm.showForm();
  toDoList.hideTodos();
  loginForm.form.addEventListener("submit", onLoginSubmit);
} else {
  loginForm.paintGreetings(savedUsername);
  toDoList.showTodos();
}

function paintTodoList(newTodoObj) {
  toDoList.paintToDo(newTodoObj);
}

toDoList.form.addEventListener("submit", handleTodoSubmit);
console.log(savedToDos);
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  console.log(parsedToDos);
  parsedToDos.forEach(paintTodoList);
}
