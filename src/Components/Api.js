export const authenticateUser = (code) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/getUser/${code}`, {
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const isRegisteredUser = () => {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};

export const setCurrentUser = () => {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};
