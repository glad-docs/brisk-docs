#!/usr/bin/env node
const commandLineArgs = require('command-line-args');

const {
  dev,
  build,
  start,
  exportWebsite,
  generate,
  pToBWebsite,
} = require('./run-website');

const mainDefinitions = [{ name: 'command', defaultOption: true }];
const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true,
});

// We have no control over this dangling underscore
// eslint-disable-next-line no-underscore-dangle
const argv = mainOptions._unknown || [];

const cliOptions = [
  { name: 'config', type: String },
  { name: 'port', alias: 'p', type: Number },
  { name: 'debug-next', alias: 'd', type: Boolean },
];
const options = commandLineArgs(cliOptions, { argv, camelCase: true });

const nextOptions = [];

if (options.port) nextOptions.push(`--port ${options.port}`);

if (options.debugNext) nextOptions.push('debug-next');

if (mainOptions.command === undefined) {
  throw new Error(`No command supplied`);
}

const handleError = err => {
  console.error(err);
  process.exit(1);
};

switch (mainOptions.command) {
  case 'dev': {
    dev(options.config, nextOptions).catch(handleError);
    break;
  }
  case 'build': {
    build(options.config, nextOptions).catch(handleError);
    break;
  }
  case 'start': {
    start(options.config, nextOptions).catch(handleError);
    break;
  }
  case 'export': {
    exportWebsite(options.config, nextOptions).catch(handleError);
    break;
  }
  case 'generate': {
    generate(options.config, nextOptions).catch(handleError);
    break;
  }
  case 'parcel-dev': {
    pToBWebsite('dev', options.config, nextOptions).catch(handleError);
    break;
  }
  case 'parcel-build': {
    pToBWebsite('build', options.config, nextOptions).catch(handleError);
    break;
  }
  default:
    throw new Error(`Cannot run unknown command, ${mainOptions.command}`);
}
