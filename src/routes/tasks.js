const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get all tasks for a goal
router.get("/:goalId", auth, async (req, res) => {
  const { goalId } = req.params;
  const tasks = await prisma.task.findMany({
    where: { goalId, userId: req.user.id },
    include: { todos: true, actions: true },
  });
  res.json(tasks);
});

// Create task
router.post("/", auth, async (req, res) => {
  const { goalId, title } = req.body;
  const task = await prisma.task.create({
    data: { title, goalId, userId: req.user.id },
  });
  res.json(task);
});

module.exports = router;
