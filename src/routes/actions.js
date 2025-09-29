const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get actions by task
router.get("/:taskId", auth, async (req, res) => {
  const { taskId } = req.params;
  const actions = await prisma.action.findMany({
    where: { taskId, userId: req.user.id },
  });
  res.json(actions);
});

// Create action
router.post("/", auth, async (req, res) => {
  const { taskId, title, startAt, endAt, allDay, repeatRule } = req.body;
  const action = await prisma.action.create({
    data: { title, taskId, userId: req.user.id, startAt, endAt, allDay, repeatRule },
  });
  res.json(action);
});

module.exports = router;
