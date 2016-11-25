"use strict";

var createError = function(status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
};

// The experimental fetch API, required by React Native for example.
// We still use browser requests by default because there could be an
// incomplete polyfill in the context (lacking CORS for example)
var fetchRequest = (function() {
  if (typeof fetch == "function") {
    var pjson = require('../package.json');
    return function(requestUrl, callback) {
      fetch(requestUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Prismic-javascript-kit/' + pjson.version + " NodeJS/" + process.version
        }
      }).then(function (response) {
        if (~~(response.status / 100 != 2)) {
          throw new createError(response.status, "Unexpected status code [" + response.status + "] on URL " + requestUrl);
        } else {
          return response.json().then(function(json) {
            return {
              response: response,
              json: json
            };
          });
        }
      }).then(function(next) {
        var response = next.response;
        var json = next.json;
        var cacheControl = response.headers['cache-control'];
        var ttl = cacheControl && /max-age=(\d+)/.test(cacheControl) ? parseInt(/max-age=(\d+)/.exec(cacheControl)[1], 10) : undefined;
        callback(null, json, response, ttl);
      }).catch(function (error) {
        callback(error);
      });
    };
  }
  return null;
});
// Number of maximum simultaneous connections to the prismic server
var MAX_CONNECTIONS = 20;
// Number of requests currently running (capped by MAX_CONNECTIONS)
var running = 0;
// Requests in queue
var queue = [];

var processQueue = function() {
  if (queue.length === 0 || running >= MAX_CONNECTIONS) {
    return;
  }
  running++;
  var next = queue.shift();
  var fn = fetchRequest() ||
        (function() { throw new Error("No request handler available (tried XMLHttpRequest, fetch & NodeJS)"); })();
  fn.call(this, next.url, function(error, result, xhr, ttl) {
    running--;
    next.callback(error, result, xhr, ttl);
    processQueue();
  });
};

var request = function (url, callback) {
  queue.push({
    'url': url,
    'callback': callback
  });
  processQueue();
};

module.exports = {
  MAX_CONNECTIONS: MAX_CONNECTIONS, // Number of maximum simultaneous connections to the prismic server
  request: request
};
