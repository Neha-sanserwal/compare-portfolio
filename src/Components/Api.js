const GET = "GET";
const POST = "POST";

const fetchGetRequest = (url, headers) => {
  const defaultHeaders = {
    accept: "application/json",
  };
  return fetch(url, {
    method: GET,
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

export const logout = () => {
  return new Promise((resolve, reject) => {
    fetchPostRequest(`/api/logout`)
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
        }
      })
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

export const getRepos = (value) => {
  return new Promise((resolve, reject) => {
    fetchGetRequest(`/api/repos/${value}`)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const saveComparisons = (username, cards) => {
  return new Promise((resolve, reject) => {
    fetchPostRequest("/api/saveComparisons", { username, cards })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const getOrderList = () => {
  return new Promise((resolve, reject) => {
    fetchGetRequest("/api/getOrderList")
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
          return { message: "Please Login" };
        }
        return res.json();
      })
      .then(resolve);
  });
};

export const getComparison = (id) => {
  return new Promise((resolve, reject) => {
    fetchGetRequest(`/api/getComparison/${id}`)
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
          return { message: "Please Login" };
        }
        return res.json();
      })
      .then(resolve);
  });
};
