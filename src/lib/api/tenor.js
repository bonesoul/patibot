
const config = require('config');
const qs = require('qs');
const request = require('request-promise');
const _ = require('lodash');

exports.gif = async (terms) => {
  try {
    let data = await _call(`search`, {
      q: terms,
      media_filter: 'minimal'
    });
    if (data.error) throw new Error(data.error);

    let random = data.results[Math.floor(Math.random() * data.results.length)];
    return _.first(random.media);
  } catch (err) {
    throw err;
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
      timeout: config.api.timeout
    };

    let response = await request(options);
    return response;
  } catch (err) {
    throw err;
  }
};