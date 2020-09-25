const getClientID = () => {
  return process.env.CLIENT_ID;
};

const getClientSecret = () => {
  return process.env.CLIENT_SECRET;
};

const getToken = () => {
  return process.env.API_TOKEN;
};
const getUsername = () => {
  return process.env.USERNAME;
};
const getAppUrl = () => {
  return process.env.APP_URL;
};
module.exports = {
  getClientID,
  getClientSecret,
  getUsername,
  getToken,
  getAppUrl,
};
