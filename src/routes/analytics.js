const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get analytics for user
router.get("/", auth, async (req, res) => {
  const analytics = await prisma.analytics.findMany({
    where: { userId: req.user.id },
  });
  res.json(analytics);
});

module.exports = router;
