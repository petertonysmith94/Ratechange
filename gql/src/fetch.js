import fetch from 'node-fetch';
import { isArray } from 'lodash';

/**
 * Transforms an array into an encoded URI string 
 * 
 * @param {object} params 
 * @param {string} key
 * @param {string} slug
 */
const arrayToUrlString = (params, key, slug) => params[key].reduce( (acc, item, index) => {
  const amp = index === 0 ? '' : '&';
  return `${ acc }${ amp }${ key }[]=${ encodeURIComponent(item) }`;
}, slug);

/**
 * Transforms an object of parameters into a URL encoded query string
 * 
 * @param {object} params   An object of URL parameters to be encode
 * @param {string} slug     The inital slug for the URL
 */
const paramsObjectToUrlString = (params, slug = '') => Object.keys(params).reduce( (acc, key, index) => {
  // Ensures the parameter 
  if (params[key] !== null) {
    const amp = index === 0 ? '' : '&';

    if (isArray(params[key])) {
      return arrayToUrlString(params, key, `${ acc }${ amp }`);
    }
    return `${ acc }${ amp }${ key }=${ encodeURIComponent(params[key]) }`;
  }
  return acc;
}, slug);

/**
 * A wrapper around fetch to handle query parameter transformation
 * 
 * @param {string} url      The base url
 * @param {object} params   An object with the parameters
 */
module.exports.build = function(url, params = {}) {
  const queryString = paramsObjectToUrlString(params);
  return fetch(`${ url }${ queryString ? `?${ queryString }` : '' }`)
};