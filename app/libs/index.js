// node js
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// node_modules
const _get = require('lodash.get');
const mkdirp = require('mkdirp');
const prettier = require('prettier');
const { postman2har } = require('@har-sdk/postman');
const HTTPSnippet = require('httpsnippet');

module.exports = {
  postman2har,
  prettier,
  path,
  fs,
  mkdirp,
  HTTPSnippet,
  _get,
  spawn
};
