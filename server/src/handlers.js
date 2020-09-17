const request = require("request");
const { getClientID, getClientSecret } = require("../../config");

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
const authenticateUser = (req, res) => {
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
        client_id: getClientID(),
        client_secret: getClientSecret(),
        code: code,
      }),
    },
    (error, response, body) => {
      const parsedBody = JSON.parse(body);
      const accessToken = parsedBody["access_token"];
      getUser(accessToken).then((result) => res.json(JSON.parse(result)));
    }
  );
};

module.exports = {
  authenticateUser,
};
