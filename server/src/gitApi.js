const {
  getClientID,
  getClientSecret,
  getToken,
  getUsername,
} = require("../../config");

const request = require("request");

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

const getReposOf = (value) => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://api.github.com/search/repositories?q=${value}`,
        headers: {
          username: getUsername(),
          Authorization: `token ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "node.js",
        },
      },
      (err, res, body) => {
        err && reject(err);
        resolve(JSON.parse(body));
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

module.exports = {
  getReposOf,
  getGithubUser,
  getAccessToken,
};
