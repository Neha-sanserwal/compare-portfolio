const express = require("express");

const handlers = require("./handlers");

const app = express();

app.get("/", (req, res) => res.send("welcome to server "));

app.get("/api/getUser/:code", handlers.authenticateUser);

module.exports = { app };
