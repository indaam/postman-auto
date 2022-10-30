const expect = require('chai').expect;

const postmanCollections = require('../Postman Example.postman_collection.json');
const app = require('../app/main/index.js');
const BaseClass = require('../app/main/BaseClass');

describe('PythonTest Test', async function () {
  const options = {
    skipKeys: [],
    skipType: ['Null'],
    mergeTestFile: false,
    mixTestObject: false,
    output: [],
    showLog: true
  };

  const result = await app(postmanCollections, options);
  const base = new BaseClass();

  it('Should base is object', function () {
    expect(base).to.be.an('object');
    expect(base.options).to.be.an('object');
  });

  it('Should result is an Array', function () {
    expect(result).to.be.an('array');
  });
});
