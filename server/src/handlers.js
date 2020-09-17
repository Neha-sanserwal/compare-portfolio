const request = require("request");
const { getClientID, getClientSecret } = require("../../config");

const getGithubUser = (accessToken) => {
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

const authenticateUser = (req, res) => {
  const { code } = req.params;
  request.post(
    {
      url: "https://github.com/login/oauth/access_token",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: getClientID(),
        client_secret: getClientSecret(),
        code: code,
      }),
    },
    (error, response, body) => {
      const parsedBody = JSON.parse(body);
      const accessToken = parsedBody["access_token"];
      getGithubUser(accessToken).then((result) => res.json(JSON.parse(result)));
    }
  );
};

const isRegisteredUser = (req, res) => {
  const { dbClient } = req.app.locals;
  const { username } = req.params;
  dbClient.hget("users", username, (err, userDetails) => {
    err && res.json(err);
    res.json(userDetails);
  });
};

const registerUser = (req, res) => {
  const { dbClient } = req.app.locals;
  const { username, userDetails } = req.body;
  dbClient.hset("users", username, JSON.stringify(userDetails), () => {
    res.json(true);
  });
};

module.exports = {
  authenticateUser,
  isRegisteredUser,
  registerUser,
};
