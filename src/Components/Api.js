export const getUser = (code) => {
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
