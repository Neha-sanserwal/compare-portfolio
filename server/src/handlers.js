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
const getAccessToken = (code) => {
  return new Promise((resolve, reject) => {
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
        error && reject(error);
        const parsedBody = JSON.parse(body);
        const accessToken = parsedBody["access_token"];
        resolve(accessToken);
      }
    );
  });
};

const authenticateUser = (req, res) => {
  const { code } = req.query;
  const { dbClient } = req.app.locals;
  getAccessToken(code).then((accessToken) => {
    getGithubUser(accessToken)
      .then((githubDetails) => JSON.parse(githubDetails))
      .then((githubDetails) => {
        saveUserDetail(userDetails).then(() => {
          res.cookie("sessionId", sessions.createSession(githubDetails.login));
          res.redirect("http://localhost:3000/");
          res.json(true);
        });
      });
  });
};

const saveUserDetails = (userDetails) => {
  return new Promise((resolve, reject) => {
    dbClient.hset("users", username, JSON.stringify(userDetails), () => {
      resolve(true);
    });
  });
};

const getUserDetails = () => {
  return new Promise((resolve, reject) => {
    dbClient.hget("users", username, (err, data) => {
      const details = data || "{}";
      err && reject(err);
      resolve(details);
    });
  });
};

const getCurrentUser = (req, res) => {
  const { dbClient, sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const username = sessions.getSession(sessionId);
  if (!username) {
    res.json({});
    return;
  }
  getUserDetails(username).then((details) => res.json(details));
};

module.exports = {
  authenticateUser,
  isRegisteredUser,
  registerUser,
  loginUser,
  getCurrentUser,
};
