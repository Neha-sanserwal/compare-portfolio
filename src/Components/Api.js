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
    "Content-type": "application/json",
  };

  return fetch(url, {
    method: POST,
    body: JSON.stringify(data),
    headers: headers || defaultHeaders,
  });
};

// export const authenticateUser = (code) => {
//   return new Promise((resolve, reject) => {
//     fetchGetRequest(`/api/getUser/${code}`).then(resolve).catch(reject);
//   });
// };

// export const isRegisteredUser = (username) => {
//   return new Promise((resolve, reject) => {
//     fetchGetRequest(`/api/isRegisteredUser/${username}`)
//       .then((res) => res.json())
//       .then((res) => resolve(res))
//       .catch(reject);
//   });
// };

export const loginUser = (username) => {
  return new Promise((resolve, reject) => {
    fetchPostRequest("/api/login", { username })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch(reject);
  });
};

export const registerUser = (username, userDetails) => {
  return new Promise((resolve, reject) => {
    fetchPostRequest(`/api/registerUser`, { username, userDetails })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    fetchGetRequest("/api/currentUser")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
