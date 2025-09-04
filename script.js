const taskInput = document.getElementById("taskInput");
const taskList  = document.getElementById("taskList");

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;

  // Toggle complete (ignore clicks on delete button)
  li.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") return;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const del = document.createElement("button");
  del.textContent = "❌";
  del.title = "Delete";
  del.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(del);
  return li;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) { alert("Please enter a task!"); return; }
  const li = createTaskElement(text);
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

// Enter key adds task
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Save to localStorage
function saveTasks() {
  const items = Array.from(taskList.children).map(li => ({
    text: li.querySelector("span").textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("todos", JSON.stringify(items));
}

// Load from localStorage on start
function loadTasks() {
  const items = JSON.parse(localStorage.getItem("todos") || "[]");
  items.forEach(it => taskList.appendChild(createTaskElement(it.text, it.completed)));
}
loadTasks();
