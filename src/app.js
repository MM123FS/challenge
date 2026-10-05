const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

app.get("/", (_req, res) => {
  res.json({
    service: "devops-platform-challenge",
    status: "ok"
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.get("/total", (_req, res) => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];

  res.json({ total: calculateTotal(items) });
});

// ---------------------------------------------------------------------------
// Tasks (in-memory store)
// ---------------------------------------------------------------------------

let tasks = [
  { id: 1, title: "Learn Git workflow", completed: false },
  { id: 2, title: "Write CI pipeline", completed: true }
];

// --- GET /tasks ---
app.get("/tasks", (_req, res) => {
  res.status(200).json(tasks);
});

// --- POST /tasks ---
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Vérifie que le titre existe et n'est pas vide
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  // Génère un nouvel ID unique
  const newId =
    tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1;

  // Crée la nouvelle tâche
  const newTask = {
    id: newId,
    title: title.trim(),
    completed: false
  };

  // Ajoute la tâche à la liste
  tasks.push(newTask);

  // Retourne la nouvelle tâche
  return res.status(201).json(newTask);
});

// --- PATCH /tasks/:id ---
app.patch("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Invalid input: 'completed' must be a boolean"
    });
  }

  task.completed = completed;

  return res.status(200).json(task);
});

// --- DELETE /tasks/:id ---
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(
    (task) => task.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  tasks.splice(index, 1);

  return res.status(204).send();
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = {
  app,
  calculateTotal,
  tasks
};