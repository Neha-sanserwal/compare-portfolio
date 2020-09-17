const express = require("express");

const handlers = require("./handlers");

const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("welcome to server "));

app.get("/api/getUser/:code", handlers.authenticateUser);

app.get("/api/isRegisteredUser/:username", handlers.isRegisteredUser);

app.post("/api/registerUser", handlers.registerUser);

module.exports = { app };
