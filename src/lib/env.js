module.exports = (() => {
  // check if we have an invalid node_env set.
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') // eslint-disable-line curly
    process.env.NODE_ENV = 'development'; // set to development by default.

  global.env = process.env.NODE_ENV; // eslint-disable-line no-unused-vars
})();