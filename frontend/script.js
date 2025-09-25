
// Dynamic backend URL depending on environment
const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/tasks"
    : "http://backend:5000/tasks";

// async function fetchTasks() {
//   try {
//     const res = await fetch(apiUrl);
//     if (!res.ok) throw new Error("Failed to fetch tasks");
//     const tasks = await res.json();
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";

//     tasks.forEach(task => {
//       const li = document.createElement("li");

//       // Task title
//       const span = document.createElement("span");
//       span.textContent = task.title;

//       // Toggle completed on click
//       span.addEventListener("click", () => {
//         span.classList.toggle("completed");
//       });

//       // Delete button
//       const delBtn = document.createElement("button");
//       delBtn.textContent = "Remove";
//       delBtn.onclick = () => deleteTask(task.id);

//       li.appendChild(span);
//       li.appendChild(delBtn);
//       taskList.appendChild(li);
//     });
//   } catch (err) {
//     console.error(err);
//     alert("Cannot fetch tasks. Check backend is running.");
//   }
// }


async function fetchTasks() {
  try {
    const res = await fetch(apiUrl);
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
    await fetch(apiUrl, {
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

    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    alert("Cannot delete task. Check backend is running.");
  }
}

// Load tasks when page opens
fetchTasks();

