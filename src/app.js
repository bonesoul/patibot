//     patibot

require('app-module-path').addPath(__dirname);
const config = require('config');
const os = require('os');
const winston = require('winston');
const util = require('util');
const packageInfo = require('../package.json');

let startup = async () => {
  try {
    // ========================================
    // initialize env manager.
    // ========================================
    require('lib/env');

    winston.info(`[APP] starting up patibot version: ${packageInfo.version} [${env}]`); // eslint-disable-line no-undef
    winston.info(`[APP] running on: ${os.platform()}-${os.arch()} [${os.type()} ${os.release()}]`);
    winston.info(`[APP] node: ${process.versions.node}, v8: ${process.versions.v8}, uv: ${process.versions.uv}, openssl: ${process.versions.openssl}`);
    winston.info(`[APP] running over ${os.cpus().length} core system.`);

    // ========================================
    // add process signal handlers.
    // ========================================
    process.on('SIGTERM', gracefulExit);
    process.on('SIGINT', gracefulExit);

    let tenor = require('lib/api/tenor');
    let test = await tenor.gif('anime slap');
    console.dir(test);

    // ========================================
    // start the bot.
    // ========================================
    await require('./bot');
  } catch (err) {
    winston.error(`startup error: ${err}`);
  }
}

let gracefulExit = code => {
  winston.info(`[APP] exiting process with code: ${code}`);
  process.exit(code);
};

process.on('unhandledRejection', (reason, promise) => {
  winston.error(`Possibly unhandled rejection at promise; ${util.inspect(promise)}`);
});

startup();