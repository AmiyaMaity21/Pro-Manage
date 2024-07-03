const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dbconfig");
const errorHandler = require("./middleware/errorHandler");
const user = require("./routes/userRoute");
const task = require("./routes/taskRoute");
const cors = require("cors");

dotenv.config();

const app = express();

connectDatabase();

app.use(express.json());

app.use(cors({ origin: process.env.ALLOW_ORIGIN }));

app.use("/api/v1/user", user);
app.use("/api/v1/task", task);

app.get("/api/health", (req, res) => {
  res.json({
    service: "Pro Manage API Server",
    status: "true",
    time: new Date(),
  });
});

app.use("/*", (req, res) => {
  res.status(404).json({ errorMessage: "Route not found" });
});

app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running at http://${HOST}:${PORT}`);
});
