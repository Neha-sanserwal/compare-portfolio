const getClientID = () => {
  return process.env.CLIENT_ID;
};

const getClientSecret = () => {
  return process.env.CLIENT_SECRET;
};

module.exports = {
  getClientID,
  getClientSecret,
};
