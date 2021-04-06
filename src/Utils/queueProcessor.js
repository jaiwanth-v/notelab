const axios = require("axios");
const fetch = (url, method, data, params) =>
  new Promise((resolve) => {
    axios(`${url}`, { method }, data)
      .then(function (res) {
        console.log(method);
        console.log(res.data);
        resolve(data);
      })
      .catch(function (error) {
        alert(
          "Error sending request to server. To see the details, check logs"
        );
        console.log(error);
      });
  });

const queueRequest = (() => {
  let pending = Promise.resolve();

  const run = async (url, method, data, params) => {
    try {
      await pending;
    } finally {
      return fetch(url, method, data, params);
    }
  };

  return (url, method, data, params) =>
    (pending = run(url, method, data, params));
})();

module.exports = queueRequest;
