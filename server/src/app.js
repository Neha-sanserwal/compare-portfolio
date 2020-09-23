const express = require("express");
const cookieParser = require("cookie-parser");
const handlers = require("./handlers");
const { userRouter } = require("./routers/userRouter");
const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => res.send("welcome to server "));

app.get("/api/authorize", handlers.authenticateUser);
app.get("/api/repos/:query", handlers.getRepos);
app.get("/api/currentUser", handlers.getCurrentUser);

app.use("/api/user", userRouter);

module.exports = { app };
