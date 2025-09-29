const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get events
router.get("/", auth, async (req, res) => {
  const events = await prisma.event.findMany({
    where: { userId: req.user.id },
  });
  res.json(events);
});

// Create event
router.post("/", auth, async (req, res) => {
  const { title, startAt, endAt, allDay } = req.body;
  const event = await prisma.event.create({
    data: { title, startAt, endAt, allDay, userId: req.user.id },
  });
  res.json(event);
});

module.exports = router;
