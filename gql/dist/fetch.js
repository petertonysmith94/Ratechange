"use strict";

var fetch = require('node-fetch');

var _require = require('lodash'),
    isArray = _require.isArray;
/**
 * Transforms an array into an encoded URI string 
 * 
 * @param {object} params 
 * @param {string} key
 * @param {string} slug
 */


var arrayToUrlString = function arrayToUrlString(params, key, slug) {
  return params[key].reduce(function (acc, item, index) {
    var amp = index === 0 ? '' : '&';
    return "".concat(acc).concat(amp).concat(key, "[]=").concat(encodeURIComponent(item));
  }, slug);
};
/**
 * Transforms an object of parameters into a URL encoded query string
 * 
 * @param {object} params   An object of URL parameters to be encode
 * @param {string} slug     The inital slug for the URL
 */


var paramsObjectToUrlString = function paramsObjectToUrlString(params) {
  var slug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return Object.keys(params).reduce(function (acc, key, index) {
    // Ensures the parameter 
    if (params[key] !== null) {
      var amp = index === 0 ? '' : '&';

      if (isArray(params[key])) {
        return arrayToUrlString(params, key, "".concat(acc).concat(amp));
      }

      return "".concat(acc).concat(amp).concat(key, "=").concat(encodeURIComponent(params[key]));
    }

    return acc;
  }, slug);
};
/**
 * A wrapper around fetch to handle query parameter transformation
 * 
 * @param {string} url      The base url
 * @param {object} params   An object with the parameters
 */


module.exports.build = function (url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var queryString = paramsObjectToUrlString(params);
  return fetch("".concat(url).concat(queryString ? "?".concat(queryString) : ''));
};
//# sourceMappingURL=fetch.js.map