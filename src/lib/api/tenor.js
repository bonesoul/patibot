
const config = require('config');
const qs = require('qs');
const request = require('request-promise');
const _ = require('lodash');

exports.gif = async (q) => {
  try {
    let data = await _call(`search`, {q: q});
    let first = _.first(data.results);
    return first;
  } catch (err) {
    throw new Error(err);
  }
};

let _call = async (method, params) => {
  try {
    if (typeof params !== 'object') params = {}; // make sure params is a valid json object
    params.key = config.api.tenor.key; // set tenor key.

    let queryString = qs.stringify(params); // setup the query string.

    // setup the query options.
    let options = {
      url: `https://api.tenor.com/v1/${method}/?${queryString}`,
      method: 'GET',
      json: true,
      timeout: 10 * 1000 // in miliseconds
    };

    let response = await request(options);
    return response;
  } catch (err) {
    throw err;
  }
};