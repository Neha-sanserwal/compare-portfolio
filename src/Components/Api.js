const GET = "GET";
const POST = "POST";

const fetchGetRequest = (url, headers) => {
  const defaultHeaders = {
    accept: "application/json",
  };
  return fetch(url, {
    method: "GET",
    headers: headers || defaultHeaders,
  });
};

const fetchPostRequest = (url, data, headers) => {
  const defaultHeaders = {
    accept: "application/json",
  };

  return fetch(url, {
    method: POST,
    headers: headers || defaultHeaders,
    body: JSON.stringify(data),
  });
};

export const authenticateUser = (code) => {
  console.log(code);
  return new Promise((resolve, reject) => {
    fetchGetRequest(`/api/getUser/${code}`)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const isRegisteredUser = (username) => {
  console.log(username);
  return new Promise((resolve, reject) => {
    fetchGetRequest(`/api/isRegisteredUser/${username}`).then(resolve);
  });
};

export const setCurrentUser = () => {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};
