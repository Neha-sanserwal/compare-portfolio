const express = require("express");
const cookieParser = require("cookie-parser");
const handlers = require("./handlers");
const { userRouter } = require("./routers/userRouter");
const app = express();
const path = require("path");

app.use(express.json());

app.use(cookieParser());
const buildPath = path.join(__dirname, "../../", "build");
app.use(express.static(buildPath));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
);

app.get("/api/authorize", handlers.authenticateUser);
app.get("/api/repos/:query", handlers.getRepos);
app.get("/api/currentUser", handlers.getCurrentUser);

app.use("/api/user", userRouter);

module.exports = { app };
