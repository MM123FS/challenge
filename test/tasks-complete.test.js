const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../src/app");

test("PATCH /tasks/:id updates an existing task", async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/tasks/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.completed, true);
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id returns 404 for an unknown task", async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/tasks/9999`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });
    assert.equal(res.status, 404);
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id returns 400 for invalid input", async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/tasks/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: "yes" })
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
