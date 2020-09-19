const express = require("express");
const cookieParser = require("cookie-parser");
const handlers = require("./handlers");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => res.send("welcome to server "));

app.get("/api/authorize", handlers.authenticateUser);

app.get("/api/isRegisteredUser/:username", handlers.isRegisteredUser);

app.post("/api/registerUser", handlers.registerUser);

app.post("/api/login", handlers.loginUser);

app.get("/api/currentUser", handlers.getCurrentUser);

module.exports = { app };
