let apiBaseUrl;

if (window.location.hostname === "localhost") {
  // Running locally (frontend on localhost)
  apiBaseUrl = "http://localhost:3000/tasks";
} else {
  // Running in production (frontend served from Kubernetes)
  // Frontend container talks to backend-service inside cluster
  apiBaseUrl = "http://34.14.184.23/tasks";
}

async function fetchTasks() {
  try {
    const res = await fetch(apiBaseUrl);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const tasks = await res.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.id = `task-${task.id}`;

      const span = document.createElement("span");
      span.textContent = task.title;
      span.addEventListener("click", () => span.classList.toggle("completed"));

      const delBtn = document.createElement("button");
      delBtn.textContent = "Remove";
      delBtn.onclick = () => deleteTask(task.id);

      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Cannot fetch tasks. Check backend is running.");
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  try {
    await fetch(apiBaseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input.value })
    });
    input.value = "";
    fetchTasks();
  } catch (err) {
    console.error(err);
    alert("Cannot add task. Check backend is running.");
  }
}

async function deleteTask(id) {
  try {
    const li = document.querySelector(`#task-${id}`);
    if (li) {
      li.style.animation = "fadeOut 0.3s forwards";
      setTimeout(() => li.remove(), 300);
    }

    await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    alert("Cannot delete task. Check backend is running.");
  }
}

// Load tasks when page opens
fetchTasks();


