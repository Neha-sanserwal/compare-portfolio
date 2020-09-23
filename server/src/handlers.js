const { getReposOf, getGithubUser, getAccessToken } = require("./gitApi");

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
  res.json({ isLoggedOut: true });
};

const getRepos = (req, res) => {
  const { query } = req.params;
  getReposOf(query).then((details) => {
    res.json(details.items);
  });
};

const incrComparisonId = (dbClient) => {
  return new Promise((resolve, reject) => {
    dbClient.incr("comparisonId", (err, id) => {
      err && reject(err);
      resolve(id);
    });
  });
};

const saveComparisons = (req, res) => {
  const { username, cards } = req.body;
  const { dbClient } = req.app.locals;
  incrComparisonId(dbClient).then((id) => {
    dbClient.rpush("comparisons", id);
    dbClient.hset(username, id, JSON.stringify(cards), () => {
      res.json(true);
    });
  });
};

const getQueue = (dbClient, queue) => {
  return new Promise((resolve, reject) => {
    dbClient.lrange(queue, 0, -1, (err, data) => {
      err && reject(err);
      resolve(data);
    });
  });
};

const deleteQueueId = (dbClient, key, id) => {
  return new Promise((resolve, reject) => {
    dbClient.lrem(key, -1, id, (err, data) => {
      err && reject(err);
      resolve(data);
    });
  });
};

const getOrderList = (req, res) => {
  const { dbClient, sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const username = sessions.getSession(sessionId);
  getQueue(dbClient, "comparisons").then((data) => {
    res.json(data);
  });
};

const getComparisonCards = (dbClient, id, username) => {
  return new Promise((resolve, reject) => {
    dbClient.hget(username, id, (err, data) => {
      const comparison = data || [];
      resolve(comparison);
    });
  });
};

const getComparison = (req, res) => {
  const { dbClient, sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const { id } = req.params;
  const username = sessions.getSession(sessionId);
  getComparisonCards(dbClient, id, username).then((details) => {
    const comparison = details || "[]";
    res.json(JSON.parse(comparison));
  });
};

const deleteComparisonCards = (dbClient, id, username) => {
  return new Promise((resolve, reject) => {
    dbClient.hdel(username, id, (err) => {
      err && reject(err);
      resolve(true);
    });
  });
};

const deleteComparison = (req, res) => {
  const { dbClient, sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const { id } = req.body;
  const username = sessions.getSession(sessionId);
  deleteComparisonCards(dbClient, id, username).then((isDeleted) => {
    isDeleted &&
      deleteQueueId(dbClient, "comparisons", id).then((isComparisonDeleted) => {
        res.json({ isComparisonDeleted });
      });
  });
};

const isLoggedIn = (req, res, next) => {
  const { sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const username = sessions.getSession(sessionId);
  if (!username) {
    res.json({ errMsg: "authentication failed" });
    return;
  }
  next();
};

module.exports = {
  authenticateUser,
  getCurrentUser,
  logout,
  getRepos,
  saveComparisons,
  getComparison,
  getOrderList,
  deleteComparison,
  isLoggedIn,
};
