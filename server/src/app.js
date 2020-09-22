const express = require("express");
const cookieParser = require("cookie-parser");
const handlers = require("./handlers");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => res.send("welcome to server "));

app.get("/api/authorize", handlers.authenticateUser);
app.get("/api/repos/:username", handlers.getRepos);
app.get("/api/currentUser", handlers.getCurrentUser);
app.post("/api/saveComparisons", handlers.saveComparisons);
app.post("/api/logout", handlers.logout);
app.get("/api/getOrderList", handlers.getOrderList);
app.get("/api/getComparison/:id", handlers.getComparison);
module.exports = { app };
