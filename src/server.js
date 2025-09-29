require("dotenv").config();
const express = require("express");
const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:3000", "https://stack-scramble-frontend.vercel.app/"], 
  credentials: true
}));

const authRoutes = require("./routes/auth");
const goalsRoutes = require("./routes/goals");
const tasksRoutes = require("./routes/tasks");
const actionsRoutes = require("./routes/actions");
const todosRoutes = require("./routes/todos");
const eventsRoutes = require("./routes/events");
const analyticsRoutes = require("./routes/analytics");

require("./cron"); // load cron job

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/actions", actionsRoutes);
app.use("/api/todos", todosRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));