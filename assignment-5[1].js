const request = require('request');

function getGoogleHomePageAsync() {
  return new Promise((resolve, reject) => {
    request('http://www.google.com', function (error, response, body) {
      if (error) {
        console.error('error:', error);
        reject(error);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        resolve(body);
      }
    });
  });
}

getGoogleHomePageAsync()
  .then((result) => {
    console.log("RESULT==>", result);
  })
  .catch((error) => {
    console.error("ERROR==>", error);
  });