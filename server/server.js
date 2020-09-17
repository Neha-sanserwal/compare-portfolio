const express = require("express");
const request = require("request");
const app = express();
app.listen(8000, () => {
  console.log("listening on", 8000);
});

app.get("/", (req, res) => res.send("welcome to server "));

const getUser = (accessToken) => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: "https://api.github.com/user",
        headers: {
          Authorization: `token ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "node.js",
        },
      },
      (err, res, body) => {
        err && reject(err);
        resolve(body);
      }
    );
  });
};

app.get("/api/getUser/:code", (req, res) => {
  const { code } = req.params;
  console.log(code);
  request.post(
    {
      url: "https://github.com/login/oauth/access_token",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: "8d16ade6f6a225d3f8ea",
        client_secret: "1830ae80cd5f39a1b09d1d88e81acd4bba3846bf",
        code: code,
      }),
    },
    (error, response, body) => {
      const parsedBody = JSON.parse(body);
      const accessToken = parsedBody["access_token"];
      getUser(accessToken).then((result) => res.json(JSON.parse(result)));
    }
  );
});
