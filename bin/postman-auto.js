#!/usr/bin/env node

const path = require('path');
const argv = require('yargs')
  .scriptName('pm-auto')
  .usage('$0 <collection-file-source> [options]')
  .command('collection-file-source.json', 'options')
  .demandCommand(
    1,
    'Missing collection file source, --help for more information'
  )
  .help().argv;

const app = require('../');

const defaultOptions = {
  skipKeys: [],
  skipType: ['Null'],
  mergeTestFile: false,
  mixTestObject: false
};

function validateArray(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (typeof data === 'string') {
    return data.split(',');
  }

  return [];
}

function validateBool(data) {
  if (typeof data === 'boolean') {
    return data;
  }
  return false;
}

function validateOptions(defaultOptions, argv) {
  const mergeConfig = Object.assign({}, defaultOptions, argv);
  mergeConfig['skipKeys'] = validateArray(mergeConfig['skipKeys']);
  mergeConfig['skipType'] = validateArray(mergeConfig['skipType']);
  mergeConfig['mergeTestFile'] = validateBool(mergeConfig['mergeTestFile']);
  mergeConfig['mixTestObject'] = validateBool(mergeConfig['mixTestObject']);
  mergeConfig['output'] = ['postman', 'python', 'javascript'];
  mergeConfig['showLog'] = true;

  return mergeConfig;
}

const currentConfig = validateOptions(defaultOptions, argv);

(function run(postmanPath, options, app) {
  const postmanCollection = require(path.resolve(process.cwd(), postmanPath));
  app(postmanCollection, options);
})(currentConfig['_'][0], currentConfig, app);
