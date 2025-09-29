const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Run every night at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("📊 Running analytics job...");

  const users = await prisma.user.findMany();
  for (const user of users) {
    const actions = await prisma.action.findMany({ where: { userId: user.id } });

    const totalTime = actions.reduce((sum, a) => {
      const duration = (new Date(a.endAt) - new Date(a.startAt)) / (1000 * 60 * 60); // hours
      return sum + duration;
    }, 0);

    await prisma.analytics.create({
      data: {
        userId: user.id,
        date: new Date(),
        meta: { totalHours: totalTime, actionCount: actions.length },
      },
    });
  }
});
