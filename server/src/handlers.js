const request = require("request");
const { getClientID, getClientSecret } = require("../../config");
const session = require("./session");

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

const saveUserDetails = (dbClient, userDetails) => {
  const { login } = userDetails;
  return new Promise((resolve, reject) => {
    dbClient.hset("users", login, JSON.stringify(userDetails), () => {
      resolve(true);
    });
  });
};

const authenticateUser = (req, res) => {
  const { code } = req.query;
  const { dbClient, sessions } = req.app.locals;
  getAccessToken(code).then((accessToken) => {
    getGithubUser(accessToken)
      .then((githubDetails) => JSON.parse(githubDetails))
      .then((githubDetails) => {
        saveUserDetails(dbClient, githubDetails).then(() => {
          res.cookie("sessionId", sessions.createSession(githubDetails.login));
          res.redirect("http://localhost:3000/");
        });
      });
  });
};

const getUserDetails = (dbClient, username) => {
  return new Promise((resolve, reject) => {
    dbClient.hget("users", username, (err, data) => {
      const details = data || "{}";
      err && reject(err);
      resolve(JSON.parse(details));
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
  getUserDetails(dbClient, username).then((details) => res.json(details));
};

const logout = (req, res) => {
  const { sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  sessions.removeSession(sessionId);
  res.json();
};

module.exports = {
  authenticateUser,
  getCurrentUser,
  logout,
};
