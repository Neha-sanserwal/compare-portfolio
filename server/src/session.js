class Sessions {
  constructor() {
    this.sessionList = {};
    this.sessionId = 1000;
  }

  generateSessionId() {
    return this.sessionId;
  }

  getSession(sessionId) {
    return this.sessionList[sessionId];
  }

  createSession(username) {
    const sessionId = this.generateSessionId();
    this.sessionList[sessionId] = username;
    return sessionId;
  }

  removeSession(sessionId) {
    return delete this.sessionList[sessionId];
  }
}

module.exports = new Sessions();
