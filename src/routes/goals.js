const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get all goals
router.get("/", auth, async (req, res) => {
  const goals = await prisma.goal.findMany({
    where: { userId: req.user.id },
    include: { tasks: true },
  });
  res.json(goals);
});

// Create goal
router.post("/", auth, async (req, res) => {
  const { title, color } = req.body;
  const goal = await prisma.goal.create({
    data: { title, color, userId: req.user.id },
  });
  res.json(goal);
});

module.exports = router;
