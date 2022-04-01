const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const sendHttpRequest = (method, url, data) => {
  // --> Promise to allow us to handle .then() and .catch() methods when
  // calling this function
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // --> Creates an object to handle the op

    // --> Sets a server request using a defined method to the base url
    xhr.open(method, url);

    // --> Sets the responseType to json, preventing us needing to parse with
    // JSON.parse(data) method
    xhr.responseType = "json";

    if (data) {
      // --> If there is data to send to the server, sets its info type
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    // --> Whenever there is a request being made, tests its status:
    // --> If it's OK, then resolve the promise, else rejects the promise
    // (throwing to the catch() method)
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      // --> If there is anything wrong with request (without status) rejects
      // the promise and shows an error
      reject("Something went wrong!");
    };

    // --> Sends the request to the server
    // OBS: if it's a GET or HEAD method, then its body argument is set to NULL
    xhr.send(JSON.stringify(data));
  });

  return promise; // --> Return a promise with the fetched data or status error
};

const getData = () => {
  sendHttpRequest("GET", "https://reqres.in/api/users").then((responseData) => {
    console.log(responseData);
  });
};

const sendData = () => {
  sendHttpRequest("POST", "https://reqres.in/api/register", {
    email: "eve.holt@reqres.in",
    password: "pistol",
  })
    .then((responseData) => console.log(responseData))
    .catch((err) => console.log(err));
};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", sendData);
