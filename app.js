var taskInput = document.getElementById("new-task"); 
var addButton = document.getElementsByTagName("button")[0]; 
var incompleteTaskHolder = document.getElementById("incompleteTasks");
var completedTasksHolder = document.getElementById("completed-tasks"); 

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); 
  var label = document.createElement("label"); 
  var editInput = document.createElement("input"); 
  var editButton = document.createElement("button"); 
  var deleteButton = document.createElement("button"); 
  var deleteButtonImg = document.createElement("img"); 

  label.innerText = taskString;
  label.className = "todo__task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "todo__task";

  editButton.innerText = "Edit"; 
  editButton.className = "todo__edit";

  deleteButton.className = "todo__delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.classList.add('todo__incomplete-item');

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".todo__edit");
  var containsClass = listItem.classList.contains("todo__edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("todo__edit-mode");
};

//Delete task.
var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function () {
  var listItem = this.parentNode;
  console.log(listItem);
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector(".todo__edit");
  var deleteButton = taskListItem.querySelector(".todo__delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
};

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};

