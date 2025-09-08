
// Simple Student Dashboard (HTML+CSS+JS, no React)

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const emptyMsg = document.getElementById("emptyMsg");

const STORAGE_KEY = "simple_students";
let students = [];

function load() {
  try {
    students = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    students = [];
  }
  render();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const course = document.getElementById("course").value.trim();
  const image = document.getElementById("image").value.trim() || `https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`;
  if (!name || !email || !course) return;

  students.unshift({ id: Date.now().toString(), name, email, course, image });
  save();
  render();
  form.reset();
});

function deleteStudent(id) {
  students = students.filter((s) => s.id !== id);
  save();
  render();
}

function render() {
  tableBody.innerHTML = "";
  if (students.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";
  for (const s of students) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${s.image}" alt="${s.name}" /></td>
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.course}</td>
      <td><button class="delete" onclick="deleteStudent('${s.id}')">Delete</button></td>
    `;
    tableBody.appendChild(row);
  }
}

// Async & Event Loop Demo
document.getElementById("runDemo").addEventListener("click", async () => {
  const out = document.getElementById("demoOutput");
  out.innerHTML = "";
  function log(msg) {
    const li = document.createElement("li");
    li.textContent = msg;
    out.appendChild(li);
  }
  log("Start");
  setTimeout(() => log("setTimeout (macrotask)"), 0);
  Promise.resolve().then(() => log("Promise.then (microtask)"));
  await Promise.resolve();
  log("await resolved (microtask checkpoint)");
});

// init
load();
