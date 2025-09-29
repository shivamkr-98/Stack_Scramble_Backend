const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get todos by task
router.get("/:taskId", auth, async (req, res) => {
  const { taskId } = req.params;
  const todos = await prisma.todo.findMany({
    where: { taskId, userId: req.user.id },
  });
  res.json(todos);
});

// Create todo
router.post("/", auth, async (req, res) => {
  const { taskId, title } = req.body;
  const todo = await prisma.todo.create({
    data: { title, taskId, userId: req.user.id },
  });
  res.json(todo);
});

// Toggle done
router.patch("/:id/toggle", auth, async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.update({
    where: { id },
    data: { done: { set: true } },
  });
  res.json(todo);
});

module.exports = router;
